const log4js = require('log4js');

log4js.configure({
  appenders: {
    // type=>console, 表示输出到控制台, layout表示输出的样式
    consoleOut: { type: 'console', layout: { type: 'colored' } },
  },
  categories: {
    default: { appenders: ['consoleOut'], level: 'info' },
  },
});
const logger = log4js.getLogger('cheese');
logger.error('Cheese is too ripe!');
