// 获取分数
const undici = require('undici')

const getScore = async () => {
    // 网络请求
    // 获取cookie
    let tmpCookie = '_uab_collina=162824243529365826675354;__UID__=6b4d4f70-f699-11eb-8611-677a7b8eb094;tmzw=1628242435802;zwfigprt=8a02562e8e0eece84e8411e1af51925d;aliyungf_tc=7164a7444ab9e53ccba5a93c880b1e974d9e7ca2453705c8e968c0210f4bece1;acw_tc=2f6fc10b16282424361598079e932eff66686a52c711fa2b8583b089613f19;aliyungf_tc=2c95fe484d02463ad52bd884152d7a50371ad580d7d748af1cdf43ce89451bb1;acw_tc=2f6fc10b16282424363471676e9339956ebd9d044df90787efa1c4f0e1d2d6;_bl_uid=bqkIts1h09855eidO8j2vU8nbCz7;_bl_uid=e5kFdsv80Um54miy38IFvmgqaOk7;aliyungf_tc=acfaa87ea20dccc99e4510aa944304c26f94b8dfb45f616fb13e3d64d8b433a7;acw_tc=2f6fc10b16282424392901924e9339e99baddc30416dc3b1163ec02d9680d2;aliyungf_tc=c053760ea0697b2b501bf34c5b476968dd42cfda251e31b62af6def0009b5419;acw_tc=2f6fc10b16282424398364292e9358ac3080ec6b76aa969d24f4b4c28d2209;token=1615ebce22984211b2f1dccb82382cc8;'
    // cookies.forEach(cookie => {
    //     tmpCookie = tmpCookie+ cookie.name + '=' + cookie.value + ';'
    // });
    // console.log(tmpCookie);
    // 获取总分
    const totalResponse = await undici.request('https://pc-api.xuexi.cn/open/api/score/get',{
        method: 'GET',
        headers:{
            cookie: tmpCookie,
            "cache-control": 'no-cache',
            'content-type': 'application/json'
        }
    });
    const a = totalResponse.body
    const b = totalResponse.body.json()
}


module.exports = {
    getScore
}