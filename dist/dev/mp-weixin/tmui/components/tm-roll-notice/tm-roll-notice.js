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
  (tmIcon + tmText + tmSheet)();
}
const tmSheet = () => "../tm-sheet/tm-sheet.js";
const tmIcon = () => "../tm-icon/tm-icon.js";
const tmText = () => "../tm-text/tm-text.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "tm-roll-notice",
  props: __spreadProps(__spreadValues({}, tmui_tool_lib_minxs.custom_props), {
    margin: {
      type: Array,
      default: () => [32, 24]
    },
    transprent: {
      type: Boolean,
      default: false
    },
    text: {
      type: Boolean,
      default: true
    },
    width: {
      type: Number,
      default: 726
    },
    height: {
      type: Number,
      default: 70
    },
    fontSize: {
      type: Number,
      default: 26
    },
    color: {
      type: String,
      default: "primary"
    },
    fontColor: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: "tmicon-info-circle"
    },
    //是否显示右边图标。
    showRight: {
      type: Boolean,
      default: false
    },
    shadow: {
      type: Number,
      default: 0
    },
    list: {
      type: [Array, String, Object],
      default: () => ""
    },
    rangeKey: {
      type: String,
      default: "text"
    },
    speed: {
      type: Number,
      default: 60
    },
    // duration属性在3.8.3后删除,存在这里的意义是向下兼容之前的老版本.
    duration: {
      type: Number,
      default: 0
    },
    border: {
      type: Number,
      default: 0
    }
  }),
  emits: ["click"],
  setup(__props, { emit: emits }) {
    var _a, _b;
    const props = __props;
    const proxy = (_b = (_a = common_vendor.getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    const _icon = common_vendor.computed(() => props.icon);
    const _list = common_vendor.computed(() => {
      let listData = [];
      if (typeof props.list === "string") {
        listData.push(props.list);
      }
      if (typeof props.list === "object") {
        listData.push(props.list[props.rangeKey]);
      }
      if (Array.isArray(props.list)) {
        props.list.forEach((el) => {
          if (typeof el == "string") {
            listData.push(el);
          } else if (typeof el == "object" && props.rangeKey) {
            listData.push(el[props.rangeKey]);
          }
        });
      }
      return listData;
    });
    const _width = common_vendor.computed(() => Math.ceil(props.width - props.margin[0] * 2 - 24));
    const _duration = common_vendor.ref(0);
    const _Left = common_vendor.computed(() => {
      if (_icon.value !== "") {
        return _width.value - 124;
      }
      return _width.value - 84;
    });
    const isNvue = common_vendor.ref(false);
    common_vendor.onMounted(() => {
      getNoNvueWrapWidth();
    });
    common_vendor.onUpdated(() => {
    });
    function getNoNvueWrapWidth() {
      common_vendor.index.createSelectorQuery().in(proxy).select("#wrap").boundingClientRect((res) => {
        let totalWidth = (Number(res.width || 0) + _width.value) / props.speed;
        _duration.value = Math.ceil(totalWidth);
      }).exec();
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(_icon)
      }, common_vendor.unref(_icon) ? {
        b: common_vendor.p({
          ["font-size"]: 28,
          name: common_vendor.unref(_icon)
        })
      } : {}, {
        c: common_vendor.f(common_vendor.unref(_list), (item, index, i0) => {
          return {
            a: common_vendor.o(($event) => emits("click", index), index),
            b: "4d97c72b-2-" + i0 + ",4d97c72b-0",
            c: common_vendor.p({
              _class: "pl-24 nowrap",
              ["font-size"]: props.fontSize,
              color: props.fontColor,
              label: item
            }),
            d: index
          };
        }),
        d: _duration.value + "s",
        e: (isNvue.value ? 0 : common_vendor.unref(_Left)) + "rpx",
        f: props.showRight
      }, props.showRight ? {
        g: common_vendor.p({
          ["font-size"]: 24,
          name: "tmicon-angle-right"
        })
      } : {}, {
        h: common_vendor.p({
          margin: props.margin,
          padding: [24, 0],
          width: common_vendor.unref(_width),
          height: props.height,
          color: props.color,
          _style: props._style,
          followTheme: props.followTheme,
          dark: props.dark,
          round: props.round,
          shadow: props.shadow,
          outlined: props.outlined,
          border: props.border,
          borderStyle: props.borderStyle,
          borderDirection: props.borderDirection,
          text: props.text,
          transprent: props.transprent,
          linear: props.linear,
          linearDeep: props.linearDeep,
          _class: "flex flex-row flex-between"
        })
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4d97c72b"], ["__file", "D:/tmuidome/src/tmui/components/tm-roll-notice/tm-roll-notice.vue"]]);
wx.createComponent(Component);
