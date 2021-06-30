// 1.登陆
const { chromium } = require('playwright');
const login = require('./login')
(async () => {
    const browser = await chromium.launch({
        headless: false,
    });
    const page = await browser.newPage();
    // 1.登陆
    await login(page);
    console.log('登陆成功');
})();