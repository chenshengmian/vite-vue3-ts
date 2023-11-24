import configs from './config'
import cache from './cache'
// 封装请求接口
let baseUrl: string = configs.url

// 封装的uni.request请求
const sendRequest = (url:string, methods: string, data = {}, contentType: string) => {
    //判断header提交数据类型
    let types = '';
    if (methods == 'POST' && !contentType) {
        // 最常见的 POST 提交数据的方式。浏览器的原生 form 表单，如果不设置 enctype 属性，
        //就会以 application/x-www-form-urlencoded 方式提交数据。数据按照 key1=val1&key2=val2 的方式进行编码，
        //key 和 val 都进行了 URL 转码，不支持文件，一般用于表单提交
        types = 'application/x-www-form-urlencoded'
    } else if (methods == 'POST' && contentType) {
        // multipart/form-data   支持文件上传的格式，一般需要上传文件的表单则用该类型
        types = contentType
    } else {
        // 其他json数据格式请求 
        types = 'application/json';
    }

    var bases = baseUrl + url;

    var token ='Bearer ' + cache.getCache('token') || '';
    // uni.showLoading({ title: '加载中...', mask: true })
    return new Promise(function (resolve, reject) {
        uni.request({
            url: bases,
            data: data,
            method: methods,
            header: {
                'Content-Type': types,
                "Cookie":`JSESSIONID=${token}`,
                'Accept': 'application/json, text/javascript, */*; q=0.01',
                'Authorization': token,
            },
            success(res) {
                getToken()
                uni.hideLoading()
                if (res.header.authorization || res.header.Authorization) {
                    cache.setCache('token', res.header.authorization || res.header.Authorization);
                }
                var code = res.statusCode;
                switch (code) {
                    case 401:
                        uni.showModal({
                            title: '登录提示',
                            content: '身份已过期，请重新登录后再来操作！',
                            success: ress => {
                                if (ress.confirm) {
                                    uni.redirectTo({
                                        url: '/pages/WxLogin/Accredit'
                                    })
                                }
                            }
                        })
                        break;
                    default:
                        resolve(res.data);
                        break;
                }
            },
            fail(err) {
                reject(err);
            }
        })
    })
}
const getToken =()=> {
    uni.request({
        url:configs.url+'plugin/index.php?i=1&f=guide&m=master_shop&d=mobile&r=uniapp',
        method:'POST',
        header:{
            'Content-Type':'application/json',
            'Authorization':'Bearer ' +cache.getCache('token')
        },
        data:{
            refershtoken: cache.getCache('reftoken'),
            userid:cache.getCache('userid')
        },
        success:res=>{
            const userinfos = JSON.parse(res.data.substring(1))
            const { status, result:{ access_token, refersh_token}} = userinfos
            if(status == 1){
                cache.setCache('reftoken', refersh_token)
                cache.setCache('token', access_token)
            }
        },
        fail:err=>{
            console.log(err)
        }
    })
}
setInterval(() => {
    getToken()
}, 1000 * 60 * 25)
// 抛出请求
export default sendRequest


