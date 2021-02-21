import GitHubDB from '../data/GitHubDB';
import GitHubRepository from '../repository/GitHubRepository';
import logger from '../logger';
import { TGitHubUser } from '../interfaces/entities/IGitHubUser';
import { IUserRepoSummary } from '../interfaces/entities/IUserRepoSummary';
import { IUserLanguage } from '../interfaces/entities/IUserLanguage';

export class GitHubApp {
  // ==================================================================
  public static searchForUserById(userId: string): TGitHubUser {
    logger.info(`${GitHubApp.name}.requestUser - with userId=${userId}`);

    let request = GitHubDB.getRequest(userId);
    if (!request) {
      request = GitHubDB.addRequest(userId);
      this.searchUserAsync(userId);
    }

    return request;
  }
  // ==================================================================
  public static addUserNote(userId: string, note: string) {
    GitHubDB.addUserNotes(userId, note);
  }
  // ==================================================================
  private static async searchUserAsync(userId: string) {
    // -----------------------------------------
    // Check if user exists
    // -----------------------------------------
    // const searchProfiles = await GitHubRepository.searchUserProfileAsync(userId);
    // if (searchProfiles.total_count < 1) {
    //   GitHubDB.setRequestFailed(userId, [`User ${userId} not found.`]);
    //   return;
    // }
    // -----------------------------------------
    // Get user information
    // -----------------------------------------
    try {
      const userInfo = await GitHubRepository.getUser(userId);
      GitHubDB.setUser(
        userId,
        {
          login: userInfo.login,
          followers: userInfo.followers,
          following: userInfo.following,
          location: userInfo.location,
          name: userInfo.name,
        },
        userInfo.avatar_url,
      );
    } catch (_) {
      GitHubDB.setRequestFailed(userId, [
        `User ${userId} not found or service responded with an error.`,
      ]);
      return;
    }
    // -----------------------------------------
    // Get user repos
    // -----------------------------------------
    const userRepoSummary: IUserRepoSummary = {
      ownedRepos: 0,
      ownedRepoForks: 0,
      ownedRepoStars: 0,
      ownedRepoWatchers: 0,
      ownedRepoList: [],
    };
    try {
      const userRepos = await GitHubRepository.getUserRepos(userId);
      userRepos.forEach((item) => {
        if (!item.fork) {
          userRepoSummary.ownedRepos += 1;
          userRepoSummary.ownedRepoForks += item.forks_count;
          userRepoSummary.ownedRepoStars += item.stargazers_count;
          userRepoSummary.ownedRepoWatchers += item.watchers_count;
          userRepoSummary.ownedRepoList.push(item.name);
        }
      });
      GitHubDB.setUserRepoSummary(userId, userRepoSummary);
    } catch (_) {
      GitHubDB.setRequestFailed(userId, [`Repository searching for User ${userId} was failed.`]);
      return;
    }
    // -----------------------------------------
    // Get user repo languages
    // -----------------------------------------
    const userLanguages: IUserLanguage = {
      languages: [],
      total: 0,
    };
    try {
      const progressStep = 40 / userRepoSummary.ownedRepoList.length;
      for (let i = 0; i < userRepoSummary.ownedRepoList.length; i++) {
        // for (const repoName in userRepoSummary.ownedRepoList) {
        const repoName = userRepoSummary.ownedRepoList[i];
        const repoLang = await GitHubRepository.getUserRepoLang(userId, repoName);
        GitHubDB.addProgress(userId, progressStep);
        for (const key in repoLang) {
          let lang = userLanguages.languages.find((item) => item.name === key);
          if (!lang) {
            lang = {
              name: key,
              qty: 0,
              rate: 0,
            };
            userLanguages.languages.push(lang);
          }
          lang.qty += repoLang[key];
          userLanguages.total += repoLang[key];
        }
      }
    } catch (error) {
      GitHubDB.setRequestFailed(userId, [
        `Language usage searching for User ${userId} was failed.`,
      ]);
      return;
    }

    userLanguages.languages.forEach((lang) => {
      lang.rate = (lang.qty / userLanguages.total) * 100;
    });
    GitHubDB.setUserLanguages(userId, userLanguages);
    // -----------------------------------------
    // Set user notes and finish the request
    // -----------------------------------------
    GitHubDB.setUserNotes(userId);
  }
  // ==================================================================
}
