"use strict";
const utils_http = require("../utils/http.js");
function wxlogin(data) {
  let url = "plugin/index.php?i=1&f=guide&m=master_shop&d=mobile&r=uniapp.member.reg";
  return utils_http.sendRequest(url, "get", data, "");
}
function get_user_info() {
  let url = "plugin/index.php?i=1&f=guide&m=master_shop&d=mobile&r=uniapp.member.login.BasicInformation";
  return utils_http.sendRequest(url, "get", {}, "");
}
function AppLogin(data) {
  let url = "plugin/index.php?i=1&f=guide&m=master_shop&d=mobile&r=uniapp.member.login";
  return utils_http.sendRequest(url, "post", data, "");
}
function AppRegister(data) {
  let url = "plugin/index.php?i=1&f=guide&m=master_shop&d=mobile&r=uniapp.member.reg";
  return utils_http.sendRequest(url, "post", data, "");
}
exports.AppLogin = AppLogin;
exports.AppRegister = AppRegister;
exports.get_user_info = get_user_info;
exports.wxlogin = wxlogin;
