import { GITHUB_API_BASE } from '../config';
import httpServerRequest from '../helpers/httpServerRequest';
import { IGetUserRepoLangResult } from '../interfaces/results/IGetUserRepoLangResult';
import { IGetUserReposResult } from '../interfaces/results/IGetUserReposResult';
import { IGetUserResult } from '../interfaces/results/IGetUserResult';
import { ISearchUserProfileResult } from '../interfaces/results/ISearchUserProfileResult';

export default class GitHubRepository {
  private static URL_SEARCH_USER = `${GITHUB_API_BASE}/search/users`;
  private static URL_GET_USER_PROFILE = `${GITHUB_API_BASE}/users/{userId}`;
  private static URL_GET_USER_REPOS = `${GITHUB_API_BASE}/users/{userId}/repos`;
  private static URL_GET_USER_REPO_LANGS = `${GITHUB_API_BASE}/repos/{userId}/{repo}/languages`;
  // ==================================================================
  public static searchUserProfileAsync(userId: string) {
    const url = new URL(this.URL_SEARCH_USER);
    url.searchParams.append('q', userId);
    return httpServerRequest<ISearchUserProfileResult>('GET', url.href);
  }
  // ==================================================================
  public static getUser(userId: string) {
    const url = this.URL_GET_USER_PROFILE.replace('{userId}', userId);
    return httpServerRequest<IGetUserResult>('GET', url);
  }
  // ==================================================================
  public static getUserRepos(userId: string) {
    const url = this.URL_GET_USER_REPOS.replace('{userId}', userId);
    return httpServerRequest<IGetUserReposResult>('GET', url);
  }
  // ==================================================================
  public static getUserRepoLang(userId: string, repo: string) {
    const url = this.URL_GET_USER_REPO_LANGS.replace('{userId}', userId).replace('{repo}', repo);
    return httpServerRequest<IGetUserRepoLangResult>('GET', url);
  }
  // ==================================================================
}
