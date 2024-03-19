// 引入Express框架
const express = require('express');
// 引入path模块，用于处理文件路径
const path = require('path');
// 引入支付路由处理模块
const paymentRouter = require('./routes/payment');
// 引入错误处理模块（确保这个模块在你的项目中存在或者你可以根据需要创建它）
const { errorHandler } = require('./middleware/errorHandlers');

// 创建Express应用实例
const app = express();

// 为根路由 '/' 添加一个 GET 路由处理器
app.get('/', (req, res) => {
    // 渲染一个名为 'welcome' 的视图模板
    res.render('welcome', { title: '欢迎' });
});

// 设置视图模板的目录
app.set('views', path.join(__dirname, 'views'));
// 设置视图模板引擎为ejs
app.set('view engine', 'ejs');

// 使用中间件来解析JSON格式的请求体数据
app.use(express.json());
// 使用中间件来解析URL编码的请求体数据
app.use(express.urlencoded({ extended: true }));
// 将/payment路由指向paymentRouter处理
app.use('/payment', paymentRouter);
// 使用自定义的错误处理中间件
app.use(errorHandler);

// 定义应用监听的端口号，优先从环境变量中获取，没有则默认为3000
const PORT = process.env.PORT || 3000;
// 应用开始监听指定端口，启动服务器
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
