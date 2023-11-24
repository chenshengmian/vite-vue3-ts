"use strict";
const common_vendor = require("../../common/vendor.js");
const tmui_tool_lib_tmpinia = require("../../tmui/tool/lib/tmpinia.js");
require("../../tmui/tool/theme/theme.js");
require("../../tmui/tool/theme/colortool.js");
require("../../tmui/tool/lib/interface.js");
require("../../tmui/tool/function/util.js");
require("../../tmui/tool/function/preview.js");
if (!Math) {
  (tmRollNotice + tmCarousel + tmTabs + tmText + tmWaterfallItem + tmWaterfall + tmSku + tmApp)();
}
const tmApp = () => "../../tmui/components/tm-app/tm-app.js";
const tmText = () => "../../tmui/components/tm-text/tm-text.js";
const tmWaterfall = () => "../../tmui/components/tm-waterfall/tm-waterfall.js";
const tmWaterfallItem = () => "../../tmui/components/tm-waterfall-item/tm-waterfall-item.js";
const tmCarousel = () => "../../tmui/components/tm-carousel/tm-carousel.js";
const tmRollNotice = () => "../../tmui/components/tm-roll-notice/tm-roll-notice.js";
const tmTabs = () => "../../tmui/components/tm-tabs/tm-tabs.js";
const tmSku = () => "../../tmui/components/tm-sku/tm-sku.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "Homepage",
  setup(__props) {
    const show = common_vendor.ref(false);
    const list = common_vendor.ref({
      data: [
        {
          title: "颜色类型",
          id: "test",
          children: [
            {
              title: "白色",
              id: "a",
              num: 5
            },
            {
              title: "黑色",
              id: "b",
              num: 5
            }
          ]
        },
        {
          title: "尺码表",
          id: "model",
          children: [
            {
              title: "XS",
              id: "a",
              num: 5
            },
            {
              title: "S",
              id: "b",
              num: 5
            }
          ]
        },
        {
          title: "款式",
          id: "style",
          children: [
            {
              title: "套装",
              id: "a",
              num: 5
            },
            {
              title: "单件",
              id: "b",
              num: 5
            }
          ]
        }
      ],
      product: [
        {
          id: "a-a-a",
          title: "白色-XS-套装",
          num: 2,
          max_buy: 3,
          price: 56.9,
          salePrice: 54,
          tip: "当前可省10元",
          img: "https://gw.alicdn.com/bao/uploaded/i1/2328862868/O1CN01b5pglN1X3ahprbU9P_!!2328862868.jpg"
        },
        {
          id: "a-a-b",
          title: "白色-XS-单件",
          num: 5,
          max_buy: 3,
          price: 56.9,
          salePrice: 54,
          tip: "当前可省10元",
          img: "https://gw.alicdn.com/bao/uploaded/i3/2328862868/O1CN01UBMJfy1X3af4Lc3ME_!!2328862868.jpg"
        },
        {
          id: "a-b-a",
          title: "白色-S-套装",
          num: 3,
          max_buy: 3,
          price: 56.9,
          salePrice: 54,
          tip: "当前可省10元",
          img: "https://gw.alicdn.com/bao/uploaded/i1/TB1fw40oAvoK1RjSZPfSutPKFXa.jpg"
        },
        {
          id: "a-b-b",
          title: "白色-S-单件",
          num: 5,
          max_buy: 3,
          price: 56.9,
          salePrice: 54,
          tip: "当前可省10元",
          img: "https://gw.alicdn.com/bao/uploaded/i1/398719215/O1CN01zgD6Xi2HwWY8U589Z_!!398719215.jpg"
        },
        {
          id: "b-a-a",
          title: "黑色-XS-套装",
          num: 0,
          max_buy: 3,
          price: 56.9,
          salePrice: 54,
          tip: "当前可省10元",
          img: "https://gw.alicdn.com/bao/uploaded/i1/TB1fw40oAvoK1RjSZPfSutPKFXa.jpg"
        },
        {
          id: "b-a-b",
          title: "黑色-XS-单件",
          num: 5,
          max_buy: 3,
          price: 56.9,
          salePrice: 54,
          tip: "当前可省10元",
          img: "https://gw.alicdn.com/bao/uploaded/i3/2328862868/O1CN01UBMJfy1X3af4Lc3ME_!!2328862868.jpg"
        },
        {
          id: "b-b-a",
          title: "黑色-S-套装",
          num: 0,
          max_buy: 3,
          price: 56.9,
          salePrice: 54,
          tip: "当前可省10元",
          img: "https://gw.alicdn.com/bao/uploaded/i1/2328862868/O1CN01b5pglN1X3ahprbU9P_!!2328862868.jpg"
        },
        {
          id: "b-b-b",
          title: "黑色-S-单件",
          num: 5,
          max_buy: 3,
          price: 56.9,
          salePrice: 54,
          tip: "当前可省10元",
          img: "https://gw.alicdn.com/bao/uploaded/i1/TB1fw40oAvoK1RjSZPfSutPKFXa.jpg"
        }
      ]
    });
    const num = common_vendor.ref(2);
    function buy(e) {
      console.log(e);
    }
    const store = tmui_tool_lib_tmpinia.useTmpiniaStore();
    store.setTmVuetifyAddTheme("luse", "#2B9939");
    const wall = common_vendor.ref(null);
    const tabsTitle = common_vendor.ref([
      { key: "1", title: "全部", icon: "tmicon-ios-leaf" },
      { key: "2", title: "男装", icon: "tmicon-ios-umbrella" },
      { key: "3", title: "女装", dot: true, dotColor: "yellow", icon: "tmicon-ios-rocket" },
      { key: "4", title: "童装", dot: false, count: "3", icon: "tmicon-ios-partly-sunny" },
      { key: "5", title: "冲锋衣", dot: true, dotColor: "yellow", icon: "tmicon-ios-rocket" },
      { key: "6", title: "羽绒服", dot: false, count: "3", icon: "tmicon-ios-partly-sunny" }
    ]);
    const listimg2 = [
      { url: "https://store.tmui.design/api_v2/public/random_picture?row=1&random=12", text: "测试提醒语信息" },
      { url: "https://store.tmui.design/api_v2/public/random_picture?row=1&random=12", text: "南昌红谷滩区." }
    ];
    const imglist = common_vendor.ref([
      {
        img: "https://gw.alicdn.com/bao/uploaded/i2/1848622920/O1CN018zBHJ91XRPJ4bHW78_!!0-item_pic.jpg_320x320q90.jpg",
        text: "杨大爷麻辣香肠腊肠500克四川特产烟熏肉农家自制川味烤腊肉辣肠",
        price: "49",
        num: "3000+"
      },
      {
        img: "https://gw.alicdn.com/imgextra/i4/2207613550143/O1CN01hPpOvy1CvXQdlZLeC_!!2207613550143-0-alimamacc.jpg_q90.jpg",
        text: "",
        price: "200",
        num: "3000+"
      },
      {
        img: "https://gw.alicdn.com/bao/uploaded/i4/14498052/O1CN01pa6ScB29LrgfkRp8V_!!14498052.jpg_320x320q90.jpg",
        text: "带盖 酸奶杯一次性塑料布丁杯胖胖pp果冻杯慕斯甜品杯双皮奶100套",
        price: "12.8",
        num: "1500+"
      },
      {
        img: "https://images.pexels.com/photos/12640459/pexels-photo-12640459.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
        text: "带盖 酸奶杯一次性塑料布丁杯胖胖pp果冻杯慕斯甜品杯双皮奶100套",
        price: "12.8",
        num: "1500+"
      },
      {
        img: "https://gw.alicdn.com/bao/uploaded/i4/1026973813/O1CN014Kirba1e2OrHg7gwN_!!1026973813.jpg_320x320q90.jpg",
        text: "带盖 酸奶杯一次性塑料布丁杯胖胖pp果冻杯慕斯甜品杯双皮奶100套",
        price: "12.8",
        num: "1500+"
      },
      {
        img: "https://gw.alicdn.com/imgextra/i3/23844911/O1CN01N1UxMS1m9Hs6gGu6E_!!23844911-0-alimamacc.jpg",
        text: "",
        price: "200",
        num: "3000+"
      },
      {
        img: "https://gw.alicdn.com/bao/uploaded/i4/2418392409/O1CN01zT4JbA1TfMoU30Uub_!!2418392409.jpg_320x320q90.jpg",
        text: "50枚挂耳咖啡滤袋日本材质手冲咖啡滤纸咖啡粉滤袋挂耳咖啡袋包邮",
        price: "12.8",
        num: "1500+"
      },
      {
        img: "https://gw.alicdn.com/bao/uploaded/i2/6000000001207/O1CN016TztFg1Kmqqrtarb0_!!6000000001207-0-picassoopen.jpg_320x320q90.jpg",
        text: "带盖 酸奶杯一次性塑料布丁杯胖胖pp果冻杯慕斯甜品杯双皮奶100套",
        price: "12.8",
        num: "1500+"
      },
      {
        img: "https://gw.alicdn.com/bao/uploaded/i3/2200531292142/O1CN01gFUdOw1Rh4vjN44sB_!!0-item_pic.jpg_320x320q90.jpg",
        text: "带盖 酸奶杯一次性塑料布丁杯胖胖pp果冻杯慕斯甜品杯双皮奶100套",
        price: "12.8",
        num: "1500+"
      }
    ]);
    const itemClick = () => {
      common_vendor.index.navigateTo({
        url: "tree"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(_ctx.test),
        b: common_vendor.p({
          color: "red",
          list: "2023年11月17日清仓大甩卖"
        }),
        c: common_vendor.p({
          autoplay: true,
          model: "dot",
          margin: [0, 16],
          align: "right",
          round: 3,
          width: 686,
          height: 300,
          list: listimg2
        }),
        d: common_vendor.o(_ctx.tabschange),
        e: common_vendor.p({
          activeFontColor: "yellow",
          showTabsLineAni: true,
          list: tabsTitle.value,
          ["item-width"]: 180,
          width: 636,
          ["default-name"]: "2"
        }),
        f: common_vendor.f(imglist.value, (item, index, i0) => {
          return {
            a: "08e035b5-6-" + i0 + "," + ("08e035b5-5-" + i0),
            b: common_vendor.p({
              label: item.text,
              _class: "text-overflow-2"
            }),
            c: "08e035b5-7-" + i0 + "," + ("08e035b5-5-" + i0),
            d: common_vendor.p({
              color: "orange",
              _class: "px-10",
              ["font-size"]: 36,
              label: item.price
            }),
            e: "08e035b5-8-" + i0 + "," + ("08e035b5-5-" + i0),
            f: common_vendor.p({
              color: "grey",
              ["font-size"]: 24,
              label: item.num
            }),
            g: common_vendor.o(($event) => show.value = true, index),
            h: common_vendor.o(itemClick, index),
            i: index,
            j: "08e035b5-5-" + i0 + ",08e035b5-4",
            k: common_vendor.p({
              img: item.img
            })
          };
        }),
        g: common_vendor.sr(wall, "08e035b5-4,08e035b5-0", {
          "k": "wall"
        }),
        h: common_vendor.p({
          width: 686
        }),
        i: common_vendor.o(buy),
        j: common_vendor.o(($event) => show.value = $event),
        k: common_vendor.p({
          value: "a-a-a",
          num: num.value,
          height: 900,
          ["sku-map"]: [{
            key: "size",
            value: "商品尺码"
          }, {
            key: "color",
            value: "商品颜色"
          }, {
            key: "model",
            value: "商品型号"
          }],
          list: list.value,
          show: show.value
        }),
        l: common_vendor.sr("app", "08e035b5-0")
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/tmuidome/src/components/Homepage/Homepage.vue"]]);
wx.createComponent(Component);
