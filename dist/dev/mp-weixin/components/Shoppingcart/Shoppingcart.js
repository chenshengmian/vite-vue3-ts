"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _component_tm_input = common_vendor.resolveComponent("tm-input");
  _component_tm_input();
}
if (!Math) {
  (tmCheckbox + tmImage + tmStepper + tmButton + tmText + tmModal + tmApp)();
}
const tmApp = () => "../../tmui/components/tm-app/tm-app.js";
const tmText = () => "../../tmui/components/tm-text/tm-text.js";
const tmImage = () => "../../tmui/components/tm-image/tm-image.js";
const tmCheckbox = () => "../../tmui/components/tm-checkbox/tm-checkbox.js";
const tmStepper = () => "../../tmui/components/tm-stepper/tm-stepper.js";
const tmButton = () => "../../tmui/components/tm-button/tm-button.js";
const tmModal = () => "../../tmui/components/tm-modal/tm-modal.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "Shoppingcart",
  setup(__props) {
    common_vendor.ref("");
    common_vendor.ref("眼镜框");
    common_vendor.ref(100);
    common_vendor.ref(null);
    const sumprice = common_vendor.ref(100);
    const showWin2 = common_vendor.ref(false);
    const cardArr = common_vendor.ref([
      {
        id: 1,
        name: "眼镜框",
        url: "https://store.tmui.design/api_v2/public/random_picture",
        maxnum: 99,
        price: 100,
        num: 5
      },
      {
        id: 2,
        name: "护眼仪",
        url: "https://store.tmui.design/api_v2/public/random_picture?random=2",
        maxnum: 5,
        price: 1990,
        num: 4
      },
      {
        id: 3,
        name: "眼药水",
        url: "https://store.tmui.design/api_v2/public/random_picture?random=3",
        maxnum: 10,
        price: 12,
        num: 2
      }
    ]);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(cardArr.value, (item, index, i0) => {
          return {
            a: "1f9b9e23-1-" + i0 + ",1f9b9e23-0",
            b: "1f9b9e23-2-" + i0 + ",1f9b9e23-0",
            c: common_vendor.p({
              width: 180,
              height: 150,
              src: item.url
            }),
            d: common_vendor.t(item.name),
            e: common_vendor.t(item.price),
            f: "1f9b9e23-3-" + i0 + ",1f9b9e23-0",
            g: common_vendor.p({
              circular: true,
              max: item.maxnum,
              defaultValue: item.num,
              fontSize: 24
            }),
            h: index
          };
        }),
        b: common_vendor.p({
          round: 10,
          value: "banner"
        }),
        c: common_vendor.p({
          round: 10,
          value: "all",
          label: "全选"
        }),
        d: common_vendor.t(sumprice.value),
        e: common_vendor.o(($event) => showWin2.value = true),
        f: common_vendor.p({
          color: "pink",
          shadow: 0,
          size: "small",
          label: "结算"
        }),
        g: common_vendor.p({
          src: "https://picsum.photos/450/150",
          height: 150,
          width: 450
        }),
        h: common_vendor.p({
          label: "主体内容哦主体内容哦主体内容哦主体内容哦主体内容哦主体内容哦主体内容哦主体内容哦主体内容哦主体内容哦主体内容哦主体内容哦主体内容哦主体内容哦主体内容哦"
        }),
        i: common_vendor.p({
          src: "https://picsum.photos/450/150?id=36",
          height: 150,
          width: 450
        }),
        j: common_vendor.sr("modal", "1f9b9e23-6,1f9b9e23-0"),
        k: common_vendor.o(($event) => showWin2.value = $event),
        l: common_vendor.p({
          color: "grey-5",
          height: 500,
          border: 0,
          text: true,
          okColor: "black",
          cancelColor: "white",
          linear: "bottom",
          title: "信息框",
          show: showWin2.value
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1f9b9e23"], ["__file", "D:/tmuidome/src/components/Shoppingcart/Shoppingcart.vue"]]);
wx.createComponent(Component);
