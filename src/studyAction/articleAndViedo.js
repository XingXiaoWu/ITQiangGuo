/* eslint-disable no-useless-escape */
// 1.登陆
const { chromium } = require('playwright');
const { GET } = require('../utils/request')
const { article_num_all, article_time_all } = require('../constValues')
// 文章
const article = async (cookies, scores) => {
    // 判断是否分值满了
    // if scores["article_num"] < const.article_num_all or scores["article_time"] < const.article_time_all:
    if (scores['article_num'] < article_num_all || scores['article_num'] < article_time_all) {

        // 1.新建无头浏览器
        const browser = await chromium.launch({
            headless: false,
        });

        const context = await browser.newContext();

        await context.addCookies(cookies);

        const page = await context.newPage();

        await page.goto("https://www.xuexi.cn/notFound.html");

        // 获取可访问的地址
        const links = await getArticleLinks()
        let try_count = 0
        let readarticle_time = 0
        while (true) {
            if (scores["article_num"] < article_num_all && try_count < 10){
                let article_remain = article_num_all - scores["article_num"]
                
            }
        }
    }
}

// 获取文章links
const getArticleLinks = async () => {
    const response = await GET('https://www.xuexi.cn/c06bf4acc7eef6ef0a560328938b5771/data9a3668c13f6e303932b5e0e100fc248b.js')
    // 正则提取
    const pattern = /list\"\:(.+),\"count\"\:/
    let vv = pattern.exec(response)[1]
    vv = vv.replace(/"([^"]*)"/g, "'$1'")
    const array = eval('(' + vv + ')');
    // TODO:取两千个
    array.reverse()
    const result = []
    array.forEach(item => {
        result.push(item['static_page_url'])
    });
    return result
}

module.exports = {
    article,
    getArticleLinks
}