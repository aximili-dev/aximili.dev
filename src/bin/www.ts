import { createServer } from 'http';

import app from '../app';
import { createLogger } from '../util/logger';

const logger = createLogger('bin/www', 'dev');

const server = createServer(app);

const httpPort = process.env.HTTP_PORT ?? 3000;

server.listen(httpPort, () => {
  logger.info(`Server running at http://localhost:${httpPort}`);
});
