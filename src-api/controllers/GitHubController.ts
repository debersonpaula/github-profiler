import logger from '../logger';
import { Express } from 'express';
import { GitHubApp } from '../app/GitHubApp';

export default function GitHubController(server: Express) {
  // ==================================================================
  const API_URL_GET_USER = '/api/v1/user';
  server.get(API_URL_GET_USER, (req, res) => {
    const userId = req.query.userId;
    logger.info(`${GitHubController.name}['${API_URL_GET_USER}'] - with param userId=${userId}`);

    if (userId && typeof userId === 'string') {
      const request = GitHubApp.searchForUserById(userId);
      res.json(request);
    } else {
      res.status(400).send('Invalid userId parameter.');
    }
  });
  // ==================================================================
  const API_URL_ADD_USER_NOTE = '/api/v1/notes';
  server.post(API_URL_ADD_USER_NOTE, (req, res) => {
    const body = req.body;
    const { userId, note } = body;
    logger.info(
      `${GitHubController.name}['${API_URL_ADD_USER_NOTE}'] - with param userId=${userId} and note=${note}`,
    );

    if (userId && typeof userId === 'string') {
      GitHubApp.addUserNote(userId, note);
      res.status(201).end();
    } else {
      res.status(400).send('Invalid userId parameter.');
    }
  });
  // ==================================================================
}
