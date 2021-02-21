export interface IGitHubUserState {
  login: string;
  name: string;
  location: string;
  stats: {
    followers: number;
    following: number;
    repos: number;
    stars: number;
    watchers: number;
    forks: number;
  };
  langs: { name: string; rate: number }[];
  notes: string[];
  avatar: string;
}
