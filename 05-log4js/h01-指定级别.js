const log4js = require('log4js');

const logger = log4js.getLogger();

// 默认情况下, log4j不会输出任何日志, 所以我们必须指定日志级别
logger.level = 'debug';
logger.debug('Some debug messages');
logger.log('Some debug messages');
