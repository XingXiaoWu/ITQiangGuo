const login = async (page) => {
    await page.goto('https://pc.xuexi.cn/points/login.html')
    console.log('开始寻找');
    // 找寻登陆二维码
    // const text = await page.waitForSelector('text=用学习强国扫码登录，如未安装扫码下载')
    // 滚动到二维码页面
    // await text.screenshot();
    const qr = await page.waitForSelector('#ddlogin-iframe')
    await qr.screenshot();
    // 判断是否登陆成功
}

module.exports = login