<template>
    <tm-app>
      <tm-sheet>
        <tm-sheet>
          <tm-form
            @submit="confirm"
            ref="form"
            v-model="userInfo"
            :label-width="190"
          >
            <tm-text
              :font-size="24"
              _class="text-weight-b"
              label="登录"
            ></tm-text>
            <tm-divider></tm-divider>
            <tm-form-item>
              <tm-input
                prefix="tmicon-user-fill"
                v-model="userInfo.username"
                placeholder="请输入账号"
              ></tm-input>
            </tm-form-item>
            <tm-form-item>
              <tm-input
                :margin="[0, 24]"
                v-model="userInfo.password"
                password
                placeholder="请输入密码"
                prefix="tmicon-lock-fill"
              ></tm-input>
            </tm-form-item>
            <div style="display: flex; justify-content: end">
              <img
                :src="imgurl"
                @click="handlenewimg"
                alt=""
                style="
                  width: 200rpx;
                  margin: 30rpx 0rpx;
                  height: 100rpx;
                  border-radius: 20rpx;
                "
              />
            </div>
            <tm-form-item>
              <tm-codeinput
                :border="2"
                :round="4"
                @click="show = true"
                :value="userInfo.verifycode"
              ></tm-codeinput>
            </tm-form-item>
            <tm-keyboard
              @success="ok"
              :maxLength="4"
              v-model:show="show"
              v-model="userInfo.verifycode"
            ></tm-keyboard>
            <tm-form-item>
              <view class="flex flex-row" style="margin-top: 20rpx">
                <view class="flex-1 mr-32">
                  <tm-button
                    @click="handleLogin"
                    size="small"
                    form-type="submit"
                    label="提交表单"
                    block
                  ></tm-button>
                </view>
                <view class="flex-1">
                  <tm-button
                    size="small"
                    :shadow="0"
                    text
                    form-type="reset"
                    label="重置表单"
                    block
                  ></tm-button>
                </view>
              </view>
            </tm-form-item>
          </tm-form>
        </tm-sheet>
      </tm-sheet>
      <tm-tabbar :autoSelect="false" v-model:active="acc">
        <tm-tabbar-item
          @click="acc = 0"
          activeColor="orange"
          count="HOT"
          url="/pages/index/index"
          open-type="reLaunch"
          text="首页"
          icon="tmicon-collection-fill"
        ></tm-tabbar-item>
        <tm-tabbar-item
          @click="acc = 1"
          url="/pages/CustomizePage/CustomizePage"
          activeColor="orange"
          text="定制页面"
          unicon="tmicon-accesskeys"
          icon="tmicon-accesskeys"
        ></tm-tabbar-item>
        <!--<tm-tabbar-item
                  @click="acc = 2"
                  :shadow="2"
                  :beforeClick="laodingfun"
                  :data="'中间项'"
                  btn-top
                  fontColor="white"
                  activeColor="white"
                  linear="top"
                  linearDeep="accent"
                  color="yellow"
                  icon="tmicon-plus"
              ></tm-tabbar-item>-->
        <tm-tabbar-item
          @click="handleChoose"
          activeColor="orange"
          unicon="tmicon-plus-square"
          icon="tmicon-plus-square-fill"
        ></tm-tabbar-item>
        <tm-tabbar-item
          @click="openAlbum"
          activeColor="orange"
          url="/pages/OpenAlbum/OpenAlbum"
          text="打开相册"
          unicon="tmicon-like"
          icon="tmicon-heart-fill"
        ></tm-tabbar-item>
        <tm-tabbar-item
          @click="acc = 4"
          activeColor="orange"
          :count="8"
          url="/pages/TurnCamera/TurnCamera"
          active
          text="图表中心"
          unicon="tmicon-position"
          icon="tmicon-md-pin"
        ></tm-tabbar-item>
      </tm-tabbar>
    </tm-app>
  </template>
  
  <script lang="ts" setup>
  import { ref, getCurrentInstance, onMounted } from "vue";
  import { onShow, onLoad } from "@dcloudio/uni-app";
  import tmApp from "@/tmui/components/tm-app/tm-app.vue";
  import tmSheet from "@/tmui/components/tm-sheet/tm-sheet.vue";
  import tmText from "@/tmui/components/tm-text/tm-text.vue";
  import tmTabbar from "@/tmui/components/tm-tabbar/tm-tabbar.vue";
  import tmTabbarItem from "@/tmui/components/tm-tabbar-item/tm-tabbar-item.vue";
  import tmInput from "@/tmui/components/tm-input/tm-input.vue";
  import tmDivider from "@/tmui/components/tm-divider/tm-divider.vue";
  import tmButton from "@/tmui/components/tm-button/tm-button.vue";
  import tmCodeinput from "@/tmui/components/tm-codeinput/tm-codeinput.vue";
  import { getAccount, login } from "@/api/index";
  import tmKeyboard from "@/tmui/components/tm-keyboard/tm-keyboard.vue";
  import md5 from "blueimp-md5";
  const acc = ref(1);
  const test = ref("");
  const show = ref(false);
  const userInfo = ref({
    password: "",
    username: "",
    verifycode: "",
    iv: "",
    sign: "",
  });
  const { proxy } = getCurrentInstance();
  const imgurl = ref("");
  
  onMounted(() => {
      getpritce()
  });
  
  const getpritce = () =>{
      getAccount().then((res: any) => {
      // console.log('111',res)
      const {
        data: {
          result: { iv, verifycode_img },
        },
      } = res;
      imgurl.value = verifycode_img;
      proxy.$caches.setCache("iv", iv);
    });
    //获取图形验证码
  }
  
  const handlenewimg = () =>{
      getpritce()
  }
  
  const handleLogin = () => {
    // console.log(userInfo.value)
    const iv: string = proxy.$caches.getCache("iv");
    userInfo.value.iv = iv;
    userInfo.value.sign = md5("MLXY202309010002" + iv);
    console.log(userInfo);
    login(userInfo.value)
      .then((res: any) => {
        console.log(res);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };
  
  const openAlbum = () =>{
      plus.gallery.pick(function(path){
          var name = path.substring(path.lastIndexOf("/")+1); 
             compressPhoto(path,name);//图片压缩
      }, function(e){
      }, {filter:'image'});
  }
  
  function laodingfun(val: any) {
    return new Promise((res) => {
      setTimeout(function () {
        console.log("选中了：", val);
        res(true);
      }, 2000);
    });
  }
  const handleChoose = () => {
    //判断是在微信环境中
        const type  = uni.getSystemInfoSync().uniPlatform
       console.log(type)
      if(type=='mp-weixin'){
          uni.chooseMedia({
              mediaType: ["image"],
              sizeType: ["compressed"],
              sourceType: ["camera", "album"],
              success: function (res) {
              console.log(res);
              },
          });
      }else if(type=='app'){
          var cmr = plus.camera.getCamera();    
          cmr.captureImage(function(p) {    
                 plus.io.resolveLocalFileSystemURL(p, function(entry) {    
                     compressImage(entry.toLocalURL(),entry.name);    
                 }, function(e) {    
                     plus.nativeUI.toast("读取拍照文件错误：" + e.message);    
                 });    
             }, function(e) {    
             }, {    
             filter: 'image'   
             });  
      }
  
  };
  </script>