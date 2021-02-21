import GitHubRepository from '../src-api/repository/GitHubRepository';

import { searchUser } from './searchUser';
import { getUserProfile } from './getUserProfile';
import { getUserRepos } from './getUserRepos';
import { getUserRepoLang } from './getUserRepoLang';

GitHubRepository.searchUserProfileAsync = delayResponse(searchUser, 500);
GitHubRepository.getUser = delayResponse(getUserProfile, 500);
GitHubRepository.getUserRepos = delayResponse(getUserRepos as any, 500);
GitHubRepository.getUserRepoLang = delayResponse(getUserRepoLang, 100);

function delayResponse<T>(data: T, delay: number) {
  return () =>
    new Promise<T>((resolve) => {
      if (delay) {
        setTimeout(() => {
          resolve(data);
        }, delay);
      } else {
        resolve(data);
      }
    });
}
