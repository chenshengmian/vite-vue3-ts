let url:string = ''
let timeout:number = 0
let version:string = ''

// 开发环境中 
if(process.env.NODE_ENV == "development"){ 
	url = "https://wxrm.gd313.cn/"
    timeout = 10000
	version = 'WXRM202311231004'
}else{
	// 生产环境中
	url = "https://wxrm.gd313.cn/"
    timeout = 10000
	version = 'WXRM202311231004'

}

export default {
	url,
    timeout,
	version
}
