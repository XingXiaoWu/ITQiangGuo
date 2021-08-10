const axios = require('axios')
const QS = require('qs')

// 默认配置
let defaults = {
	baseURL: process.env.VUE_APP_BASE_API || '',
	withCredentials: true,
	timeout: 50000
}

// 写入配置
axios.defaults = {
	...defaults,
}

// 请求拦截器，后添加的先执行，先添加的后执行
const defaultInterceptorsRequest = axios.interceptors.request.use(
	(config) => {
		// 写入默认需求
		return config;
	},
	(error) => {
		// 出错
		return Promise.reject(error);
	}
)

// 响应拦截器，先添加的先执行，后添加的后执行
const defaultInterceptorsResponse = axios.interceptors.response.use(
	(response) => {
		return response
	},
	(error) => {
		return Promise.reject(error);
	}
)
// 设置统一错误处理
let errorHandle = null;
const setErrorHandle = (handle) => {
	errorHandle = handle;
}

// 如果不需要默认拦截器，可以移除
const removeDefaultInterceptors = () => {
	axios.interceptors.request.eject(defaultInterceptorsRequest);
	axios.interceptors.response.eject(defaultInterceptorsResponse);
}


// 相关请求封装9
const GET = async (url , params , config = {}) => {
	// 注意先解构config，避免params被覆盖
	// 添加noche时间戳，避免IE缓存get请求
	try {
		const response = await axios
			.get(axios.defaults.baseURL + url, {
				...config,
				params: {
					...params,
					noche: new Date().getTime()
				}
			});
		return await Promise.resolve(response.data);
	} catch (error) {
		if (errorHandle)
			errorHandle(error);
		return await Promise.reject(error);
	}
}
const POSTJSON = async (url , params , config = {}) =>{
	try {
		const response = await axios.post(axios.defaults.baseURL + url, params, config);
		return await Promise.resolve(response.data);
	} catch (error) {
		if (errorHandle)
			errorHandle(error);
		return await Promise.reject(error);
	}
}

const POSTFORM = async (url , params , config = {}) =>{
	// 这里的header设置可能存在被覆盖的风险
	try {
		const response = await axios.post(axios.defaults.baseURL + url, QS.stringify(params), {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
			},
			...config
		});
		return await Promise.resolve(response.data);
	} catch (error) {
		if (errorHandle)
			errorHandle(error);
		return await Promise.reject(error);
	}
}

const PUT = async (url , params , config = {}) =>{
	try {
		const response = await axios.put(axios.defaults.baseURL + url, params, config);
		return await Promise.resolve(response.data);
	} catch (error) {
		if (errorHandle)
			errorHandle(error);
		return await Promise.reject(error);
	}
}

const DELETE = async (url , params , config = {}) =>{
	try {
		const response = await axios.delete(axios.defaults.baseURL + url, {
			...config,
			params: params
		});
		return await Promise.resolve(response.data);
	} catch (error) {
		if (errorHandle)
			errorHandle(error);
		return await Promise.reject(error);
	}
}

const PATCH = async (url , params , config = {}) =>{
	try {
		const response = await axios.patch(axios.defaults.baseURL + url, params, config);
		return await Promise.resolve(response.data);
	} catch (error) {
		if (errorHandle)
			errorHandle(error);
		return await Promise.reject(error);
	}
}

// 下载
const DOWNLOAD = async(url , params , config = { responseType: 'blob' }) => {
	// 注意先解构config，避免params被覆盖
	try {
		const response = await axios
			.get(axios.defaults.baseURL + url, { ...config, params: params });
		return await Promise.resolve(response.data);
	} catch (error) {
		if (errorHandle)
			errorHandle(error);
		return await Promise.reject(error);
	}
}

module.exports = {
    ...axios,
	setErrorHandle,
	removeDefaultInterceptors,
	POSTJSON,
	POSTFORM,
	GET,
	PUT,
	DELETE,
	PATCH,
	DOWNLOAD
}