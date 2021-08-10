// 1.登陆
const { chromium } = require('playwright');
const { loginSuccess, login } = require('./login.js');
const { article } = require('./studyAction/articleAndViedo.js');
const { saveCookies, getUserId } = require('./user');
const userCookies = require('./user/cookie.json');
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
    // 存完以后，关闭浏览器
    browser.close()
    // TODO:用户id和名称

    // await page.waitForLoadState('domcontentloaded');

    // TODO:展示所有内容

    // 开始学习任务
    // const tmpCookie = userCookies['430397708'];
    // article(tmpCookie)

    // article_thread = threads.MyThread("文章学 xi ", article, uid, cookies, article_index, scores, lock=lock)
        // video_thread = threads.MyThread("视频学 xi ", video, uid, cookies, video_index, scores, lock=lock)
})();