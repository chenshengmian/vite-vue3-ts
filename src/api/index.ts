import sendRequest from "@/utils/http";
interface logodata{
    username:string,
    password:string
}

export function getAccount(){
    let urls : string = '/plugin/index.php?i=1&f=guide&m=many_shop&d=mobile&r=uniapp.account'
    let data = {}
    return sendRequest(urls,"get", data,'');
}

//登录
export function login(data:logodata){
    let urls : string = '/plugin/index.php?i=1&f=guide&m=many_shop&d=mobile&r=uniapp.account.login'
    return sendRequest(urls,"post", data,'');
}