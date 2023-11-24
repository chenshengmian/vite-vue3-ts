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
const tmui_components_tmKeyboard_props = require("./props.js");
if (!Math) {
  (tmText + tmText + tmCol + tmRow + tmIcon + tmSheet)();
}
const tmText = () => "../tm-text/tm-text.js";
const tmSheet = () => "../tm-sheet/tm-sheet.js";
const tmRow = () => "../tm-row/tm-row.js";
const tmCol = () => "../tm-col/tm-col.js";
const tmIcon = () => "../tm-icon/tm-icon.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "keyboard-number",
  props: __spreadValues({}, tmui_components_tmKeyboard_props.propsCutom),
  emits: ["update:modelValue", "change", "confirm", "success"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const _maxLength = common_vendor.computed(() => props.maxLength);
    const _dark = common_vendor.computed(() => props.dark);
    let defaultNum = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "."];
    if (!props.decimal) {
      defaultNum.pop();
    }
    const numbersfc = common_vendor.ref(defaultNum);
    if (props.random) {
      numbersfc.value = shuffle(common_vendor.toRaw(numbersfc.value));
    }
    const numberArray = common_vendor.ref([]);
    numberArray.value = common_vendor.index.$tm.u.splitData(common_vendor.toRaw(numbersfc.value), 3);
    const _value = common_vendor.ref(props.modelValue);
    const _valueArrays = common_vendor.computed(() => _value.value.split(""));
    function keydown(e) {
      let k = String(e);
      if (props.decimal && k == "." && _valueArrays.value.includes(".")) {
        return;
      }
      let estr = _value.value + k;
      if (estr.split("").length > _maxLength.value && _maxLength.value > 0) {
        return;
      }
      _value.value = estr;
      emits("update:modelValue", _value.value);
      emits("change", props.modelValue);
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
        _value.value = props.modelValue;
      }
    );
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !_value.value && !props.showInputContent
      }, !_value.value && !props.showInputContent ? {
        b: common_vendor.p({
          ["font-size"]: 28,
          _class: "text-weight-b",
          label: props.title
        })
      } : {}, {
        c: _value.value && props.showInputContent
      }, _value.value && props.showInputContent ? {
        d: common_vendor.p({
          ["font-size"]: 34,
          _class: "text-weight-b pr-24",
          label: _value.value
        })
      } : {}, {
        e: common_vendor.f(9, (item, index, i0) => {
          return {
            a: "73b03b16-7-" + i0 + "," + ("73b03b16-6-" + i0),
            b: common_vendor.p({
              userInteractionEnabled: false,
              ["font-size"]: 38,
              _class: "text-weight-b",
              label: item
            }),
            c: common_vendor.o(($event) => keydown(item), index),
            d: index,
            e: "73b03b16-6-" + i0 + ",73b03b16-5"
          };
        }),
        f: common_vendor.p({
          ["hover-class"]: "opacity-5",
          margin: [8, 0, 4, 8],
          round: props.round,
          height: 100,
          col: 1
        }),
        g: common_vendor.p({
          userInteractionEnabled: false,
          ["font-size"]: 38,
          _class: "text-weight-b",
          label: "0"
        }),
        h: common_vendor.o(($event) => keydown("0")),
        i: common_vendor.p({
          ["hover-class"]: "opacity-5 ",
          margin: [8, 0, 4, 0],
          round: props.round,
          height: 100,
          col: 2
        }),
        j: common_vendor.p({
          userInteractionEnabled: false,
          ["font-size"]: 38,
          _class: "text-weight-b",
          label: "."
        }),
        k: common_vendor.o(($event) => keydown(".")),
        l: common_vendor.p({
          ["hover-class"]: "opacity-5 ",
          margin: [8, 0, 4, 0],
          round: props.round,
          height: 100,
          col: 1
        }),
        m: common_vendor.p({
          column: 3
        }),
        n: common_vendor.p({
          col: 6,
          height: 0,
          transprent: true
        }),
        o: common_vendor.p({
          userInteractionEnabled: false,
          name: "tmicon-caret-left"
        }),
        p: common_vendor.o(del),
        q: common_vendor.p({
          ["hover-class"]: "opacity-5 ",
          color: "grey-1",
          margin: [8, 0, 4, 8],
          round: props.round,
          height: 100,
          col: 1
        }),
        r: common_vendor.p({
          userInteractionEnabled: false,
          name: "tmicon-check"
        }),
        s: common_vendor.o(confirm),
        t: common_vendor.p({
          ["hover-class"]: "opacity-5 ",
          color: props.color,
          margin: [8, 0, 0, 0],
          round: props.round,
          height: 300,
          col: 1
        }),
        v: common_vendor.p({
          column: 1
        }),
        w: common_vendor.p({
          col: 1,
          height: 420,
          align: "start",
          transprent: true,
          margin: [0]
        }),
        x: common_vendor.p({
          column: 7,
          align: "start"
        }),
        y: common_vendor.p({
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
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/tmuidome/src/tmui/components/tm-keyboard/keyboard-number.vue"]]);
wx.createComponent(Component);
