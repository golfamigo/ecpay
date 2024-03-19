const express = require('express');
const router = express.Router();
const paymentService = require('../services/paymentService');

// 原有的 '/' 路由保持不变
router.get('/', (req, res) => {
    const html = paymentService.generatePaymentHTML('100', '測試交易描述', '測試商品等');
    res.render('index', { title: 'Express', html });
});

// 添加处理 '/pay' 路径的 GET 路由
router.get('/pay', (req, res) => {
    // 这里可以根据需要设置不同的金额、描述和商品名称
    const html = paymentService.generatePaymentHTML('100', '測試交易描述', '測試商品等');
    res.render('pay', { title: '支付', html }); // 确保有一个名为 'pay' 的视图模板
});

router.post('/return', async (req, res) => {
    const isCheckMacValueValid = paymentService.checkMacValue(req.body);
    console.log('确认交易正确性：', isCheckMacValueValid, req.body.CheckMacValue);
    res.send('1|OK');
});

router.get('/clientReturn', (req, res) => {
    console.log('clientReturn:', req.body, req.query);
    res.render('return', { query: req.query });
});

module.exports = router;

