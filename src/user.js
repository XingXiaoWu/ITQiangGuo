const fs = require('fs-extra')
const { getScore } = require('./score')

const saveCookies = (cookies) => {
    // 存储cookie
    // 获取id
    getUserId(cookies)
}

const getUserId = (cookies) => {
    // 从分数获取
    const { userId } = getScore(cookies)
}

module.exports = {
    saveCookies,
    getUserId
}