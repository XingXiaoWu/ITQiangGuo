const fs = require('fs-extra')
const path = require('path')
const userConfigJson = require('./user/cookie.json')
const { getScore } = require('./score')

const saveCookies = async (userId, cookies) => {
    // 存储cookie
    // 获取id
    // const userId = await getUserId(cookies)
    const userConfigPath = path.resolve(__dirname,'./user/cookie.json')
    const result = {
        ...userConfigJson,
        [userId]:cookies
    }
    // 写到json里
    fs.writeFileSync(userConfigPath, JSON.stringify(result, null, '\t'));
}

const getUserId = async (cookies) => {
    // 从分数获取
    const { userId } = await getScore(cookies)
    return userId
}

module.exports = {
    saveCookies,
    getUserId
}