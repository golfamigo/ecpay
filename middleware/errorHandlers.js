// 引入日志记录模块
const logger = require('../utils/logger');

// 自定义的错误处理中间件
const errorHandler = (err, req, res, next) => {
  // 使用日志记录模块记录错误信息
  logger.error(err);
  // 向客户端发送500内部服务器错误状态码和错误信息
  res.status(500).send('Internal Server Error');
};

// 导出错误处理中间件供应用使用
module.exports = {
  errorHandler,
};
