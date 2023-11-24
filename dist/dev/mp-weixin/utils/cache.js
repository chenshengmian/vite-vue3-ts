"use strict";
const common_vendor = require("../common/vendor.js");
class cache {
  //存储在本地缓存指定的name中
  setCache(name, data) {
    try {
      common_vendor.index.setStorageSync(name, data);
    } catch (e) {
      console.log(e);
    }
  }
  //从本地缓存中读取置顶name对应的内容
  getCache(name) {
    let data;
    try {
      data = common_vendor.index.getStorageSync(name);
    } catch (e) {
      console.log(e);
    }
    return data;
  }
  //从本地缓存中移出指定key
  removeCache(name) {
    try {
      common_vendor.index.removeStorageSync(name);
    } catch (e) {
      console.log(e);
    }
  }
  //返回一个布尔值,表示name是否在本地缓存之中
  checkCache(name) {
    let value;
    try {
      const res = common_vendor.index.getStorageInfoSync();
      value = res.keys.includes(name);
    } catch (e) {
      console.log(e);
    }
    return value;
  }
  //清除本地数据缓存
  clearCache() {
    try {
      common_vendor.index.clearStorageSync();
    } catch (e) {
      console.log(e);
    }
  }
}
const caches = new cache();
exports.caches = caches;
