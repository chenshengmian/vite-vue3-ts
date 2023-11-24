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
  (tmText + tmText + tmSheet + tmIcon)();
}
const tmText = () => "../tm-text/tm-text.js";
const tmSheet = () => "../tm-sheet/tm-sheet.js";
const tmIcon = () => "../tm-icon/tm-icon.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "keyboard-car",
  props: __spreadValues({}, tmui_components_tmKeyboard_props.propsCutom),
  emits: ["update:modelValue", "change", "confirm", "success"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const _maxLength = common_vendor.computed(() => props.maxLength);
    const _dark = common_vendor.computed(() => props.dark);
    const numberArray = common_vendor.ref([]);
    const _value = common_vendor.ref(props.modelValue);
    const changeChart = common_vendor.ref(false);
    getChart();
    function keydown(e) {
      let k = String(e);
      let estr = _value.value + k;
      if (estr.split("").length > _maxLength.value && _maxLength.value > 0) {
        return;
      }
      _value.value = estr;
      emits("update:modelValue", _value.value);
      emits("change", _value.value);
      if (changeChart.value == false) {
        changeEnChart();
      }
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
      if (_value.value.length == 0) {
        changeChart.value == true;
        changeEnChart();
      }
    }
    function confirm() {
      emits("confirm", _value.value);
    }
    function changeEnChart() {
      changeChart.value = !changeChart.value;
      getChart();
    }
    function getChart() {
      const numbersfc = common_vendor.ref([
        "京",
        "沪",
        "津",
        "渝",
        "鲁",
        "冀",
        "晋",
        "蒙",
        "辽",
        "吉",
        "黑",
        "苏",
        "浙",
        "皖",
        "闽",
        "赣",
        "豫",
        "湘",
        "鄂",
        "粤",
        "桂",
        "琼",
        "川",
        "贵",
        "云",
        "藏",
        "陕",
        "甘",
        "青",
        "宁",
        "新",
        "港",
        "澳",
        "台",
        "警",
        "使"
      ]);
      const chartsfc = common_vendor.ref([
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "0",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      ]);
      if (!changeChart.value) {
        if (props.random) {
          numbersfc.value = shuffle(common_vendor.toRaw(numbersfc.value));
        }
        numberArray.value = common_vendor.index.$tm.u.splitData(common_vendor.toRaw(numbersfc.value), 9);
      } else {
        if (props.random) {
          chartsfc.value = shuffle(common_vendor.toRaw(chartsfc.value));
        }
        numberArray.value = common_vendor.index.$tm.u.splitData(common_vendor.toRaw(chartsfc.value), 9);
      }
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
          ["font-size"]: 34,
          _class: "text-weight-b pr-24",
          label: _value.value
        })
      } : {}, {
        e: common_vendor.f(numberArray.value, (item2, index2, i0) => {
          return {
            a: common_vendor.f(item2, (item, index, i1) => {
              return {
                a: "42ae8050-4-" + i0 + "-" + i1 + "," + ("42ae8050-3-" + i0 + "-" + i1),
                b: common_vendor.p({
                  userInteractionEnabled: false,
                  ["font-size"]: 32,
                  _class: "text-weight-b",
                  label: item
                }),
                c: common_vendor.o(($event) => keydown(item), index),
                d: index,
                e: "42ae8050-3-" + i0 + "-" + i1 + ",42ae8050-0"
              };
            }),
            b: index2
          };
        }),
        f: common_vendor.p({
          ["hover-class"]: "opacity-5 keywordBoradAni",
          ["no-level"]: true,
          ["follow-theme"]: false,
          ["follow-dark"]: false,
          dark: common_vendor.unref(_dark),
          round: 2,
          height: 90,
          _class: "flex-center",
          padding: [0, 0],
          margin: [4, 4],
          ["paren-class"]: "flex-1"
        }),
        g: common_vendor.p({
          userInteractionEnabled: false,
          ["font-size"]: 32,
          _class: "text-weight-b",
          label: "学"
        }),
        h: common_vendor.o(($event) => keydown("学")),
        i: common_vendor.p({
          ["hover-class"]: "opacity-5 keywordBoradAni",
          ["no-level"]: true,
          height: 90,
          ["follow-theme"]: false,
          ["follow-dark"]: false,
          dark: common_vendor.unref(_dark),
          round: 2,
          _class: "flex-center",
          padding: [0, 0],
          margin: [4, 4],
          ["paren-class"]: "flex-row flex-center"
        }),
        j: common_vendor.p({
          userInteractionEnabled: false,
          name: "tmicon-caret-left"
        }),
        k: common_vendor.o(del),
        l: common_vendor.p({
          ["hover-class"]: "opacity-5 keywordBoradAni",
          ["no-level"]: true,
          height: 90,
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
        m: common_vendor.p({
          userInteractionEnabled: false,
          ["font-size"]: 32,
          _class: "text-weight-b",
          label: !changeChart.value ? "En" : "简"
        }),
        n: common_vendor.o(changeEnChart),
        o: common_vendor.p({
          ["hover-class"]: "opacity-5 keywordBoradAni",
          ["no-level"]: true,
          height: 90,
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
        p: common_vendor.p({
          userInteractionEnabled: false,
          name: "tmicon-check"
        }),
        q: common_vendor.o(confirm),
        r: common_vendor.p({
          ["hover-class"]: "opacity-5 keywordBoradAni",
          height: 90,
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
        s: common_vendor.p({
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
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/tmuidome/src/tmui/components/tm-keyboard/keyboard-car.vue"]]);
wx.createComponent(Component);
