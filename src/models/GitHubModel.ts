import { GithubService } from '../services/GithubService';
import { IGitHubState } from '../interfaces/states/IGitHubState';
import { TGetUserDto } from '../interfaces/results/TGetUserDto';
import { RequestUserEnum } from '../interfaces/enums/RequestUserEnum';

type SetStateCallback = (handler: (previous: IGitHubState) => IGitHubState) => void;

export class GitHubModel {
  private _setState: SetStateCallback;
  private readonly _retryTimeoutLimit = 500;
  private readonly _retryTimesLimit = 100;
  private _retries = 0;
  private _validUserId = '';

  constructor(setState: SetStateCallback) {
    this._setState = setState;
  }

  public getUser = (userId: string) => {
    this._validUserId = '';
    this._doLoading();
    this._reloadUser(userId);
    this._retries = 0;
  };

  public addUserNote = (note: string) => {
    if (note && this._validUserId) {
      GithubService.addUserNote(this._validUserId, note).then((_) => {
        this.getUser(this._validUserId);
      });
    }
  };

  private _reloadUser = (userId: string) => {
    GithubService.getUser(userId)
      .then((res) => {
        if (res.data.status === RequestUserEnum.Completed) {
          this._doCompleted(res.data);
          this._validUserId = res.data.userInformation.login;
          return;
        }

        if (res.data.status === RequestUserEnum.Failed) {
          this._doError(res.data.messages[0]);
          return;
        }

        this._retries++;
        this._doLoading(res.data.progress);
        if (this._retries < this._retryTimesLimit) {
          setTimeout(() => {
            this._reloadUser(userId);
          }, this._retryTimeoutLimit);
        }
      })
      .catch(() => {
        this._doError("It's not possible to make request. Try it later!");
      });
  };

  private _doLoading = (progress = 0) => {
    this._setState((state) => ({ ...state, isLoading: true, progress }));
  };

  private _doError(errorMessage: string) {
    this._setState((state) => ({
      ...state,
      isLoading: false,
      isFailed: true,
      errorMessage,
    }));
  }

  private _doCompleted(dto: TGetUserDto) {
    this._setState((state) => ({
      ...state,
      isQuerying: false,
      isLoading: false,
      isFailed: false,
      isCompleted: true,
      user: {
        login: dto.userInformation.login,
        name: dto.userInformation.name,
        location: dto.userInformation.location,
        notes: dto.userNotes,
        avatar: dto.userAvatar,
        stats: {
          followers: dto.userInformation.followers,
          following: dto.userInformation.following,
          forks: dto.userRepoSummary.ownedRepoForks,
          repos: dto.userRepoSummary.ownedRepos,
          stars: dto.userRepoSummary.ownedRepoStars,
          watchers: dto.userRepoSummary.ownedRepoWatchers,
        },
        langs: dto.userLanguages.languages
          .map((item) => ({
            name: item.name,
            rate: item.rate,
          }))
          .sort((a, b) => (a.rate > b.rate ? -1 : a.rate < b.rate ? 1 : 0))
          .slice(0, 10),
      },
    }));
  }
}
