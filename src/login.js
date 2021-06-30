const login = async (page) => {
    await page.goto('https://pc.xuexi.cn/points/login.html')
    // 登陆完毕
    await page.waitForSelector('text=您好，欢迎您');
    
}

export default login