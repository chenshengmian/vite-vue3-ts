"use strict";
const common_vendor = require("../../common/vendor.js");
const api_personal = require("../../api/personal.js");
const utils_config = require("../../utils/config.js");
require("../../utils/http.js");
require("../../utils/cache.js");
if (!Array) {
  const _component_tm_text = common_vendor.resolveComponent("tm-text");
  const _component_tm_divider = common_vendor.resolveComponent("tm-divider");
  (_component_tm_text + _component_tm_divider)();
}
if (!Math) {
  (tmInput + tmFormItem + tmCol + tmRow + tmCodeinput + tmForm + tmKeyboard + tmButton + tmSheet + tmAvatar + tmCell + tmApp)();
}
const tmApp = () => "../../tmui/components/tm-app/tm-app.js";
const tmInput = () => "../../tmui/components/tm-input/tm-input.js";
const tmSheet = () => "../../tmui/components/tm-sheet/tm-sheet.js";
const tmButton = () => "../../tmui/components/tm-button/tm-button.js";
const tmCodeinput = () => "../../tmui/components/tm-codeinput/tm-codeinput.js";
const tmKeyboard = () => "../../tmui/components/tm-keyboard/tm-keyboard.js";
const tmAvatar = () => "../../tmui/components/tm-avatar/tm-avatar.js";
const tmFormItem = () => "../../tmui/components/tm-form-item/tm-form-item.js";
const tmForm = () => "../../tmui/components/tm-form/tm-form.js";
const tmRow = () => "../../tmui/components/tm-row/tm-row.js";
const tmCol = () => "../../tmui/components/tm-col/tm-col.js";
const tmCell = () => "../../tmui/components/tm-cell/tm-cell.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "PersonalCenter",
  setup(__props) {
    const { proxy } = common_vendor.getCurrentInstance();
    const show = common_vendor.ref(false);
    const str = common_vendor.ref("");
    const codeUrl = common_vendor.ref("");
    const username = common_vendor.ref("");
    const avatarUrl = common_vendor.ref("");
    if (proxy.$caches.getCache("userInfo")) {
      avatarUrl.value = proxy.$caches.getCache("userInfo").avatar_wechat;
      username.value = proxy.$caches.getCache("userInfo").nickname_wechat;
    } else {
      if (proxy.$caches.getCache("appuserinfo").avatar == "") {
        avatarUrl.value = "https://picsum.photos/200/300";
      } else {
        avatarUrl.value = proxy.$caches.getCache("appuserinfo").avatar;
      }
      username.value = proxy.$caches.getCache("appuserinfo").nickname;
    }
    const isapp = common_vendor.ref(1);
    isapp.value = proxy.$caches.getCache("isapp");
    const msg = common_vendor.ref(null);
    const formvalue = common_vendor.ref({
      captcha: "",
      username: "",
      password: "",
      iv: 0,
      sign: "",
      smsVerificationcode: 0
    });
    common_vendor.onMounted(() => {
      getSystemInfo();
      BasicInformation();
    });
    const handleAppRegister = () => {
      formvalue.value.smsVerificationcode = str.value;
      api_personal.AppRegister(formvalue.value).then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });
    };
    const handleAppLogin = () => {
      formvalue.value.captcha = str.value;
      api_personal.AppLogin(formvalue.value).then((res) => {
        console.log(res);
        const userinfos = JSON.parse(res.substring(1));
        console.log(userinfos);
        const { status, result: { userinfo, token: { refersh_token, access_token } } } = userinfos;
        if (status == 1) {
          proxy.$caches.setCache("userid", userinfo.userid);
          proxy.$caches.setCache("token", access_token);
          proxy.$caches.setCache("reftoken", refersh_token);
          proxy.$caches.setCache("appuserinfo", userinfo);
          avatarUrl.value = proxy.$caches.getCache("appuserinfo").avatar;
          username.value = proxy.$caches.getCache("appuserinfo").nickname;
          isapp.value = 1;
          proxy.$caches.setCache("isapp", 1);
          msg.show({ model: "success" });
        }
      }).catch((err) => {
        console.log(err);
      });
    };
    const getCode = () => {
      BasicInformation();
    };
    const BasicInformation = () => {
      api_personal.get_user_info().then((res) => {
        console.log(res);
        const { result: { iv, verifycode_img } } = res;
        formvalue.value.iv = iv;
        codeUrl.value = verifycode_img;
        formvalue.value.sign = common_vendor.cryptoJsExports.MD5(utils_config.configs.version + iv.toString()).toString();
      }).catch((err) => {
        console.log(err);
      });
    };
    const getSystemInfo = () => {
      if (proxy.$caches.getCache("token")) {
        isapp.value = 1;
        proxy.$caches.setCache("isapp", 1);
      } else {
        if (common_vendor.index.getSystemInfoSync().uniPlatform == "mp-weixin") {
          isapp.value = 2;
          proxy.$caches.setCache("isapp", 2);
        } else {
          isapp.value = 0;
          proxy.$caches.setCache("isapp", 0);
        }
      }
    };
    const handleLogin = () => {
      common_vendor.index.getUserProfile({
        "desc": "授权登录",
        success: function(res) {
          console.log(res);
          const { userInfo: { nickName, avatarUrl: avatarUrl2, language, gender } } = res;
          common_vendor.index.login({
            "provider": "weixin",
            "onlyAuthorize": true,
            // 微信登录仅请求授权认证
            success: function(loginRes) {
              const { code } = loginRes;
              const newcode = {
                code,
                nickName,
                avatarUrl: avatarUrl2,
                language,
                gender
              };
              api_personal.wxlogin(newcode).then((res2) => {
                const resinfo = JSON.parse(res2.substring(1));
                console.log(resinfo);
                const { status, result: { userid, userinfo, token: { refersh_token, access_token } } } = resinfo;
                if (status == 1) {
                  proxy.$caches.setCache("userid", userid);
                  proxy.$caches.setCache("token", access_token);
                  proxy.$caches.setCache("reftoken", refersh_token);
                  isapp.value = 1;
                  proxy.$caches.setCache("isapp", 1);
                  proxy.$caches.setCache("userInfo", userinfo);
                  username.value = proxy.$caches.getCache("userInfo").nickname_wechat;
                  avatarUrl2.value = proxy.$caches.getCache("userInfo").avatar_wechat;
                  msg.show({ model: "success" });
                }
              }).catch((err) => {
                console.log(err);
              });
            },
            fail: function(err) {
              console.error(err);
            }
          });
        },
        fail: function(err) {
          console.error(err);
        }
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: isapp.value == 0
      }, isapp.value == 0 ? {
        b: common_vendor.p({
          ["font-size"]: 24,
          _class: "text-weight-b",
          label: "其它"
        }),
        c: common_vendor.o(($event) => formvalue.value.username = $event),
        d: common_vendor.p({
          focusColor: "green",
          prefix: "tmicon-user-fill",
          maxlength: 11,
          modelValue: formvalue.value.username
        }),
        e: common_vendor.p({
          required: true,
          rules: [{
            required: true
          }]
        }),
        f: common_vendor.o(($event) => formvalue.value.password = $event),
        g: common_vendor.p({
          password: true,
          focusColor: "green",
          prefix: "tmicon-lock-fill",
          modelValue: formvalue.value.password
        }),
        h: common_vendor.p({
          required: true,
          rules: [{
            required: true
          }]
        }),
        i: codeUrl.value,
        j: common_vendor.o(getCode),
        k: common_vendor.p({
          borderGutter: [0, 0, 0, 0],
          col: 2,
          height: 0,
          width: 0,
          align: "start"
        }),
        l: common_vendor.p({
          width: 686,
          column: 10
        }),
        m: common_vendor.o(($event) => show.value = true),
        n: common_vendor.p({
          type: "dot",
          border: 0,
          size: 65,
          round: 16,
          count: 4,
          color: "green",
          value: str.value
        }),
        o: common_vendor.p({
          borderGutter: [4, 16, 0, 0],
          col: 10
        }),
        p: common_vendor.p({
          width: 686,
          column: 10
        }),
        q: common_vendor.p({
          required: true,
          rules: [{
            required: true
          }]
        }),
        r: common_vendor.sr("form", "8e6a8321-4,8e6a8321-1"),
        s: common_vendor.o(_ctx.confirm),
        t: common_vendor.o(($event) => formvalue.value = $event),
        v: common_vendor.p({
          ["label-width"]: 190,
          modelValue: formvalue.value
        }),
        w: common_vendor.o(_ctx.ok),
        x: common_vendor.o(($event) => show.value = $event),
        y: common_vendor.o(($event) => str.value = $event),
        z: common_vendor.p({
          maxLength: 4,
          show: show.value,
          modelValue: str.value
        }),
        A: common_vendor.o(handleAppLogin),
        B: common_vendor.p({
          ["form-type"]: "submit",
          label: "登录",
          block: true
        }),
        C: common_vendor.o(handleAppRegister),
        D: common_vendor.p({
          shadow: 0,
          text: true,
          ["form-type"]: "reset",
          label: "注册",
          block: true
        })
      } : isapp.value == 1 ? {
        F: common_vendor.p({
          img: avatarUrl.value
        }),
        G: common_vendor.t(username.value),
        H: common_vendor.o(_ctx.handlechange),
        I: common_vendor.p({
          shadow: 0,
          text: true,
          ["form-type"]: "reset",
          label: "编辑资料"
        }),
        J: common_vendor.p({
          margin: [32, 0, 32, 32],
          shadow: 4,
          round: 2,
          color: "primary",
          text: true
        }),
        K: common_vendor.p({
          bottomBorder: "true",
          round: 3,
          margin: [0, 0, 0, 16],
          titleFontSize: 30,
          title: "头像 Avatar"
        }),
        L: common_vendor.p({
          round: 3,
          margin: [0, 0, 0, 16],
          rightText: "简单组件简单组件",
          titleFontSize: 30,
          title: "徽标 Badge"
        }),
        M: common_vendor.p({
          round: 3,
          margin: [0, 0, 0, 16],
          rightColor: "red",
          rightText: "2个",
          titleFontSize: 30,
          title: "卡片 Card"
        })
      } : isapp.value == 2 ? {
        O: common_vendor.o(handleLogin),
        P: common_vendor.p({
          label: "微信授权登录",
          block: true
        })
      } : {}, {
        E: isapp.value == 1,
        N: isapp.value == 2
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8e6a8321"], ["__file", "D:/tmuidome/src/components/PersonalCenter/PersonalCenter.vue"]]);
wx.createComponent(Component);
