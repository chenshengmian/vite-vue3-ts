"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
const common_vendor = require("../../../common/vendor.js");
const tmui_tool_lib_minxs = require("../../tool/lib/minxs.js");
require("../../tool/theme/theme.js");
require("../../tool/theme/colortool.js");
require("../../tool/lib/interface.js");
if (!Math) {
  (tmText + tmIcon + tmSheet)();
}
const tmIcon = () => "../tm-icon/tm-icon.js";
const tmSheet = () => "../tm-sheet/tm-sheet.js";
const tmText = () => "../tm-text/tm-text.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "tm-codeinput",
  props: __spreadProps(__spreadValues({}, tmui_tool_lib_minxs.custom_props), {
    followTheme: {
      type: [Boolean],
      default: true
    },
    text: {
      type: [Boolean],
      default: true
    },
    size: {
      type: Number,
      default: 100
    },
    gutter: {
      type: Number,
      default: 24
    },
    round: {
      type: Number,
      default: 2
    },
    border: {
      type: Number,
      default: 2
    },
    //未输入时的闪烁形状，
    //圆：dot,线型:line
    type: {
      type: String,
      default: "line"
    },
    /**
     * 是否显示中间的闪烁图标。
     */
    showLine: {
      type: [Boolean],
      default: true
    },
    fontSize: {
      type: Number,
      default: 44
    },
    //不填写时，默认自动配色。
    fontColor: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: "primary"
    },
    //数量
    count: {
      type: Number,
      default: 4
    },
    value: {
      type: [Number, String],
      default: ""
    }
  }),
  emits: ["click"],
  setup(__props, { emit: emits }) {
    const props = __props;
    common_vendor.computed(() => props.type);
    const _count = common_vendor.computed(() => props.count);
    const _valueLen = common_vendor.computed(() => String(props.value).split("").length);
    const _size = common_vendor.computed(() => props.size);
    const _datalist = common_vendor.computed(() => {
      var _a;
      let list = [];
      let _value = String(props.value).split("");
      for (let i = 0; i < _count.value; i++) {
        list.push({
          value: (_a = _value[i]) != null ? _a : "",
          index: i
        });
      }
      return list;
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(_datalist), (item, index, i0) => {
          return common_vendor.e({
            a: item.value !== ""
          }, item.value !== "" ? {
            b: "73cb2fc5-1-" + i0 + "," + ("73cb2fc5-0-" + i0),
            c: common_vendor.p({
              userInteractionEnabled: false,
              label: item.value,
              color: props.fontColor,
              ["font-size"]: props.fontSize
            })
          } : {}, {
            d: item.value == "" && index !== common_vendor.unref(_valueLen) && props.type == "line" && props.showLine
          }, item.value == "" && index !== common_vendor.unref(_valueLen) && props.type == "line" && props.showLine ? {
            e: "73cb2fc5-2-" + i0 + "," + ("73cb2fc5-0-" + i0),
            f: common_vendor.p({
              userInteractionEnabled: false,
              color: props.fontColor,
              name: "tmicon-ios-remove"
            })
          } : {}, {
            g: item.value == "" && index !== common_vendor.unref(_valueLen) && props.type == "dot" && props.showLine
          }, item.value == "" && index !== common_vendor.unref(_valueLen) && props.type == "dot" && props.showLine ? {
            h: "73cb2fc5-3-" + i0 + "," + ("73cb2fc5-0-" + i0),
            i: common_vendor.p({
              userInteractionEnabled: false,
              color: props.fontColor,
              ["font-size"]: 20,
              name: "tmicon-yuan"
            })
          } : {}, {
            j: item.value == "" && index === common_vendor.unref(_valueLen)
          }, item.value == "" && index === common_vendor.unref(_valueLen) ? {
            k: "73cb2fc5-4-" + i0 + "," + ("73cb2fc5-0-" + i0),
            l: common_vendor.p({
              followTheme: props.followTheme,
              userInteractionEnabled: false,
              ["paren-class"]: "tmSkeletonLine",
              width: 6,
              color: props.fontColor || props.color,
              height: common_vendor.unref(_size) / 2,
              margin: [0, 0],
              padding: [0, 0]
            })
          } : {}, {
            m: common_vendor.o(($event) => emits("click"), index),
            n: "73cb2fc5-0-" + i0,
            o: index
          });
        }),
        b: common_vendor.p({
          round: props.round,
          border: props.border,
          text: props.text,
          color: props.color,
          width: common_vendor.unref(_size),
          height: common_vendor.unref(_size),
          margin: [0, 0],
          padding: [0, 0],
          _class: "flex-center",
          outlined: props.outlined,
          followTheme: props.followTheme
        }),
        c: common_vendor.n(`px-${props.gutter / 2}`)
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-73cb2fc5"], ["__file", "D:/tmuidome/src/tmui/components/tm-codeinput/tm-codeinput.vue"]]);
wx.createComponent(Component);
