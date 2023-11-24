import sendRequest from "@/utils/http";
interface loginlist{
    code:string,
    nickName:string,
    avatarUrl:string,
    language:string,
    gender:number
}
interface applogin{
    captcha:string
    username:string
    password:string
    iv:number
    sign:string
}

interface appRegister{
    smsVerificationcode:number
    username:string
    password:string
}

export function wxlogin(data:loginlist){
    let url : string = 'plugin/index.php?i=1&f=guide&m=master_shop&d=mobile&r=uniapp.member.reg'
    return sendRequest(url,"get", data ,'');
}

export function get_user_info(){
    let url : string = 'plugin/index.php?i=1&f=guide&m=master_shop&d=mobile&r=uniapp.member.login.BasicInformation'
    return sendRequest(url,"get", {},'');
}


export function AppLogin(data:applogin){
    let url : string = 'plugin/index.php?i=1&f=guide&m=master_shop&d=mobile&r=uniapp.member.login'
    return sendRequest(url,"post", data,'');
}

export function AppRegister(data:appRegister){
    let url : string = 'plugin/index.php?i=1&f=guide&m=master_shop&d=mobile&r=uniapp.member.reg'
    return sendRequest(url,"post", data,'');
}