"use strict";
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
if (!Math) {
  (tmIcon + tmSheet)();
}
const tmSheet = () => "../tm-sheet/tm-sheet.js";
const tmIcon = () => "../tm-icon/tm-icon.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "tm-waterfall",
  props: {
    /**组件整体宽度 */
    width: {
      type: Number,
      default: 750
    },
    /**元素间的间距 */
    gutter: {
      type: Number,
      default: 12
    },
    /**底部高度 */
    bottomHeight: {
      type: Number,
      default: 50
    },
    /**是否开启虚拟加载占位符 */
    isLoadPlaceholder: {
      type: Boolean,
      default: true
    },
    /**虚拟加载占位符背景是否透明 */
    isLoadPlaceholderTransprent: {
      type: Boolean,
      default: false
    }
  },
  setup(__props, { expose }) {
    const props = __props;
    const _containerWidth = common_vendor.computed(() => props.width);
    const _itemRealWidth = common_vendor.computed(() => {
      return (_containerWidth.value - props.gutter) / 2;
    });
    const parentNameId = "tmWaterfallId";
    const _cacheList = common_vendor.ref([]);
    const _totalSort = common_vendor.ref([[], []]);
    const _list = common_vendor.ref([]);
    const _totalNum = common_vendor.ref([]);
    const _containerHeight = common_vendor.computed(() => {
      let gu = common_vendor.index.upx2px(props.gutter);
      let lh = _totalSort.value[0].map((el) => el.height);
      let l_height = lh.length == 0 ? 0 : lh.reduce((a, b) => a + b + gu);
      let rh = _totalSort.value[1].map((el) => el.height);
      let r_height = rh.length == 0 ? 0 : rh.reduce((a, b) => a + b + gu);
      return {
        left: l_height,
        right: r_height,
        maxHeight: Math.max(r_height, l_height),
        minHeight: Math.min(r_height, l_height)
      };
    });
    common_vendor.provide(
      "tmWaterFallItemRealWidth",
      common_vendor.computed(() => common_vendor.index.upx2px(_itemRealWidth.value))
    );
    function sumTotal(id) {
      _totalNum.value.push(id);
    }
    function pushKey(n) {
      return __async(this, null, function* () {
        let index = _cacheList.value.findIndex((el) => el.id == n.id);
        let item = n;
        if (index > -1) {
          _cacheList.value[index] = item;
          return item;
        } else {
          _cacheList.value.push(item);
          return countPushSort(item);
        }
      });
    }
    function clear() {
      _cacheList.value = [];
      _list.value = [];
      _totalNum.value = [];
      _totalSort.value = [[], []];
    }
    function countPushSort(item) {
      var _a, _b;
      let dir = _containerHeight.value.left > _containerHeight.value.right ? 1 : 0;
      let bottom = (_b = (_a = _totalSort.value[dir][_totalSort.value[dir].length - 1]) == null ? void 0 : _a.bottom) != null ? _b : 0;
      item.top = bottom + common_vendor.index.upx2px(props.gutter);
      item.bottom = item.top + item.height;
      item.left = dir == 0 ? 0 : common_vendor.index.upx2px(_itemRealWidth.value) + common_vendor.index.upx2px(props.gutter);
      let index = _list.value.findIndex((el) => el.id == item.id);
      _totalSort.value[dir].push(item);
      if (index > -1) {
        _list.value[index] = item;
      } else {
        _list.value.push(item);
      }
      return item;
    }
    expose({ parentNameId, pushKey, sumTotal, clear });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.s({
          width: common_vendor.unref(_containerWidth) + "rpx",
          height: common_vendor.unref(_containerHeight).maxHeight + props.bottomHeight + "px"
        }),
        b: _totalNum.value.length != _list.value.length && props.isLoadPlaceholder
      }, _totalNum.value.length != _list.value.length && props.isLoadPlaceholder ? {
        c: common_vendor.p({
          name: "tmicon-shuaxin",
          spin: true
        }),
        d: common_vendor.p({
          _class: "flex flex-center",
          margin: [0, 0],
          padding: [0, 0],
          transprent: props.isLoadPlaceholderTransprent
        })
      } : {});
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/tmuidome/src/tmui/components/tm-waterfall/tm-waterfall.vue"]]);
wx.createComponent(Component);
