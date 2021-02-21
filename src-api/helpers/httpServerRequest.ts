import logger from '../logger';
import request from 'request';
import { GITHUB_TOKEN } from '../config';

export default function httpServerRequest<T>(method: string, uri: string): Promise<T> {
  logger.info(`HTTP Request - Method ${method} - URL ${uri}`);

  return new Promise((resolve, reject) => {
    request(
      {
        method,
        uri,
        headers: { 'User-Agent': 'NodeJS.Server', Authorization: `Bearer ${GITHUB_TOKEN}` },
      },
      (error, response) => {
        if (error) {
          logger.error(`HTTP Request to ${uri} failed with error = ${JSON.stringify(error)}`);
          reject();
        } else {
          if (response) {
            if (response.statusCode >= 200 && response.statusCode < 300) {
              logger.info(`HTTP Request to ${uri} succeded with ${response.statusCode}`);
              resolve(JSON.parse(response.body));
            } else {
              logger.error(`HTTP Request to ${uri} Failed with ${response.statusCode}`);
              reject();
            }
          } else {
            logger.error(`HTTP Request from ${uri} has no response!`);
            reject();
          }
        }
      },
    );
  });
}
