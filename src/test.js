import 'app-module-path/register';

import Logger from 'server/Logger'; // TODO TEST mock, stderr

const logger = new Logger({silent: false});
logger.attachGlobal();
