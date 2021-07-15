// 1.登陆
const { chromium } = require('playwright');
const { loginSuccess, login } = require('./login.js');

(async () => {
    const browser = await chromium.launch({
        headless: false,
    });
    const page = await browser.newPage();
    // 1.登陆
    await login(page);
    // 2.判读是否登录成功
    const success = await loginSuccess(page);
    if (!success){
        console.log("登录失败，结束任务");
        process.exit(1);
    }
    console.log('登录成功');
    // await page.waitForLoadState('domcontentloaded');
    
})();