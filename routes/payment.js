const express = require('express');
const router = express.Router();
const paymentService = require('../services/paymentService');
const bodyParser = require('body-parser');

// 配置 bodyParser 以解析 POST 请求体
router.use(bodyParser.urlencoded({ extended: true }));

// 主页路由，保持不变
router.get('/', (req, res) => {
    const html = paymentService.generatePaymentHTML('100', '測試交易描述', '測試商品等');
    res.render('index', { title: 'Express', html });
});

// 支付表单页面路由
router.get('/pay', (req, res) => {
    // 渲染支付表单页面
    res.render('paymentForm');
});

// 处理支付表单提交的路由
router.post('/create', (req, res) => {
    const { TotalAmount, TradeDesc, ItemName } = req.body;
    // 确保 TotalAmount 是一个整数
    const totalAmount = parseInt(TotalAmount, 10);
    if (isNaN(totalAmount)) {
        return res.status(400).send('TotalAmount must be an integer.');
    }
    // 调用 paymentService 生成支付页面的 HTML
    const html = paymentService.generatePaymentHTML(totalAmount.toString(), TradeDesc, ItemName);
    // 将生成的 HTML 作为响应发送回前端
    res.send(html);
});

// 綠界回调路由，用于处理支付完成后的服务器回调
router.post('/return', (req, res) => {
    const isCheckMacValueValid = paymentService.checkMacValue(req.body);
    console.log('确认交易正确性：', isCheckMacValueValid, req.body.CheckMacValue);
    // 根据校验结果发送相应响应
    if (isCheckMacValueValid) {
        res.send('1|OK');
    } else {
        res.status(400).send('CheckMacValue verification failed');
    }
});

// 客户端返回路由，用于处理用户完成支付后返回商家页面的操作
router.get('/clientReturn', (req, res) => {
    console.log('Client Return:', req.query);
    res.render('return', { query: req.query });
});

module.exports = router;
