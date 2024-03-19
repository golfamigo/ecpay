const crypto = require('crypto');
require('dotenv').config();
const ecpay_payment = require('ecpay_aio_nodejs');

// 從環境變數中讀取綠界支付所需的配置信息
const { MERCHANTID, HASHKEY, HASHIV, HOST } = process.env;

// 設置綠界支付的配置選項
const options = {
    OperationMode: 'Test', // 測試模式 'Test' 或生產模式 'Production'
    MercProfile: {
        MerchantID: MERCHANTID,
        HashKey: HASHKEY,
        HashIV: HASHIV,
    },
    IgnorePayment: [],
    IsProjectContractor: false, // 根據您的需求設置
};

const create = new ecpay_payment(options);

const paymentService = {
    generatePaymentHTML: (totalAmount, tradeDescription, itemName) => {
        const MerchantTradeDate = new Date().toLocaleString('zh-TW', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
            timeZone: 'Asia/Taipei',
        });

        const TradeNo = 'test' + new Date().getTime();

        let base_param = {
            MerchantTradeNo: TradeNo,
            MerchantTradeDate: MerchantTradeDate,
            TotalAmount: totalAmount.toString(),
            TradeDesc: tradeDescription,
            ItemName: itemName,
            ReturnURL: `${HOST}/return`,
            ClientBackURL: `${HOST}/clientReturn`,
        };

        return create.payment_client.aio_check_out_all(base_param);
    },

    checkMacValue: (receivedData) => {
        const data = { ...receivedData };
        delete data.CheckMacValue; // 删除 CheckMacValue 用于验证
        const checkValue = create.payment_client.helper.gen_chk_mac_value(data);
        return checkValue === receivedData.CheckMacValue;
    }
};

module.exports = paymentService;
