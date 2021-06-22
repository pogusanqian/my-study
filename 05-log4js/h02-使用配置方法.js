const log4js = require('log4js');

log4js.configure({
  appenders: {
    consoleOut: {
      type: 'console',
      layout: { type: 'colored' },
    },
    fileOut: {
      type: 'file',
      filename: 'log4j.log',
      // 日志的大小, 默认单位是k
      maxLogSize: '100M',
      // 日志滚动期间要保留的旧日志文件数，默认值为5
      backups: 1000,
      // 是否压缩backups, 默认是false
      compress: false,
      // 编码格式，默认为utf-8
      encoding: 'utf-8',
      layout: { type: 'colored' },
    },
    dataFileOut: {
      type: 'dateFile',
      filename: 'my.log',
      // 滚动日志的时间类型，默认为 .yyyy-MM-dd
      pattern: '.yyyy-MM-dd-hh-mm',
      layout: { type: 'colored' },
    },
  },
  categories: {
    default: { appenders: ['consoleOut'], level: 'info' },
    fileOut: { appenders: ['fileOut'], level: 'info' },
    dataFileOut: { appenders: ['dataFileOut'], level: 'info' },
  },
});

// 这里面的参数表示选择那个categories, 如果不指定, 就会采用默认的default
const logger = log4js.getLogger('dataFileOut');

setInterval(() => {
  for (let i = 0; i < 1000; i++) {
    logger.trace('Entering cheese testing');
    logger.debug('Got cheese.');
    logger.info('Cheese is Comté.');
    logger.warn('Cheese is quite smelly.');
    logger.error('Cheese is too ripe!');
    logger.fatal('Cheese was breeding ground for listeria.');
  }
});
