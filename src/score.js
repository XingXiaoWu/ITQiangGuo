// 获取分数
const { GET } = require('./utils/request')

const getScore = async (cookies) => {
    // 网络请求
    // 获取cookie
    let tmpCookie = ''
    cookies.forEach(cookie => {
        tmpCookie = tmpCookie+ cookie.name + '=' + cookie.value + ';'
    });
    // 获取总分
    const totalJSON = await GET('https://pc-api.xuexi.cn/open/api/score/get',{},{
        headers:{
            cookie: tmpCookie,
        }
    });
    // 累计总分
    const total = totalJSON.data.score
    // 用户id
    const userId = totalJSON.data.userId

    // 获取分数相关内容
    const scoreJSON = await GET('https://pc-api.xuexi.cn/open/api/score/today/queryrate',{},{
        headers:{
            cookie: tmpCookie,
        }
    })

    // 获取今天分数
    const todayJSON = await GET('https://pc-api.xuexi.cn/open/api/score/today/query',{},{
        headers:{
            cookie: tmpCookie,
        }
    })
    
    // 获取今日分数
    let today = todayJSON.data.score
    // 每日任务
    let dayScoreDtos = scoreJSON.data.dayScoreDtos

    // console.log(today,dayScoreDtos);

    let rule_list = [{
        ruleId: 1,
        name: 'article_num', //阅读文章
    }, {
        ruleId: 2,
        name: 'video_num', //视听学习
    }, {
        ruleId: 9,
        name: 'login', // 登陆
    }, {
        ruleId: 1002,
        name: 'article_time', //文章时常
    },{
        ruleId: 1003,
        name: 'video_time', //视听学 xi 时长
    },{
        ruleId: 6,
        name: 'daily', //每日答题
    },{
        ruleId: 5,
        name: 'weekly', //3每周答题
    },{
        ruleId: 4,
        name: 'zhuanxiang', //4专项答题
    },]
    let scores = {}
    dayScoreDtos.forEach(dot => {
        rule_list.forEach(rule =>{
            if (dot.ruleId === rule.ruleId) {
                scores={
                    ...scores,
                    [rule.name]: dot.currentScore
                }
            }
        })
    });
    scores.today = today
    console.log('今日总分:'+today);

    console.log('阅读文章:' + scores.article_num + ','+
                '视听学习:' + scores.video_num + ','+
                '登陆:' + scores.login + ','+
                '文章时常:' + scores.article_time + ','+
                '视听学 xi 时长:' + scores.video_time + ','+
                '每日答题:' + scores.daily + ','+
                '每周答题:' + scores.weekly + ','+
                '专项答题:' + scores.zhuanxiang + ','
                );
    // 阅读文章，视听学 xi ，登录，文章时长，视听学 xi 时长，每日答题，每周答题，专项答题
    return {
        userId,
        total,
        scores
    }
}

module.exports = {
    getScore
}