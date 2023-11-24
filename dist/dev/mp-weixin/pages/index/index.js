"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_Homepage2 = common_vendor.resolveComponent("Homepage");
  const _easycom_Shoppingcart2 = common_vendor.resolveComponent("Shoppingcart");
  const _component_tm_sheet = common_vendor.resolveComponent("tm-sheet");
  (_easycom_Homepage2 + _easycom_Shoppingcart2 + _component_tm_sheet)();
}
const _easycom_Homepage = () => "../../components/Homepage/Homepage.js";
const _easycom_Shoppingcart = () => "../../components/Shoppingcart/Shoppingcart.js";
if (!Math) {
  (_easycom_Homepage + _easycom_Shoppingcart + PersonalCenter + tmTabbarItem + tmTabbar + tmApp)();
}
const tmApp = () => "../../tmui/components/tm-app/tm-app.js";
const tmTabbar = () => "../../tmui/components/tm-tabbar/tm-tabbar.js";
const tmTabbarItem = () => "../../tmui/components/tm-tabbar-item/tm-tabbar-item.js";
const PersonalCenter = () => "../../components/PersonalCenter/PersonalCenter.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const { proxy } = common_vendor.getCurrentInstance();
    const acc = common_vendor.ref(0);
    if (!proxy.$caches.getCache("acc")) {
      acc.value = 0;
    } else {
      acc.value = proxy.$caches.getCache("acc");
    }
    common_vendor.onShow(() => {
      getacc();
    });
    const getacc = () => {
      if (acc.value == 0) {
        common_vendor.index.setNavigationBarTitle({
          title: "首页"
        });
      } else if (acc.value == 1) {
        common_vendor.index.setNavigationBarTitle({
          title: "购物车"
        });
      } else if (acc.value == 2) {
        common_vendor.index.setNavigationBarTitle({
          title: "个人中心"
        });
      }
    };
    const changeAcc = (i) => {
      acc.value = i;
      proxy.$caches.setCache("acc", i);
      getacc();
    };
    const tabbarArr = common_vendor.ref([
      { id: 1, name: "首页", unicon: "tmicon-home", icon: "tmicon-md-home", acc: 0 },
      { id: 2, name: "购物车", unicon: "tmicon-shoppingcart", icon: "tmicon-shopping-cart-fill", acc: 1 },
      { id: 3, name: "个人中心", unicon: "tmicon-account", icon: "tmicon-md-person", acc: 2 }
    ]);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: acc.value == 0
      }, acc.value == 0 ? {} : acc.value == 1 ? {} : acc.value == 2 ? {} : {}, {
        b: acc.value == 1,
        c: acc.value == 2,
        d: common_vendor.f(tabbarArr.value, (item, id, i0) => {
          return {
            a: common_vendor.o(($event) => changeAcc(item.acc), id),
            b: "11956f9b-6-" + i0 + ",11956f9b-5",
            c: common_vendor.p({
              activeColor: "blue",
              text: item.name,
              icon: item.icon,
              unicon: item.unicon
            }),
            d: id
          };
        }),
        e: common_vendor.o(($event) => acc.value = $event),
        f: common_vendor.p({
          autoSelect: false,
          active: acc.value
        })
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/tmuidome/src/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
