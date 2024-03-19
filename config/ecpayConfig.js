// 引入dotenv库来从.env文件加载环境变量
require('dotenv').config();

// 定义綠界金流的配置参数
const ecpayConfig = {
  OperationMode: 'Test', // 操作模式，测试模式为'Test'，生产模式为'Production'
  MercProfile: {
    MerchantID: process.env.MERCHANTID, // 商家ID，从环境变量中获取
    HashKey: process.env.HASHKEY, // 加密用的HashKey，从环境变量中获取
    HashIV: process.env.HASHIV, // 加密用的HashIV，从环境变量中获取
  },
  IgnorePayment: [], // 指定需要忽略的支付方式，留空则不忽略任何支付方式
};

// 导出配置对象供其他模块使用
module.exports = ecpayConfig;
