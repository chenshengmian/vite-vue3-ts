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
require("../../tool/theme/theme.js");
require("../../tool/theme/colortool.js");
require("../../tool/lib/interface.js");
require("../../tool/function/util.js");
require("../../tool/function/preview.js");
if (!Math) {
  (tmIcon + tmText + tmBadge + tmSheet)();
}
const tmSheet = () => "../tm-sheet/tm-sheet.js";
const tmText = () => "../tm-text/tm-text.js";
const tmIcon = () => "../tm-icon/tm-icon.js";
const tmBadge = () => "../tm-badge/tm-badge.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "tm-tabs",
  props: __spreadProps(__spreadValues({}, tmui_tool_lib_minxs.custom_props), {
    //如果提供了，那么就不需要tm-tabs-pane，可以单独使用。
    list: {
      type: Array,
      default: () => []
    },
    rangKey: {
      type: String,
      default: "title"
    },
    color: {
      type: String,
      default: "white"
    },
    transprent: {
      type: [Boolean, String],
      default: false
    },
    width: {
      type: Number,
      default: 500
    },
    itemHeight: {
      type: Number,
      default: 80
    },
    //不设定窗口高度，在真机上有闪烁。如果设定为0将是自动高度。
    height: {
      type: Number,
      default: 1e3
    },
    //内容在bar中的上下间隔。当有选项背景色时，底部为白色，这相当有用。
    gutter: {
      type: Number,
      default: 0
    },
    defaultName: {
      type: [String, Number],
      default: ""
    },
    //当前活动项。v-model:active-name
    activeName: {
      type: [String, Number],
      default: ""
    },
    //标签导航的位置，
    //top导航在上方，bottom导航在下方。
    tabPos: {
      type: String,
      default: "top"
    },
    //项目的宽度。如果提供，每个标签是等宽度的，如果不提供自动宽度。
    itemWidth: {
      type: Number,
      default: 0
    },
    //tab选中的背景颜色。默认为空
    activeColor: {
      type: String,
      default: "primary"
    },
    activeFontColor: {
      type: String,
      default: "primary"
    },
    activeFontSize: {
      type: Number,
      default: 28
    },
    //选项卡样式模型
    itemModel: {
      type: String,
      default: "text"
      //line底部线条，card背景颜色模式，text文本模式,textLight背景减淡模式，文字会变灰。
    },
    //默认为空即根据主题自定颜色。如果填写了将使用该颜色为未选中色。
    unSelectedColor: {
      type: String,
      default: ""
    },
    itemFontSize: {
      type: Number,
      default: 28
    },
    itemLinear: {
      type: String,
      default: ""
    },
    itemLinearDeep: {
      type: String,
      default: "light"
    },
    itemRound: {
      type: Number,
      default: 0
    },
    /**
     * 标题的分布方式
     */
    align: {
      type: String,
      default: "left"
      //left:左对齐,right：右对齐,center：剧中,around：剧中均分
    },
    //是否启用pane滑动切换tabs。如果关闭有助于页面更顺畅。如果启用请不要大量内容。
    swiper: {
      type: Boolean,
      default: false
    },
    //是否显示底部线条动画样式。
    showTabsLineAni: {
      type: Boolean,
      default: false
    },
    //是否显示底部线条动的底部灰色导轨
    showTabsLine: {
      type: Boolean,
      default: true
    },
    //下面活动的横线的颜色。
    tabsLineAniColor: {
      type: String,
      default: "primary"
    },
    disAbledPull: {
      type: Boolean,
      default: true
    },
    //暗下强制的背景色，
    //有时自动的背景，可能不是你想要暗黑背景，此时可以使用此参数，强制使用背景色，
    //只能是颜色值。
    darkBgColor: {
      type: String,
      default: ""
    },
    /** 当选中某一项时,内容会往前滚动的项目数量,类似于位置让选中项始终在中间. */
    subtract: {
      type: Number,
      default: 2
    }
  }),
  emits: ["update:activeName", "change", "click"],
  setup(__props, { expose, emit: emits }) {
    var _a, _b;
    const props = __props;
    const store = tmui_tool_lib_tmpinia.useTmpiniaStore();
    (_b = (_a = common_vendor.getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    common_vendor.ref(null);
    common_vendor.computed(() => props.disAbledPull);
    const _align = common_vendor.computed(() => {
      let align_list = {
        right: "flex-row-center-end",
        left: "flex-row-center-start",
        center: "flex-row-center-center",
        around: "flex-around"
      };
      let key = "center";
      if (align_list.hasOwnProperty(props.align)) {
        key = props.align;
      }
      return align_list[key];
    });
    const _active = common_vendor.ref(props.defaultName);
    emits("update:activeName", _active.value);
    const cstomClass = common_vendor.computed(() => tmui_tool_lib_minxs.computedClass(props));
    const _scrollToId = common_vendor.ref("");
    const modelStyle = common_vendor.computed(() => {
      if (props.itemModel == "text") {
        return {
          transprent: true,
          border: 0,
          text: false
        };
      } else if (props.itemModel == "line") {
        return {
          transprent: true,
          border: 4,
          text: false
        };
      } else if (props.itemModel == "textLight") {
        return {
          transprent: false,
          border: 4,
          text: true
        };
      } else if (props.itemModel == "card") {
        return {
          transprent: false,
          border: 0,
          text: false
        };
      }
      return {
        transprent: true,
        border: 0,
        text: false
      };
    });
    const tmTabsId = "tmTabsId";
    const _tabPos = common_vendor.computed(() => props.tabPos);
    const cacheTabs = common_vendor.ref([]);
    const isDulitabs = common_vendor.computed(() => props.list.length > 0);
    const tabsid = "tabs_id_" + common_vendor.index.$tm.u.getUid(1) + "_";
    const isNvue = common_vendor.ref(false);
    Math.ceil(common_vendor.index.upx2px(props.itemHeight));
    const totalWidth = common_vendor.computed(() => common_vendor.index.upx2px(cacheTabs.value.length * props.width));
    const _itemwidth = Math.ceil(common_vendor.index.upx2px(props.itemWidth));
    Math.ceil(common_vendor.index.upx2px(40));
    const _width = Math.ceil(common_vendor.index.upx2px(props.width));
    const contentWidth = common_vendor.computed(() => {
      let width = props.itemWidth * cacheTabs.value.length;
      if (width <= props.width) {
        width = props.width;
      }
      return width;
    });
    common_vendor.computed(() => {
      let width = _itemwidth * cacheTabs.value.length;
      if (width <= props.width) {
        width = common_vendor.index.upx2px(props.width);
      }
      return Math.ceil(width);
    });
    const anitLineLeft = common_vendor.ref(0);
    let timerId = NaN;
    let timerId2 = NaN;
    function debounce(func, wait = 500, immediate = false) {
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
    function debounce2(func, wait = 500, immediate = false) {
      if (!isNaN(timerId2))
        clearTimeout(timerId2);
      if (immediate) {
        var callNow = !timerId2;
        timerId2 = setTimeout(() => {
          timerId2 = NaN;
        }, wait);
        if (callNow)
          typeof func === "function" && func();
      } else {
        timerId2 = setTimeout(() => {
          typeof func === "function" && func();
        }, wait);
      }
    }
    const _startx = common_vendor.ref(0);
    const _starty = common_vendor.ref(0);
    common_vendor.ref(0);
    common_vendor.ref(0);
    const _x = common_vendor.ref(0);
    const _y = common_vendor.ref(0);
    common_vendor.ref(0);
    common_vendor.ref(0);
    const directoStyle = common_vendor.ref(0);
    const isEndMove = common_vendor.ref(true);
    const maxLen = 80;
    const activeIndex = common_vendor.computed(() => cacheTabs.value.findIndex((el) => el.key == _active.value));
    let ctxLeft = 0;
    let ctxTop = 0;
    let timeDetail = 1;
    let isMoveEnb = false;
    let dirType = common_vendor.ref("none");
    let isDrag = common_vendor.ref(false);
    let sliderBarWidth = common_vendor.index.upx2px(40);
    let widthDrag = common_vendor.ref(sliderBarWidth);
    common_vendor.watchEffect(() => {
      cacheTabs.value = [];
      props.list.forEach((el, index) => {
        var _a2, _b2, _c, _d, _e, _f, _g;
        cacheTabs.value.push({
          key: (_b2 = (_a2 = el == null ? void 0 : el.key) != null ? _a2 : el == null ? void 0 : el.id) != null ? _b2 : String(index),
          title: (_c = el[props.rangKey]) != null ? _c : String(index),
          icon: (_d = el == null ? void 0 : el.icon) != null ? _d : "",
          dot: (_e = el == null ? void 0 : el.dot) != null ? _e : false,
          count: (_f = el == null ? void 0 : el.count) != null ? _f : "",
          dotColor: (_g = el == null ? void 0 : el.dotColor) != null ? _g : "red"
        });
      });
    });
    function setTabsBarLineLeft(key = "") {
      if (!props.showTabsLineAni)
        return;
      let keybl = key || _active.value;
      let index = cacheTabs.value.findIndex((el) => el.key == keybl);
      if (index > -1) {
        let leftPx = _itemwidth * index;
        if (props.align == "center") {
          leftPx = leftPx + (_width - _itemwidth * cacheTabs.value.length) / 2 - 1;
        }
        anitLineLeft.value = Math.ceil(leftPx);
      }
    }
    function unbindKey(key) {
      var _a2, _b2;
      let index = cacheTabs.value.findIndex((el) => el.key == key);
      if (index > -1) {
        cacheTabs.value.splice(index, 1);
      }
      let index2 = cacheTabs.value.findIndex((el) => el.key == _active.value);
      if (index2 == -1 && cacheTabs.value.length > 0) {
        changeKey((_b2 = (_a2 = cacheTabs.value[0]) == null ? void 0 : _a2.key) != null ? _b2 : "", false, false);
      } else if (cacheTabs.value.length == 0) {
        changeKey("", false, false);
      }
    }
    common_vendor.watch(
      () => props.activeName,
      () => {
        if (props.activeName == _active.value)
          return;
        changeKey(props.activeName, false, false);
      }
    );
    common_vendor.onMounted(() => {
      setTimeout(() => {
        _scrollToId.value = tabsid + _active.value;
        common_vendor.nextTick$1(() => {
          setTabsBarLineLeft(props.defaultName);
        });
      }, 300);
    });
    common_vendor.watchEffect(() => {
      directoStyle.value = Math.ceil(common_vendor.index.upx2px(-activeIndex.value * props.width));
      spinNvueAniEnd(0, -common_vendor.index.upx2px(activeIndex.value * props.width), timeDetail);
    });
    common_vendor.watch(
      () => _active.value,
      () => {
        common_vendor.nextTick$1(() => {
          var _a2, _b2;
          let index = cacheTabs.value.findIndex((el) => el.key == _active.value);
          if (index > -1) {
            if (typeof cacheTabs.value[index - props.subtract] !== "undefined") {
              _scrollToId.value = tabsid + ((_a2 = cacheTabs.value[index - props.subtract]) == null ? void 0 : _a2.key);
            } else {
              _scrollToId.value = tabsid + ((_b2 = cacheTabs.value[0]) == null ? void 0 : _b2.key);
            }
          } else {
            _scrollToId.value = tabsid + _active.value;
          }
          setTabsBarLineLeft();
        });
      }
    );
    let isMoveing = common_vendor.ref(false);
    function onStart(event) {
      if (!props.swiper)
        return;
      isEndMove.value = true;
      isMoveEnb = true;
      isMoveing.value = false;
      isDrag.value = true;
      if (event.type.indexOf("mouse") == -1 && event.changedTouches.length == 1) {
        var touch = event.changedTouches[0];
        if (typeof (touch == null ? void 0 : touch.pageX) !== "undefined") {
          _startx.value = touch.pageX - ctxLeft;
          _starty.value = touch.pageY - ctxTop;
        } else {
          _startx.value = touch.x;
          _starty.value = touch.y;
        }
      } else {
        _startx.value = event.pageX - event.currentTarget.offsetLeft - ctxLeft;
        _starty.value = event.pageY - event.currentTarget.offsetTop - ctxTop;
      }
    }
    function onMove(event) {
      if (!props.swiper || isMoveEnb == false)
        return;
      isMoveing.value = true;
      let nowx = 0;
      let nowy = 0;
      if (event.type.indexOf("mouse") == -1 && event.changedTouches.length == 1) {
        var touch = event.changedTouches[0];
        if (typeof (touch == null ? void 0 : touch.pageX) !== "undefined") {
          nowx = touch.pageX - ctxLeft;
          nowy = touch.pageY - ctxTop;
        } else {
          nowx = touch.x;
          nowy = touch.y;
        }
      } else {
        nowx = event.pageX - event.currentTarget.offsetLeft - ctxLeft;
        nowy = event.pageY - event.currentTarget.offsetTop - ctxTop;
      }
      _x.value = nowx - _startx.value;
      _y.value = nowy - _starty.value;
      setDirXy(_x.value, _y.value);
    }
    function onEnd(event) {
      if (!props.swiper || !isMoveEnb || !isMoveing.value)
        return;
      isEndMove.value = false;
      isMoveing.value = false;
      debounce2(
        () => {
          setDirXy(_x.value, _y.value, true);
          isDrag.value = false;
        },
        250,
        true
      );
      isMoveEnb = false;
    }
    function setDirXy(x, y, isEnd = false) {
      activeIndex.value;
      let nowLeft = common_vendor.index.upx2px(activeIndex.value * props.width);
      debounce(
        () => {
          if (x > 0 && Math.abs(x) > Math.abs(y)) {
            dirType.value = "right";
          } else if (x < 0 && Math.abs(x) > Math.abs(y)) {
            dirType.value = "left";
          } else if (y > 0 && Math.abs(y) > Math.abs(x)) {
            dirType.value = "down";
          } else if (y < 0 && Math.abs(y) > Math.abs(x)) {
            dirType.value = "up";
          } else {
            dirType.value = "none";
          }
        },
        300,
        true
      );
      if (dirType.value == "right") {
        if (activeIndex.value == 0)
          return;
        directoStyle.value = x - nowLeft;
        if (isEnd) {
          setRightDirRight();
          widthDrag.value = sliderBarWidth;
        }
      } else if (dirType.value == "left") {
        if (activeIndex.value == cacheTabs.value.length - 1)
          return;
        directoStyle.value = x - nowLeft;
        if (isEnd) {
          setLeftDirLeft();
          widthDrag.value = sliderBarWidth;
        }
      }
      function setRightDirRight() {
        var _a2, _b2;
        if (x < maxLen || activeIndex.value <= 0) {
          directoStyle.value = -nowLeft;
        } else {
          _active.value = (_b2 = (_a2 = cacheTabs.value[activeIndex.value - 1]) == null ? void 0 : _a2.key) != null ? _b2 : -1;
          changeKey(_active.value, false);
        }
      }
      function setLeftDirLeft() {
        var _a2, _b2;
        if (Math.abs(x) < maxLen || activeIndex.value >= cacheTabs.value.length - 1) {
          directoStyle.value = -nowLeft;
        } else {
          _active.value = (_b2 = (_a2 = cacheTabs.value[activeIndex.value + 1]) == null ? void 0 : _a2.key) != null ? _b2 : -1;
          changeKey(_active.value, false);
        }
      }
    }
    common_vendor.onUnmounted(() => {
    });
    function spinNvueAniEnd(start, end, time = timeDetail) {
      if (!props.swiper)
        return;
    }
    function pushKey(o) {
      var _a2, _b2;
      let index = cacheTabs.value.findIndex((el) => el.key === o.key);
      if (index > -1) {
        cacheTabs.value.splice(index, 1, __spreadValues(__spreadValues({}, cacheTabs.value[0]), o));
      } else {
        cacheTabs.value.push(o);
      }
      if (_active.value == "") {
        changeKey((_b2 = (_a2 = cacheTabs.value[0]) == null ? void 0 : _a2.key) != null ? _b2 : -1, false);
      }
    }
    function changeKey(key, isclick = true, isNomarlChange = true) {
      isEndMove.value = true;
      _active.value = key;
      timeDetail = 1;
      emits("update:activeName", common_vendor.toRaw(_active.value));
      if (isNomarlChange) {
        common_vendor.nextTick$1(() => {
          emits("change", key);
        });
      }
      if (isclick) {
        common_vendor.nextTick$1(() => {
          emits("click", key);
        });
      }
    }
    function setTitle(o) {
      let index = cacheTabs.value.findIndex((el) => el.key == o.key);
      if (index > -1) {
        cacheTabs.value.splice(index, 1, o);
      }
    }
    common_vendor.provide(
      "tabsActiveName",
      common_vendor.computed(() => _active.value)
    );
    common_vendor.provide("tabsActiveactiveIndex", activeIndex);
    common_vendor.provide(
      "tabsActiveCacheTabse",
      common_vendor.computed(() => cacheTabs.value)
    );
    common_vendor.provide(
      "tabsWidth",
      common_vendor.computed(() => props.width)
    );
    common_vendor.provide(
      "tabsheight",
      common_vendor.computed(() => {
        if (!props.height)
          return 0;
        return props.height - props.itemHeight - props.gutter;
      })
    );
    common_vendor.provide(
      "tabsSwiper",
      common_vendor.computed(() => props.swiper)
    );
    common_vendor.provide(
      "tabsSwiperIsMoveing",
      common_vendor.computed(() => isMoveing.value)
    );
    common_vendor.provide(
      "tabsSwiperDisAbledPull",
      common_vendor.computed(() => props.disAbledPull)
    );
    expose({
      pushKey,
      changeKey,
      unbindKey,
      setTitle,
      tmTabsId
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(_tabPos) == "bottom" && !common_vendor.unref(isDulitabs)
      }, common_vendor.unref(_tabPos) == "bottom" && !common_vendor.unref(isDulitabs) ? {
        b: common_vendor.o(onMove),
        c: common_vendor.o(onEnd),
        d: common_vendor.o(onStart),
        e: common_vendor.o(onMove),
        f: common_vendor.o(onEnd),
        g: common_vendor.o(onEnd),
        h: common_vendor.o(onStart),
        i: props.swiper ? `${common_vendor.unref(totalWidth)}px` : `${props.width}rpx`,
        j: props.swiper ? `translateX(${directoStyle.value}px)` : `translateX(0px)`,
        k: common_vendor.n(!isEndMove.value || isNvue.value ? "tmTabsPane" : "")
      } : {}, {
        l: common_vendor.f(cacheTabs.value, (item, index, i0) => {
          return common_vendor.e({
            a: item.icon
          }, item.icon ? {
            b: "09150315-2-" + i0 + "," + ("09150315-1-" + i0),
            c: common_vendor.p({
              userInteractionEnabled: false,
              _class: "pr-5",
              color: item.key === _active.value ? props.activeFontColor : props.unSelectedColor,
              ["font-size"]: item.key === _active.value ? props.activeFontSize : props.itemFontSize,
              name: item.icon
            })
          } : {}, {
            d: "09150315-3-" + i0 + "," + ("09150315-1-" + i0),
            e: common_vendor.p({
              userInteractionEnabled: false,
              ["font-size"]: item.key === _active.value ? props.activeFontSize : props.itemFontSize,
              _class: item.key === _active.value ? "text-weight-b" : "",
              color: item.key === _active.value ? props.activeFontColor : props.unSelectedColor,
              label: item.title
            }),
            f: !item.count && item.dot
          }, !item.count && item.dot ? {
            g: "09150315-4-" + i0 + "," + ("09150315-1-" + i0),
            h: common_vendor.p({
              dot: true,
              color: item.dotColor
            }),
            i: "12rpx",
            j: isNvue.value ? "flex-1" : "100%"
          } : {}, {
            k: item.count && !item.dot
          }, item.count && !item.dot ? {
            l: "09150315-5-" + i0 + "," + ("09150315-1-" + i0),
            m: common_vendor.p({
              count: item.count,
              color: item.dotColor
            }),
            n: props.itemHeight - 30 + "rpx",
            o: props.showTabsLineAni ? 0 : "-16rpx",
            p: isNvue.value ? "flex-1" : "100%"
          } : {}, {
            q: common_vendor.o(($event) => changeKey(item.key), index),
            r: "09150315-1-" + i0 + ",09150315-0",
            s: common_vendor.p({
              round: props.itemRound,
              linear: props.itemLinear,
              linearDeep: props.itemLinearDeep,
              borderDirection: "bottom",
              text: item.key === _active.value ? common_vendor.unref(modelStyle).text : false,
              border: item.key === _active.value ? common_vendor.unref(modelStyle).border : 0,
              transprent: item.key === _active.value ? common_vendor.unref(modelStyle).transprent : true,
              color: props.activeColor && item.key === _active.value ? props.activeColor : props.color,
              width: props.itemWidth,
              _class: "flex-col flex-col-center-center",
              margin: [0, 0],
              padding: [0, 0],
              height: props.itemHeight
            }),
            t: tabsid + item.key,
            v: index
          });
        }),
        m: common_vendor.s(props.itemWidth > 0 ? {
          width: props.itemWidth + "rpx"
        } : {
          paddingLeft: "20rpx",
          paddingRight: "20rpx"
        }),
        n: common_vendor.s({
          height: props.itemHeight + "rpx"
        }),
        o: common_vendor.n(common_vendor.unref(_align)),
        p: common_vendor.s({
          height: `${props.itemHeight + 4}rpx`
        }),
        q: props.showTabsLineAni && props.itemWidth > 0 && props.showTabsLine
      }, props.showTabsLineAni && props.itemWidth > 0 && props.showTabsLine ? {
        r: `${common_vendor.unref(contentWidth)}rpx`,
        s: `${props.itemHeight}rpx`,
        t: props.showTabsLineAni ? common_vendor.unref(store).tmStore.dark ? "#616161" : "#ebebeb" : ""
      } : {}, {
        v: props.showTabsLineAni && props.itemWidth > 0
      }, props.showTabsLineAni && props.itemWidth > 0 ? {
        w: common_vendor.p({
          parenClass: "animateAll_tabs_tmui",
          ["follow-dark"]: false,
          color: props.tabsLineAniColor,
          width: common_vendor.unref(widthDrag),
          unit: "px",
          height: 4,
          margin: [0, 0],
          padding: [0, 0]
        }),
        x: `translateX(${anitLineLeft.value}px)`,
        y: `${props.itemHeight - 2}rpx`,
        z: common_vendor.unref(_itemwidth) + "px"
      } : {}, {
        A: common_vendor.s({
          width: `${props.width}rpx`,
          height: `${props.itemHeight + 4}rpx`
        }),
        B: _scrollToId.value,
        C: common_vendor.p({
          darkBgColor: props.darkBgColor,
          transprent: props.transprent,
          color: props.color,
          followTheme: props.followTheme,
          dark: props.dark,
          round: props.round,
          shadow: props.shadow,
          outlined: props.outlined,
          border: props.border,
          borderStyle: props.borderStyle,
          borderDirection: props.borderDirection,
          text: props.text,
          linear: props.linear,
          linearDeep: props.linearDeep,
          margin: [0, 0],
          padding: [0, 0],
          height: props.itemHeight + common_vendor.unref(modelStyle).border + props.gutter + 4,
          _class: ["flex-center flex-row nonvue", common_vendor.unref(cstomClass)],
          _style: props._style,
          width: props.width
        }),
        D: common_vendor.unref(_tabPos) == "top" && !common_vendor.unref(isDulitabs)
      }, common_vendor.unref(_tabPos) == "top" && !common_vendor.unref(isDulitabs) ? {
        E: common_vendor.o(onMove),
        F: common_vendor.o(onEnd),
        G: common_vendor.o(onStart),
        H: common_vendor.o(onEnd),
        I: common_vendor.o(onMove),
        J: common_vendor.o(onEnd),
        K: common_vendor.o(onEnd),
        L: common_vendor.o(onStart),
        M: props.swiper ? `${common_vendor.unref(totalWidth)}px` : `${props.width}rpx`,
        N: props.swiper ? `translateX(${directoStyle.value}px)` : `translateX(0px)`,
        O: common_vendor.n(!isEndMove.value || isNvue.value ? "tmTabsPane" : "")
      } : {}, {
        P: common_vendor.s(props.height && !common_vendor.unref(isDulitabs) && cacheTabs.value.length > 0 ? {
          height: __props.height + "rpx"
        } : ""),
        Q: common_vendor.s({
          width: props.width + "rpx"
        })
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-09150315"], ["__file", "D:/tmuidome/src/tmui/components/tm-tabs/tm-tabs.vue"]]);
wx.createComponent(Component);
