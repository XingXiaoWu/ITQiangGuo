// 1.登陆
const { chromium } = require('playwright');
const undici = require('undici');

const article = async (cookies) => {
    // 干活

    // 1.新建无头浏览器
    const browser = await chromium.launch({
        headless: false,
    });

    const context = await browser.newContext();

    await context.addCookies(cookies);

    const page = await context.newPage();

    await page.goto("https://www.xuexi.cn/notFound.html");

    // 获取可访问的地址
    await getArticleLinks()
    console.log(123);
}

// 获取links
const getArticleLinks = async () => {
    const { body } = await undici.request('https://www.xuexi.cn/c06bf4acc7eef6ef0a560328938b5771/data9a3668c13f6e303932b5e0e100fc248b.js',{
        method: 'GET',
        headers: {
            "cache-control": 'no-cache',
        }
    })
    body.setEncoding('utf8');
    
    for await (const data of body) {
        console.log('data', data)
    }
    console.log(body);
}

module.exports = {
    article,
    getArticleLinks
}