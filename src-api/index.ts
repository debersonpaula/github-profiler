import express from 'express';
import GitHubController from './controllers/GitHubController';
import logger from './logger';
// import '../mocks';
const cors = require('cors');
const bodyParser = require('body-parser');
// ==================================================================
const port = 5000;
const server = express();
server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
// ==================================================================
GitHubController(server);
// ==================================================================
server.listen(port, () => {
  logger.info(`Api listening at http://localhost:${port}`);
});
