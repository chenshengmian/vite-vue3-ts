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
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
const common_vendor = require("../../../common/vendor.js");
const tmui_tool_lib_minxs = require("../../tool/lib/minxs.js");
const tmui_tool_lib_tmpinia = require("../../tool/lib/tmpinia.js");
require("../../tool/theme/theme.js");
require("../../tool/theme/colortool.js");
require("../../tool/lib/interface.js");
require("../../tool/function/util.js");
require("../../tool/function/preview.js");
if (!Math) {
  (tmIcon + tmSheet)();
}
const tmSheet = () => "../tm-sheet/tm-sheet.js";
const tmIcon = () => "../tm-icon/tm-icon.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "tm-stepper",
  props: __spreadProps(__spreadValues({}, tmui_tool_lib_minxs.custom_props), {
    //是否跟随全局主题的变换而变换
    followTheme: {
      type: [Boolean, String],
      default: true
    },
    width: {
      type: [Number],
      default: 210
    },
    height: {
      type: [Number],
      default: 52
    },
    disabled: {
      type: Boolean,
      default: false
    },
    //禁用输入功能
    disabledInput: {
      type: [Boolean],
      default: false
    },
    black: {
      type: [Boolean, String],
      default: null
    },
    // 步幅，默认1
    step: {
      type: Number,
      default: 1
    },
    //固定小数点位数，0表示整数
    fixed: {
      type: Number,
      default: 0
    },
    //按钮的主题
    color: {
      type: String,
      default: "grey-4"
      //grey-2
    },
    bgColor: {
      type: String,
      default: "grey-4"
    },
    linear: {
      type: String,
      default: ""
    },
    linearDeep: {
      type: String,
      default: "light"
    },
    round: {
      type: [String, Number],
      default: 2
    },
    fontSize: {
      type: [String, Number],
      default: 28
    },
    //圆形按钮。
    circular: {
      type: [Boolean],
      default: false
    },
    max: {
      type: [Number],
      default: 999
    },
    min: {
      type: [Number],
      default: 0
    },
    //按钮增加或者 减少前执行，返回 fase取消当前操作。
    beforeEnter: {
      type: [Function, Boolean],
      default: true
    },
    modelValue: {
      type: Number,
      default: null
    },
    defaultValue: {
      type: Number,
      default: null
    }
  }),
  emits: ["update:modelValue", "change"],
  setup(__props, { emit: emits }) {
    var _a;
    const props = __props;
    const store = tmui_tool_lib_tmpinia.useTmpiniaStore();
    const setVal = common_vendor.ref((_a = props.defaultValue) != null ? _a : "0");
    const _min = common_vendor.computed(() => Number(props.min));
    const _max = common_vendor.computed(() => Number(props.max));
    const _step = common_vendor.computed(() => Number(props.step));
    const _fixed = common_vendor.computed(() => Number(props.fixed));
    const tmcfg = common_vendor.computed(() => store.tmStore);
    const isDark = common_vendor.computed(() => tmui_tool_lib_minxs.computedDark(props, tmcfg.value));
    const tmcomputed = common_vendor.computed(() => tmui_tool_lib_minxs.computedTheme(__spreadProps(__spreadValues({}, props), { color: props.bgColor, text: true }), isDark.value, tmcfg.value));
    const _disabled = common_vendor.computed(() => props.disabled);
    let timeid = NaN;
    let timeid2 = NaN;
    let timeid3 = NaN;
    const isJianDisabled = common_vendor.computed(() => {
      if (setVal.value <= _min.value)
        return true;
      return false;
    });
    const isAddDisabled = common_vendor.computed(() => {
      if (setVal.value >= _max.value)
        return true;
      return false;
    });
    common_vendor.watch(
      () => props.modelValue,
      (newValue, oldValue) => {
        clearTimeout(timeid3);
        timeid3 = setTimeout(function() {
          let vs = forMart(props.modelValue);
          if (setVal.value !== vs) {
            setVal.value = null;
            common_vendor.nextTick$1(() => {
              setVal.value = vs;
            });
          }
        }, 20);
      }
    );
    function setStep(ty) {
      return __async(this, null, function* () {
        if (props.disabled)
          return;
        if (typeof props.beforeEnter === "function") {
          common_vendor.index.showLoading({
            title: "...",
            mask: true
          });
          let p = yield props.beforeEnter(ty);
          if (typeof p === "function") {
            p = yield p(ty);
          }
          common_vendor.index.hideLoading();
          if (!p)
            return false;
        }
        let val = setVal.value;
        if (ty == "+") {
          val = _handleIncrement(setVal.value);
        } else if (ty == "-") {
          val = _handleDecrement(setVal.value);
        }
        common_vendor.nextTick$1(function() {
          jianchData(val);
        });
      });
    }
    function inputVal(e) {
      var val = e.detail.value;
      clearTimeout(timeid2);
      timeid2 = setTimeout(function() {
        let rs = forMart(val);
        jianchData(rs);
      }, 50);
    }
    function jianchData(val) {
      let vs = val.toFixed(_fixed.value);
      let vsr = _clampValue(Number(vs));
      if (setVal.value !== vsr) {
        setVal.value = null;
        common_vendor.nextTick$1(() => {
          setVal.value = vsr;
        });
      }
      emits("update:modelValue", vsr);
      emits("change", vsr);
    }
    function longpressEvent(ty) {
      if (props.disabled)
        return;
      clearInterval(timeid);
      timeid = setInterval(function() {
        return __async(this, null, function* () {
          yield setStep(ty);
        });
      }, 250);
    }
    function _handleIncrement(value) {
      const newValue = Math.min(value + Number(_step.value), _max.value);
      if (_getDecimalPlaces(value)) {
        return _clampValue(parseFloat(newValue.toFixed(_fixed.value)));
      }
      return _clampValue(newValue);
    }
    function _handleDecrement(value) {
      const newValue = Math.max(value - Number(_step.value), _min.value);
      if (_getDecimalPlaces(value)) {
        return _clampValue(parseFloat(newValue.toFixed(_fixed.value)));
      }
      return _clampValue(newValue);
    }
    function _isInRange(value) {
      return value >= _min.value && value <= _max.value;
    }
    function _clampValue(value) {
      return Math.min(Math.max(value, _min.value), _max.value);
    }
    function _getDecimalPlaces(value) {
      const match = value.toString().match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
      if (!match) {
        return 0;
      }
      return Math.max(0, (match[1] ? match[1].length : 0) - (match[2] ? +match[2] : 0));
    }
    function endlongpressEvent(ty) {
      clearInterval(timeid);
    }
    function forMart(val) {
      val = parseFloat(typeof val === "number" ? String(val) : val);
      if (!isNaN(val) && _isInRange(val)) {
        if (_getDecimalPlaces(val)) {
          val = Number(val.toFixed(_fixed.value));
        }
        return _clampValue(val);
      } else {
        let value = _clampValue(isNaN(val) ? 0 : val);
        return _clampValue(value);
      }
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          userInteractionEnabled: false,
          ["font-size"]: 22,
          name: "tmicon-minus"
        }),
        b: common_vendor.p({
          followTheme: props.followTheme,
          round: props.circular ? 10 : props.round,
          linear: props.linear,
          ["linear-deep"]: props.linearDeep,
          _class: "flex-center",
          color: props.color,
          margin: [0, 0],
          padding: [0, 0],
          height: __props.height,
          width: __props.height
        }),
        c: common_vendor.o(($event) => setStep("-")),
        d: common_vendor.o(($event) => longpressEvent("-")),
        e: common_vendor.o(($event) => endlongpressEvent()),
        f: common_vendor.n(!props.circular ? `` : `round-${10}`),
        g: common_vendor.n(common_vendor.unref(_disabled) || common_vendor.unref(isJianDisabled) ? "opacity-5" : ""),
        h: props.disabledInput || props.disabled,
        i: common_vendor.o(inputVal),
        j: common_vendor.s({
          height: `${props.height}rpx`,
          textAlign: "center",
          fontSize: props.fontSize + "rpx",
          width: `${props.width - 120}rpx`,
          color: common_vendor.unref(tmcomputed).textColor
        }),
        k: setVal.value,
        l: common_vendor.o(($event) => setVal.value = $event.detail.value),
        m: common_vendor.p({
          userInteractionEnabled: false,
          ["font-size"]: 22,
          name: "tmicon-plus"
        }),
        n: common_vendor.p({
          followTheme: props.followTheme,
          round: props.circular ? 10 : props.round,
          linear: props.linear,
          ["linear-deep"]: props.linearDeep,
          _class: "flex-center",
          color: props.color,
          margin: [0, 0],
          padding: [0, 0],
          height: __props.height,
          width: __props.height
        }),
        o: common_vendor.o(($event) => setStep("+")),
        p: common_vendor.o(($event) => longpressEvent("+")),
        q: common_vendor.o(($event) => endlongpressEvent()),
        r: common_vendor.n(!props.circular ? `` : `round-${10}`),
        s: common_vendor.n(common_vendor.unref(_disabled) || common_vendor.unref(isAddDisabled) ? "opacity-5" : ""),
        t: common_vendor.p({
          text: true,
          transprent: props.circular,
          followTheme: false,
          _class: "flex flex-row flex-1",
          color: props.bgColor,
          margin: [0, 0],
          padding: [0, 0]
        }),
        v: common_vendor.s({
          height: `${props.height}rpx`,
          width: `${props.width}rpx`
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a8c854c6"], ["__file", "D:/tmuidome/src/tmui/components/tm-stepper/tm-stepper.vue"]]);
wx.createComponent(Component);
