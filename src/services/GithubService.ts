import axios from 'axios';
import { TGetUserDto } from '../interfaces/results/TGetUserDto';

export class GithubService {
  private static URL_GET_USER = 'http://localhost:5000/api/v1/user';
  private static URL_ADD_USER_NOTE = 'http://localhost:5000/api/v1/notes';

  public static getUser(userId: string) {
    const url = new URL(this.URL_GET_USER);
    url.searchParams.append('userId', userId);
    return axios.get<TGetUserDto>(url.href);
  }

  public static addUserNote(userId: string, note: string) {
    const url = new URL(this.URL_ADD_USER_NOTE);
    return axios.post(url.href, { userId, note });
  }
}
