import { RequestUserEnum } from '../enums/RequestUserEnum';
import { IUserInformation } from './IUserInformation';
import { IUserLanguage } from './IUserLanguage';
import { IUserRepoSummary } from './IUserRepoSummary';

export interface IGitHubUser {
  progress: number;
  status: RequestUserEnum;
  messages: string[];

  userId: string;
  userInformation: IUserInformation;
  userRepoSummary: IUserRepoSummary;
  userLanguages: IUserLanguage;
  userNotes: string[];
  userAvatar: string;
}

export type TGitHubUser = Partial<IGitHubUser>;
