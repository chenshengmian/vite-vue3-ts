"use strict";
var __defProp = Object.defineProperty;
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
const common_vendor = require("../../../common/vendor.js");
const tmui_components_tmKeyboard_card = require("./card.js");
const tmui_components_tmKeyboard_props = require("./props.js");
if (!Math) {
  (tmText + tmIcon + tmText + tmSheet)();
}
const tmText = () => "../tm-text/tm-text.js";
const tmSheet = () => "../tm-sheet/tm-sheet.js";
const tmIcon = () => "../tm-icon/tm-icon.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "keyboard-card",
  props: __spreadValues({}, tmui_components_tmKeyboard_props.propsCutom),
  emits: ["update:modelValue", "change", "confirm", "success"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const _maxLength = common_vendor.computed(() => props.maxLength);
    const _dark = common_vendor.computed(() => props.dark);
    const numbersfc = common_vendor.ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "X"]);
    if (props.random) {
      numbersfc.value = shuffle(common_vendor.toRaw(numbersfc.value));
    }
    const numberArray = common_vendor.ref([]);
    numberArray.value = common_vendor.index.$tm.u.splitData(common_vendor.toRaw(numbersfc.value), 3);
    const _value = common_vendor.ref(props.modelValue);
    const _isOk = common_vendor.computed(() => tmui_components_tmKeyboard_card.validateIdCard(_value.value));
    function keydown(e) {
      let k = String(e);
      let estr = _value.value + k;
      if (estr.split("").length > _maxLength.value && _maxLength.value > 0) {
        return;
      }
      _value.value = estr;
      emits("update:modelValue", _value.value);
      emits("change", _value.value);
      if (estr.split("").length === _maxLength.value && _maxLength.value > 0) {
        emits("success", estr);
      }
    }
    function del() {
      if (_value.value == "" || _value.value.length == 0)
        return;
      _value.value = _value.value.substring(0, _value.value.length - 1);
      emits("update:modelValue", _value.value);
      emits("change", _value.value);
    }
    function confirm() {
      emits("confirm", _value.value);
    }
    function shuffle(arr = []) {
      var i = arr.length, t, j;
      while (--i) {
        j = Math.floor(Math.random() * i);
        t = arr[i];
        arr[i] = arr[j];
        arr[j] = t;
      }
      return arr;
    }
    common_vendor.watch(
      () => props.modelValue,
      () => {
        common_vendor.nextTick$1(() => _value.value = props.modelValue);
      }
    );
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !_value.value && !props.showInputConten
      }, !_value.value && !props.showInputConten ? {
        b: common_vendor.p({
          ["font-size"]: 28,
          _class: "text-weight-b",
          label: props.title
        })
      } : {}, {
        c: _value.value && props.showInputContent
      }, _value.value && props.showInputContent ? {
        d: common_vendor.p({
          color: common_vendor.unref(_isOk) ? "green" : "red",
          ["font-size"]: 34,
          _class: "text-weight-b pr-24",
          label: _value.value
        })
      } : {}, {
        e: common_vendor.unref(_isOk) && props.showInputContent
      }, common_vendor.unref(_isOk) && props.showInputContent ? {
        f: common_vendor.p({
          color: "green",
          ["font-size"]: 34,
          name: "tmicon-check-circle-fill"
        })
      } : {}, {
        g: common_vendor.f(numberArray.value, (item2, index2, i0) => {
          return {
            a: common_vendor.f(item2, (item, index, i1) => {
              return {
                a: "0d710888-5-" + i0 + "-" + i1 + "," + ("0d710888-4-" + i0 + "-" + i1),
                b: common_vendor.p({
                  userInteractionEnabled: false,
                  ["font-size"]: 38,
                  _class: "text-weight-b",
                  label: item
                }),
                c: common_vendor.o(($event) => keydown(item), index),
                d: index,
                e: common_vendor.n(index2 == 3 && index == 0 ? "flex-5" : "flex-3"),
                f: "0d710888-4-" + i0 + "-" + i1 + ",0d710888-0",
                g: common_vendor.p({
                  ["hover-class"]: "opacity-5 keywordBoradAni",
                  ["no-level"]: true,
                  ["follow-theme"]: false,
                  ["follow-dark"]: false,
                  dark: common_vendor.unref(_dark),
                  round: 2,
                  height: 95,
                  _class: "flex-center",
                  padding: [0, 0],
                  margin: [4, 4],
                  ["paren-class"]: index2 == 3 && index == 0 ? "flex-3" : "flex-3"
                })
              };
            }),
            b: index2
          };
        }),
        h: common_vendor.p({
          userInteractionEnabled: false,
          name: "tmicon-caret-left"
        }),
        i: common_vendor.o(del),
        j: common_vendor.p({
          ["hover-class"]: "opacity-5 keywordBoradAni",
          ["no-level"]: true,
          height: 95,
          ["follow-theme"]: false,
          ["follow-dark"]: false,
          dark: common_vendor.unref(_dark),
          color: "grey-1",
          round: 2,
          _class: "flex-center",
          padding: [0, 0],
          margin: [4, 4],
          ["paren-class"]: "flex-row flex-center"
        }),
        k: common_vendor.p({
          userInteractionEnabled: false,
          name: "tmicon-check"
        }),
        l: common_vendor.o(confirm),
        m: common_vendor.p({
          ["hover-class"]: "opacity-5 keywordBoradAni",
          ["no-level"]: true,
          ["follow-theme"]: props.followTheme,
          ["follow-dark"]: false,
          dark: common_vendor.unref(_dark),
          color: props.color,
          round: 2,
          _class: "flex-center ",
          padding: [0, 0],
          margin: [4, 4],
          ["paren-class"]: "flex-1 flex-row flex-center"
        }),
        n: common_vendor.p({
          ["follow-theme"]: false,
          ["follow-dark"]: false,
          dark: common_vendor.unref(_dark),
          color: "white",
          transprent: true,
          padding: [4, 4],
          margin: [0, 0],
          _class: "flex flex-col",
          ["paren-class"]: "flex-1"
        })
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/tmuidome/src/tmui/components/tm-keyboard/keyboard-card.vue"]]);
wx.createComponent(Component);
