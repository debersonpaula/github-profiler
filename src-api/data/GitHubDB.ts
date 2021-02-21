import fs from 'fs';
import { IUserInformation } from '../interfaces/entities/IUserInformation';
import { IUserLanguage } from '../interfaces/entities/IUserLanguage';
import { IUserRepoSummary } from '../interfaces/entities/IUserRepoSummary';
import { RequestUserEnum } from '../interfaces/enums/RequestUserEnum';
import { TGitHubUser } from '../interfaces/entities/IGitHubUser';

const dbFileName = 'dist/github-database.json';

class GitHubDB {
  private _data = {
    requests: [] as TGitHubUser[],
  };
  // ==================================================================
  constructor() {
    if (fs.existsSync(dbFileName)) {
      this._loadFromFile();
    } else {
      this._saveToFile();
    }
  }
  // ==================================================================
  public addRequest(userId: string) {
    const request: TGitHubUser = {
      progress: 0,
      userId,
      status: RequestUserEnum.Created,
      messages: [],
      userInformation: undefined,
      userLanguages: undefined,
      userNotes: undefined,
      userRepoSummary: undefined,
    };

    this._data.requests.push(request);

    this._saveToFile();

    return request;
  }
  // ==================================================================
  public getRequest(userId: string) {
    return this._data.requests.find((item) => item.userId === userId);
  }
  // ==================================================================
  public setRequestFailed(userId: string, messages: string[]): void {
    this._updateState(userId, (user) => ({
      ...user,
      status: RequestUserEnum.Failed,
      messages,
    }));
  }
  // ==================================================================
  public setUser(userId: string, userInformation: IUserInformation, userAvatar: string): void {
    this._updateState(userId, (state) => ({
      ...state,
      status: RequestUserEnum.Loading,
      progress: (state.progress || 0) + 30,
      userInformation,
      userAvatar,
    }));
  }
  // ==================================================================
  public setUserRepoSummary(userId: string, userRepoSummary: IUserRepoSummary): void {
    this._updateState(userId, (state) => ({
      ...state,
      status: RequestUserEnum.Loading,
      progress: (state.progress || 0) + 30,
      userRepoSummary,
    }));
  }
  // ==================================================================
  public setUserLanguages(userId: string, userLanguages: IUserLanguage): void {
    this._updateState(userId, (state) => ({
      ...state,
      status: RequestUserEnum.Loading,
      progress: (state.progress || 0) + 30,
      userLanguages,
    }));
  }
  // ==================================================================
  public setUserNotes(userId: string): void {
    this._updateState(userId, (state) => ({
      ...state,
      progress: 100,
      status: RequestUserEnum.Completed,
      userNotes: [],
    }));
  }
  // ==================================================================
  public addProgress(userId: string, value: number): void {
    this._updateState(userId, (state) => ({
      ...state,
      status: RequestUserEnum.Loading,
      progress: (state.progress || 0) + value,
    }));
  }
  // ==================================================================
  public addUserNotes(userId: string, note: string): void {
    this._updateState(userId, (state) => {
      if (state.userNotes) {
        state.userNotes.push(note);
      }
      return state;
    });
  }
  // ==================================================================
  private _updateState(userId: string, callback: (state: TGitHubUser) => TGitHubUser) {
    const index = this._data.requests.findIndex((item) => item.userId === userId);
    if (index > -1) {
      this._data.requests[index] = callback(this._data.requests[index]);
      this._saveToFile();
    }
  }
  // ==================================================================
  private _saveToFile() {
    fs.writeFileSync(dbFileName, JSON.stringify(this._data));
  }
  // ==================================================================
  private _loadFromFile() {
    this._data = JSON.parse(fs.readFileSync(dbFileName).toString());
  }
  // ==================================================================
}

const db = new GitHubDB();

export default db;
