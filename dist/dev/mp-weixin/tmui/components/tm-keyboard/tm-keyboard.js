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
const tmui_tool_lib_tmpinia = require("../../tool/lib/tmpinia.js");
const tmui_tool_useFun_useWindowInfo = require("../../tool/useFun/useWindowInfo.js");
require("../../tool/theme/theme.js");
require("../../tool/theme/colortool.js");
require("../../tool/lib/interface.js");
require("../../tool/function/util.js");
require("../../tool/function/preview.js");
if (!Math) {
  (keyboardNumber + keyboardPass + keyboardCar + keyboardCard + tmDrawer)();
}
const tmDrawer = () => "../tm-drawer/tm-drawer.js";
const keyboardNumber = () => "./keyboard-number.js";
const keyboardCard = () => "./keyboard-card.js";
const keyboardPass = () => "./keyboard-pass.js";
const keyboardCar = () => "./keyboard-car.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "tm-keyboard",
  props: __spreadProps(__spreadValues({}, tmui_tool_lib_minxs.custom_props), {
    followTheme: {
      type: [Boolean, String],
      default: true
    },
    /**
     * password | card | car | number
     * 密码     | 身份证|  车牌 | 数字键盘
     */
    type: {
      type: String,
      default: "number"
    },
    //显示隐藏键盘可v-model:show
    show: {
      type: Boolean,
      default: false
    },
    //数据可v-model
    modelValue: {
      type: String,
      default: ""
    },
    //初始默认值。
    defaultValue: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: "primary"
    },
    /** 是否随机键盘 */
    random: {
      type: Boolean,
      default: false
    },
    //是否需要显示小数点。
    decimal: {
      type: Boolean,
      default: false
    },
    // 是否显示输入内容在键盘顶部。
    showInputContent: {
      type: Boolean,
      default: true
    },
    /** 最大长度 */
    maxLength: {
      type: Number,
      default: 0
    },
    zIndex: {
      type: [Number, String],
      default: 401
    },
    title: {
      type: String,
      default: "安全键盘放心输入"
    }
  }),
  emits: ["change", "confirm", "update:show", "update:modelValue", "success"],
  setup(__props, { emit: emits }) {
    var _a, _b;
    const props = __props;
    const store = tmui_tool_lib_tmpinia.useTmpiniaStore();
    const drawer = common_vendor.ref(null);
    const tmcfg = common_vendor.computed(() => store.tmStore);
    const isDark = common_vendor.computed(() => tmui_tool_lib_minxs.computedDark(props, tmcfg.value));
    const showPop = common_vendor.ref((_a = props == null ? void 0 : props.show) != null ? _a : false);
    const _value = common_vendor.ref((_b = props == null ? void 0 : props.defaultValue) != null ? _b : "");
    const _maxLength = common_vendor.computed(() => props.maxLength);
    const sysinfo = tmui_tool_useFun_useWindowInfo.useWindowInfo();
    const _typemodel = common_vendor.computed(() => props.type);
    common_vendor.watch([() => props.show, () => props.maxLength], () => {
      showPop.value = props.show;
    });
    let timerId = NaN;
    function debounce(func, wait = 200, immediate = false) {
      if (!isNaN(timerId))
        clearTimeout(timerId);
      if (immediate) {
        var callNow = !timerId;
        timerId = setTimeout(() => {
          timerId = NaN;
        }, wait);
        if (callNow)
          typeof func === "function" && func();
      } else {
        timerId = setTimeout(() => {
          typeof func === "function" && func();
        }, wait);
      }
    }
    function drawerClose() {
      emits("update:show", false);
    }
    function drawerOpen() {
      emits("update:show", true);
    }
    common_vendor.watch(
      () => props.modelValue,
      () => {
        _value.value = props.modelValue;
      }
    );
    function change() {
      emits("update:modelValue", common_vendor.toRaw(_value.value));
      common_vendor.nextTick$1(() => {
        _value.value = props.modelValue;
        emits("change", common_vendor.toRaw(_value.value));
      });
      common_vendor.index.vibrateShort({});
    }
    function confirm() {
      debounce(
        () => {
          var _a2;
          emits("confirm", common_vendor.toRaw(_value.value));
          (_a2 = drawer.value) == null ? void 0 : _a2.close();
        },
        250,
        true
      );
    }
    const dHeight = common_vendor.computed(() => {
      return 490 + sysinfo.bottomSafe;
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(_typemodel) == "number"
      }, common_vendor.unref(_typemodel) == "number" ? {
        b: common_vendor.o(($event) => emits("success", $event)),
        c: common_vendor.o(change),
        d: common_vendor.o(confirm),
        e: common_vendor.o(($event) => _value.value = $event),
        f: common_vendor.p({
          maxLength: common_vendor.unref(_maxLength),
          showInputContent: props.showInputContent,
          decimal: props.decimal,
          followTheme: props.followTheme,
          random: props.random,
          color: props.color,
          ["model-value"]: _value.value,
          dark: common_vendor.unref(isDark),
          title: props.title
        })
      } : {}, {
        g: common_vendor.unref(_typemodel) == "password"
      }, common_vendor.unref(_typemodel) == "password" ? {
        h: common_vendor.o(($event) => emits("success", $event)),
        i: common_vendor.o(change),
        j: common_vendor.o(confirm),
        k: common_vendor.o(($event) => _value.value = $event),
        l: common_vendor.p({
          maxLength: common_vendor.unref(_maxLength),
          showInputContent: props.showInputContent,
          followTheme: props.followTheme,
          random: props.random,
          color: props.color,
          ["model-value"]: _value.value,
          dark: common_vendor.unref(isDark),
          title: props.title
        })
      } : {}, {
        m: common_vendor.unref(_typemodel) == "car"
      }, common_vendor.unref(_typemodel) == "car" ? {
        n: common_vendor.o(($event) => emits("success", $event)),
        o: common_vendor.o(change),
        p: common_vendor.o(confirm),
        q: common_vendor.o(($event) => _value.value = $event),
        r: common_vendor.p({
          maxLength: common_vendor.unref(_maxLength),
          showInputContent: props.showInputContent,
          followTheme: props.followTheme,
          random: props.random,
          color: props.color,
          ["model-value"]: _value.value,
          dark: common_vendor.unref(isDark),
          title: props.title
        })
      } : {}, {
        s: common_vendor.unref(_typemodel) == "card"
      }, common_vendor.unref(_typemodel) == "card" ? {
        t: common_vendor.o(($event) => emits("success", $event)),
        v: common_vendor.o(change),
        w: common_vendor.o(confirm),
        x: common_vendor.o(($event) => _value.value = $event),
        y: common_vendor.p({
          maxLength: common_vendor.unref(_maxLength),
          showInputContent: props.showInputContent,
          followTheme: props.followTheme,
          random: props.random,
          color: props.color,
          ["model-value"]: _value.value,
          dark: common_vendor.unref(isDark),
          title: props.title
        })
      } : {}, {
        z: common_vendor.sr(drawer, "7b18b441-0", {
          "k": "drawer"
        }),
        A: common_vendor.o(drawerOpen),
        B: common_vendor.o(drawerClose),
        C: common_vendor.o(($event) => showPop.value = $event),
        D: common_vendor.p({
          show: showPop.value,
          dark: common_vendor.unref(isDark),
          ["follow-dark"]: props.followDark,
          ["follow-theme"]: false,
          height: common_vendor.unref(dHeight),
          ["hide-header"]: true,
          color: "grey-3",
          mask: false,
          zIndex: props.zIndex
        }),
        E: common_vendor.o(($event) => showPop.value = !showPop.value)
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/tmuidome/src/tmui/components/tm-keyboard/tm-keyboard.vue"]]);
wx.createComponent(Component);
