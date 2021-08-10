// 1.登陆
const { chromium } = require('playwright');
const { loginSuccess, login } = require('./login.js');
const { saveCookies, getUserId } = require('./user');
(async () => {

    const browser = await chromium.launch({
        headless: false,
    });
    const context = await browser.newContext();

    const page = await context.newPage();
    // 1.登陆
    await login(page);
    // 2.判读是否登录成功
    const success = await loginSuccess(page);
    if (!success){
        console.log("登录失败，结束任务");
        process.exit(1);
    }
    console.log('登录成功');
    // 获取cookie
    const cookies = await context.cookies()
    // 获取uid
    const userId = await getUserId(cookies)
    // 存储cookie
    saveCookies(userId,cookies)
    // TODO:用户id和名称

    // await page.waitForLoadState('domcontentloaded');

    // TODO:展示所有内容
})();