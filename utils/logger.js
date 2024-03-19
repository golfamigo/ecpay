// 定义一个简单的日志记录器
const logger = {
    // 信息日志函数，用console.log输出信息
    info: (message) => console.log(message),
    // 错误日志函数，用console.error输出错误信息
    error: (message) => console.error(message),
  };
  
  // 导出日志记录器供其他模块使用
  module.exports = logger;
  