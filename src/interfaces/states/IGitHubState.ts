import { IGitHubUserState } from './IGitHubUserState';

export interface IGitHubState {
  isQuerying: boolean;
  progress: number;
  isLoading?: boolean;
  isCompleted?: boolean;
  isFailed?: boolean;
  isTimeout?: boolean;
  errorMessage?: string;

  user?: IGitHubUserState;
}
