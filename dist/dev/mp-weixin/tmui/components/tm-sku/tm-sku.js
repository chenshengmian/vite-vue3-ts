"use strict";
const common_vendor = require("../../../common/vendor.js");
const tmui_tool_useFun_useWindowInfo = require("../../tool/useFun/useWindowInfo.js");
if (!Math) {
  (tmImage + tmText + tmSheet + tmDivider + tmStepper + tmTag + tmBadge + tmRadio + tmRadioGroup + tmButton + tmDrawer)();
}
const tmDrawer = () => "../tm-drawer/tm-drawer.js";
const tmButton = () => "../tm-button/tm-button.js";
const tmText = () => "../tm-text/tm-text.js";
const tmDivider = () => "../tm-divider/tm-divider.js";
const tmTag = () => "../tm-tag/tm-tag.js";
const tmSheet = () => "../tm-sheet/tm-sheet.js";
const tmImage = () => "../tm-image/tm-image.js";
const tmStepper = () => "../tm-stepper/tm-stepper.js";
const tmRadioGroup = () => "../tm-radio-group/tm-radio-group.js";
const tmRadio = () => "../tm-radio/tm-radio.js";
const tmBadge = () => "../tm-badge/tm-badge.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "tm-sku",
  props: {
    round: {
      type: Number,
      default: 6
    },
    show: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: "red"
    },
    height: {
      type: Number,
      default: 650
    },
    //购物车数量
    num: {
      type: Number,
      default: 1
    },
    list: {
      type: Object,
      default: () => null
    },
    /** 
     * 当前选中的id
     * id是以-来连接的，与数据结构中的条目id一样.比如a-b-b
     *  */
    value: {
      type: String,
      default: ""
    }
  },
  emits: ["open", "close", "update:show", "add", "buy"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const sysinfo = tmui_tool_useFun_useWindowInfo.useWindowInfo();
    const _show = common_vendor.ref(props.show);
    const footerBarHeight = common_vendor.ref(160);
    const dHeight = common_vendor.computed(() => {
      return props.height + footerBarHeight.value + common_vendor.index.$tm.u.torpx(sysinfo.bottomSafe);
    });
    common_vendor.ref(null);
    const nowSelected = common_vendor.ref([]);
    const nowInputNumber = common_vendor.ref(props.num);
    let textcm = common_vendor.toRaw(props.list);
    const _list = common_vendor.ref(props.list);
    const maxCount = common_vendor.computed(() => {
      var _a, _b, _c, _d;
      if (nowSelected.value.length == 0)
        return 0;
      if (!props.list)
        return 0;
      if (!((_a = props.list) == null ? void 0 : _a.data))
        return 0;
      if (props.list.data.length == 0)
        return 0;
      if (!((_c = (_b = props.list) == null ? void 0 : _b.product) == null ? void 0 : _c.length))
        return 0;
      let item = (_d = props.list) == null ? void 0 : _d.product.filter((el) => el.id == nowSelected.value.join("-"));
      if (!item.length)
        return 0;
      return Math.min(item[0].max_buy, item[0].num) || 0;
    });
    const nowItemInfo = common_vendor.computed(() => {
      var _a, _b;
      if (!((_a = props.list) == null ? void 0 : _a.product) || !props.list.data)
        return null;
      let item = (_b = props.list) == null ? void 0 : _b.product.filter((el) => el.id == nowSelected.value.join("-"));
      if (!item.length)
        return null;
      return item[0];
    });
    function init() {
      if (!props.list)
        return;
      let MaxLen = props.list.data.length;
      nowSelected.value = new Array(MaxLen).fill("");
    }
    common_vendor.onMounted(() => {
      init();
      setValueToSelected();
    });
    function setValueToSelected() {
      var _a, _b, _c;
      let p = props.value.split("-");
      let len = (_c = (_b = (_a = props.list) == null ? void 0 : _a.data) == null ? void 0 : _b.length) != null ? _c : 0;
      for (let i = 0; i < len; i++) {
        if (i > p.length - 1) {
          break;
        }
        nowSelected.value[i] = p[i];
      }
    }
    common_vendor.watch(
      () => props.num,
      () => {
        nowInputNumber.value = props.num;
      }
    );
    common_vendor.watch(
      () => props.value,
      () => {
        setValueToSelected();
      }
    );
    common_vendor.watch(
      () => props.list,
      () => {
        textcm = common_vendor.index.$tm.u.deepClone(common_vendor.toRaw(props.list));
        _list.value = textcm;
        init();
      },
      { deep: true }
    );
    common_vendor.watch(
      () => props.show,
      () => {
        _show.value = props.show;
      }
    );
    function addGou() {
      var _a, _b;
      if (nowSelected.value.length !== ((_b = (_a = props.list) == null ? void 0 : _a.data) == null ? void 0 : _b.length) || nowSelectedIsEmpty()) {
        common_vendor.index.showToast({ title: "未选择完整", icon: "none" });
        return;
      }
      emits("add", {
        buyNumber: nowInputNumber.value,
        data: common_vendor.toRaw(nowItemInfo.value)
      });
      common_vendor.nextTick$1(() => {
        _show.value = false;
      });
    }
    function nowSelectedIsEmpty() {
      let empty = false;
      for (let key = 0; key < nowSelected.value.length; key++) {
        if (nowSelected.value[key] === "" || nowSelected.value[key] == null || nowSelected.value[key] == void 0) {
          empty = true;
          break;
        }
      }
      return empty;
    }
    function buyGou() {
      var _a, _b;
      if (nowSelected.value.length !== ((_b = (_a = props.list) == null ? void 0 : _a.data) == null ? void 0 : _b.length) || nowSelectedIsEmpty()) {
        common_vendor.index.showToast({ title: "未选择完整", icon: "none" });
        return;
      }
      emits("buy", {
        buyNumber: nowInputNumber.value,
        data: common_vendor.toRaw(nowItemInfo.value)
      });
      common_vendor.nextTick$1(() => {
        _show.value = false;
      });
    }
    function numberChange(num) {
    }
    function addNumberClick() {
      var _a, _b;
      if (nowSelected.value.length !== ((_b = (_a = props.list) == null ? void 0 : _a.data) == null ? void 0 : _b.length) || nowSelectedIsEmpty()) {
        common_vendor.index.showToast({ title: "未选择完整", icon: "none" });
        return;
      }
    }
    const checkPropsStock = common_vendor.computed(() => {
      return (e, index) => {
        var _a, _b;
        let selectIds = nowSelected.value.concat();
        selectIds[index] = e.id;
        let stocked = false;
        const selectCount = nowSelected.value.filter((value) => value).length;
        if (selectCount > 0) {
          stocked = (_a = props.list) == null ? void 0 : _a.product.some((item) => {
            const dataIds = item.id.split("-");
            for (let x = 0; x < selectIds.length; x++) {
              if (!selectIds[x])
                dataIds[x] = "";
            }
            return dataIds.join("-") === selectIds.join("-") && item.num > 0;
          });
        } else {
          stocked = (_b = props.list) == null ? void 0 : _b.product.some((item) => {
            return item.id.split("-").includes(e.id, index);
          });
        }
        return e.num || stocked;
      };
    });
    function radioClick(item2, index) {
      console.log(checkPropsStock.value(item2, index));
    }
    function close() {
      emits("close");
      emits("update:show", false);
    }
    function open() {
      emits("open");
      emits("update:show", true);
    }
    return (_ctx, _cache) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n;
      return common_vendor.e({
        a: common_vendor.unref(nowItemInfo)
      }, common_vendor.unref(nowItemInfo) ? {
        b: common_vendor.p({
          preview: true,
          width: 120,
          height: 120,
          src: common_vendor.unref(nowItemInfo).img
        })
      } : {}, {
        c: common_vendor.p({
          ["font-size"]: 24,
          color: props.color,
          label: "￥"
        }),
        d: common_vendor.p({
          ["font-size"]: 42,
          _class: "text-weight-b",
          color: props.color,
          label: (_b = (_a = common_vendor.unref(nowItemInfo)) == null ? void 0 : _a.salePrice) != null ? _b : "0"
        }),
        e: common_vendor.p({
          ["font-size"]: 24,
          label: "优惠价￥"
        }),
        f: common_vendor.p({
          ["font-size"]: 42,
          _class: "text-weight-b",
          label: (_d = (_c = common_vendor.unref(nowItemInfo)) == null ? void 0 : _c.price) != null ? _d : "0"
        }),
        g: common_vendor.p({
          linear: "left",
          ["linear-deep"]: "accent",
          color: props.color,
          margin: [24, 0],
          padding: [18, 4],
          round: 24
        }),
        h: common_vendor.p({
          color: "grey",
          ["font-size"]: 24,
          label: common_vendor.unref(nowItemInfo) && ((_e = common_vendor.unref(nowItemInfo)) == null ? void 0 : _e.num) > 0 ? "有货 | 库存 " + ((_f = common_vendor.unref(nowItemInfo)) == null ? void 0 : _f.num) : "无货"
        }),
        i: common_vendor.p({
          color: "grey",
          ["font-size"]: 24,
          label: (_h = (_g = common_vendor.unref(nowItemInfo)) == null ? void 0 : _g.title) != null ? _h : ""
        }),
        j: common_vendor.p({
          margin: [0, 24]
        }),
        k: common_vendor.p({
          ["font-size"]: 28,
          label: "购买数量"
        }),
        l: common_vendor.o(numberChange),
        m: common_vendor.o(($event) => nowInputNumber.value = $event),
        n: common_vendor.p({
          max: common_vendor.unref(maxCount),
          disabled: nowInputNumber.value > common_vendor.unref(maxCount),
          ["default-value"]: nowInputNumber.value,
          modelValue: nowInputNumber.value
        }),
        o: common_vendor.o(addNumberClick),
        p: common_vendor.p({
          margin: [0, 0]
        }),
        q: _list.value
      }, _list.value ? {
        r: common_vendor.f(_list.value.data, (item, index, i0) => {
          return common_vendor.e({
            a: "06e68a29-13-" + i0 + ",06e68a29-0",
            b: common_vendor.p({
              _class: "mb-24",
              ["font-size"]: 28,
              label: item.title
            }),
            c: item == null ? void 0 : item.children
          }, (item == null ? void 0 : item.children) ? {
            d: common_vendor.f(item.children, (item2, index2, i1) => {
              return {
                a: common_vendor.w(({
                  checked
                }, s2, i2) => {
                  return {
                    a: "06e68a29-17-" + i0 + "-" + i1 + "-" + i2 + "," + ("06e68a29-16-" + i0 + "-" + i1 + "-" + i2),
                    b: common_vendor.p({
                      shadow: 0,
                      color: checked.checked && common_vendor.unref(checkPropsStock)(item2, index) ? "red" : "grey",
                      round: 24,
                      ["font-size"]: 26,
                      size: "n",
                      outlined: true,
                      text: true,
                      label: item2.title
                    }),
                    c: "06e68a29-16-" + i0 + "-" + i1 + "-" + i2 + "," + ("06e68a29-15-" + i0 + "-" + i1),
                    d: i2,
                    e: s2
                  };
                }, {
                  name: "d",
                  path: "r[" + i0 + "]." + ("d[" + i1 + "].") + "a",
                  vueId: "06e68a29-15-" + i0 + "-" + i1 + "," + ("06e68a29-14-" + i0)
                }),
                b: common_vendor.n(!common_vendor.unref(checkPropsStock)(item2, index) ? "opacity-6" : ""),
                c: common_vendor.p({
                  count: !common_vendor.unref(checkPropsStock)(item2, index) ? "缺货" : 0
                }),
                d: common_vendor.o(($event) => radioClick(item2, index), index2),
                e: index2,
                f: "06e68a29-15-" + i0 + "-" + i1 + "," + ("06e68a29-14-" + i0),
                g: common_vendor.p({
                  disabled: !common_vendor.unref(checkPropsStock)(item2, index),
                  value: item2.id,
                  custom: false
                })
              };
            }),
            e: "06e68a29-14-" + i0 + ",06e68a29-0",
            f: common_vendor.o(($event) => nowSelected.value[index] = $event, index),
            g: common_vendor.p({
              direction: "row",
              modelValue: nowSelected.value[index]
            })
          } : {}, {
            h: "06e68a29-18-" + i0 + ",06e68a29-0",
            i: index
          });
        }),
        s: common_vendor.p({
          margin: [0, 24]
        })
      } : {}, {
        t: (_i = common_vendor.unref(nowItemInfo)) == null ? void 0 : _i.tip
      }, ((_j = common_vendor.unref(nowItemInfo)) == null ? void 0 : _j.tip) ? {
        v: common_vendor.p({
          color: props.color,
          label: common_vendor.unref(nowItemInfo).tip + "，"
        })
      } : {}, {
        w: nowInputNumber.value > common_vendor.unref(maxCount) && nowInputNumber.value && common_vendor.unref(nowItemInfo)
      }, nowInputNumber.value > common_vendor.unref(maxCount) && nowInputNumber.value && common_vendor.unref(nowItemInfo) ? {
        x: common_vendor.p({
          color: props.color,
          label: "库存不足"
        })
      } : {}, {
        y: common_vendor.o(addGou),
        z: common_vendor.p({
          block: true,
          ["is-disabled-round-andriod"]: true,
          _class: "round-l-24 round-r-0",
          linear: "left",
          ["linear-deep"]: "accent",
          color: props.color,
          ["font-size"]: 32,
          label: "加购物车",
          height: 80
        }),
        A: common_vendor.o(buyGou),
        B: common_vendor.p({
          block: true,
          disabled: !common_vendor.unref(nowItemInfo) || nowInputNumber.value == 0 || nowInputNumber.value > common_vendor.unref(maxCount) || !((_k = common_vendor.unref(nowItemInfo)) == null ? void 0 : _k.num),
          ["is-disabled-round-andriod"]: true,
          _class: "round-r-24 round-l-0",
          linear: "left",
          ["linear-deep"]: "accent",
          color: props.color,
          ["font-size"]: 32,
          label: !((_l = common_vendor.unref(nowItemInfo)) == null ? void 0 : _l.num) ? "缺货，提醒我" : "购买" + (((_m = common_vendor.unref(nowItemInfo)) == null ? void 0 : _m.salePrice) ? "￥" + ((_n = common_vendor.unref(nowItemInfo)) == null ? void 0 : _n.salePrice) * nowInputNumber.value : ""),
          height: 80
        }),
        C: common_vendor.unref(sysinfo).bottomSafe + "px",
        D: common_vendor.sr("drawer", "06e68a29-0"),
        E: common_vendor.o(($event) => _show.value = $event),
        F: common_vendor.o(close),
        G: common_vendor.o(open),
        H: common_vendor.p({
          round: props.round,
          height: common_vendor.unref(dHeight),
          show: _show.value,
          ["ok-color"]: props.color,
          ["hide-header"]: true,
          closable: true,
          ["foot-height"]: footerBarHeight.value
        })
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/tmuidome/src/tmui/components/tm-sku/tm-sku.vue"]]);
wx.createComponent(Component);
