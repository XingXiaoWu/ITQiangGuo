const undici = require('undici')

const GET = async (url,  headers) => {
    const {body} = await undici.request(url,{
        method: 'GET',
        headers: {
            "cache-control": 'no-cache',
            'content-type': 'application/json',
            ...headers
        }
    })
    let result = await body.json()
    return result
}

module.exports = {
    GET
}