"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const tmui_index = require("./tmui/index.js");
const utils_cache = require("./utils/cache.js");
require("./tmui/tool/lib/fetch.js");
require("./tmui/tool/function/util.js");
require("./tmui/tool/function/preview.js");
require("./tmui/tool/lib/language.js");
require("./tmui/tool/lib/share.js");
require("./tmui/tool/router/index.js");
require("./tmui/tool/lib/tmuiconfigDefault.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/TurnCamera/TurnCamera.js";
  "./pages/CustomizePage/CustomizePage.js";
  "./pages/OpenAlbum/OpenAlbum.js";
  "./pages/SearchTargeting/SearchTargeting.js";
  "./pages/ShoppingCart/ShoppingCart.js";
  "./pages/PersonalCenter/PersonalCenter.js";
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "App",
  setup(__props) {
    const { proxy } = common_vendor.getCurrentInstance();
    proxy.$caches.setCache("isapp", 1);
    return (_ctx, _cache) => {
      return {};
    };
  }
});
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/tmuidome/src/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.use(tmui_index.tmui, { shareDisable: false });
  app.config.globalProperties.$caches = utils_cache.caches;
  return {
    app,
    Pinia: common_vendor.Pinia
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
