"use strict";
const common_vendor = require("../common/vendor.js");
const utils_config = require("./config.js");
const utils_cache = require("./cache.js");
let baseUrl = utils_config.configs.url;
const sendRequest = (url, methods, data = {}, contentType) => {
  let types = "";
  if (methods == "POST" && !contentType) {
    types = "application/x-www-form-urlencoded";
  } else if (methods == "POST" && contentType) {
    types = contentType;
  } else {
    types = "application/json";
  }
  var bases = baseUrl + url;
  var token = "Bearer " + utils_cache.caches.getCache("token") || "";
  return new Promise(function(resolve, reject) {
    common_vendor.index.request({
      url: bases,
      data,
      method: methods,
      header: {
        "Content-Type": types,
        "Cookie": `JSESSIONID=${token}`,
        "Accept": "application/json, text/javascript, */*; q=0.01",
        "Authorization": token
      },
      success(res) {
        getToken();
        common_vendor.index.hideLoading();
        if (res.header.authorization || res.header.Authorization) {
          utils_cache.caches.setCache("token", res.header.authorization || res.header.Authorization);
        }
        var code = res.statusCode;
        switch (code) {
          case 401:
            common_vendor.index.showModal({
              title: "登录提示",
              content: "身份已过期，请重新登录后再来操作！",
              success: (ress) => {
                if (ress.confirm) {
                  common_vendor.index.redirectTo({
                    url: "/pages/WxLogin/Accredit"
                  });
                }
              }
            });
            break;
          default:
            resolve(res.data);
            break;
        }
      },
      fail(err) {
        reject(err);
      }
    });
  });
};
const getToken = () => {
  common_vendor.index.request({
    url: utils_config.configs.url + "plugin/index.php?i=1&f=guide&m=master_shop&d=mobile&r=uniapp",
    method: "POST",
    header: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + utils_cache.caches.getCache("token")
    },
    data: {
      refershtoken: utils_cache.caches.getCache("reftoken"),
      userid: utils_cache.caches.getCache("userid")
    },
    success: (res) => {
      const userinfos = JSON.parse(res.data.substring(1));
      const { status, result: { access_token, refersh_token } } = userinfos;
      if (status == 1) {
        utils_cache.caches.setCache("reftoken", refersh_token);
        utils_cache.caches.setCache("token", access_token);
      }
    },
    fail: (err) => {
      console.log(err);
    }
  });
};
setInterval(() => {
  getToken();
}, 1e3 * 60 * 25);
exports.sendRequest = sendRequest;
