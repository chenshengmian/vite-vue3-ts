<template>
    <tm-app>
        <block v-if="isapp==0">
            <tm-sheet>
                <tm-text :font-size="24" _class="text-weight-b" label="其它"></tm-text>
                <tm-divider></tm-divider>
                <tm-form @submit="confirm" ref="form" v-model="formvalue" :label-width="190" >
                    <tm-form-item required  :rules="[{ required: true }]">
                        <tm-input  focusColor="green" prefix="tmicon-user-fill" v-model="formvalue.username" :maxlength="11"></tm-input>
                    </tm-form-item>
                    <tm-form-item required  :rules="[{ required: true }]">
                        <tm-input  password  focusColor="green" v-model="formvalue.password" prefix="tmicon-lock-fill"></tm-input>
                    </tm-form-item>
                    <tm-form-item required  :rules="[{ required: true }]">
                    <!-- <view class="px-32"> -->
                        <tm-row :width="686" :column="10">
                            <tm-col :borderGutter="[0, 0, 0, 0]" :col="2" :height="0" :width="0" align="start">
                                <img :src="codeUrl" alt="" @click="getCode" >
                                <!-- <tm-image :width="400" :height="400" @click="getCode" :src="codeUrl" ></tm-image> -->
                            </tm-col>
                            
                        </tm-row>
                        <tm-row :width="686" :column="10">
                            <tm-col :borderGutter="[4, 16, 0, 0]" :col="10" >
                                <!-- <tm-input  focusColor="green" v-model="str" ></tm-input> -->
                                <tm-codeinput class="flexcode" type="dot" :border="0" :size="65" :round="16" :count="4" color="green" @click="show = true" :value="str"></tm-codeinput>
                            </tm-col>
                        </tm-row>
                    <!-- </view> -->
                </tm-form-item>
                </tm-form>
                <tm-keyboard @success="ok" :maxLength="4" v-model:show="show" v-model="str"></tm-keyboard>
                <view class="flex flex-row">
                        <view class="flex-1 mr-32">
                            <tm-button form-type="submit" label="登录" block @click="handleAppLogin"></tm-button>
                        </view>
                        <view class="flex-1">
                            <tm-button :shadow="0" text form-type="reset" label="注册" block @click="handleAppRegister"></tm-button>
                        </view>
                    </view>
            </tm-sheet>
        </block>
        <block v-else-if="isapp==1">
            <tm-sheet :margin="[32, 0, 32, 32]" :shadow="4" :round="2" color="primary" text>
                <tm-avatar :img="avatarUrl"></tm-avatar>
                <div>
                    <div>{{username}}</div>
                     <!-- <div>账号:13111111111</div> -->
                </div>
                <div style="display: flex;justify-content: flex-end;margin-top: 20rpx;width: 100%;">
                    <tm-button :shadow="0" text form-type="reset" label="编辑资料"  @click="handlechange"></tm-button>
                </div>
            </tm-sheet>
            <view class="mb-32 mx-32 round-3 overflow">
                    <tm-cell bottomBorder="true" :round="3" :margin="[0, 0, 0, 16]" :titleFontSize="30" title="头像 Avatar"> </tm-cell>
                    <tm-cell :round="3" :margin="[0, 0, 0, 16]" rightText="简单组件简单组件" :titleFontSize="30" title="徽标 Badge"> </tm-cell>
                    <tm-cell :round="3" :margin="[0, 0, 0, 16]" rightColor="red" rightText="2个" :titleFontSize="30" title="卡片 Card"> </tm-cell>
                </view>
        </block>
        <block v-else-if="isapp==2">
            <tm-button @tap="handleLogin"  label="微信授权登录" block></tm-button>
        </block>
    </tm-app>
</template>

<script lang="ts" setup>
    import { ref,onMounted, Ref, getCurrentInstance } from 'vue'
    import { onShow, onLoad } from "@dcloudio/uni-app";
    import tmApp from '@/tmui/components/tm-app/tm-app.vue'
    import tmInput from '@/tmui/components/tm-input/tm-input.vue'
    import tmSheet from '@/tmui/components/tm-sheet/tm-sheet.vue'
    import tmButton from '@/tmui/components/tm-button/tm-button.vue'
    import tmCodeinput from '@/tmui/components/tm-codeinput/tm-codeinput.vue'
    import tmKeyboard from '@/tmui/components/tm-keyboard/tm-keyboard.vue'
    import tmAvatar from '@/tmui/components/tm-avatar/tm-avatar.vue'
    import tmFormItem from '@/tmui/components/tm-form-item/tm-form-item.vue'
    import tmForm from '@/tmui/components/tm-form/tm-form.vue'
    import tmRow from '@/tmui/components/tm-row/tm-row.vue'
    import tmCol from '@/tmui/components/tm-col/tm-col.vue'
    import tmImage from '@/tmui/components/tm-image/tm-image.vue'
    import tmMessage from '@/tmui/components/tm-message/tm-message.vue'
    import tmCell from '@/tmui/components/tm-cell/tm-cell.vue'
    import { wxlogin,get_user_info,AppLogin,AppRegister } from '@/api/personal'
    import { MD5 } from 'crypto-js';
    import configs from '@/utils/config'
    const { proxy } = getCurrentInstance()
    const show = ref(false)
    const str = ref('')
    const codeUrl = ref('')
    const username : Ref<string> = ref('')
    const avatarUrl : Ref<string> = ref('') 
    if(proxy.$caches.getCache('userInfo')){
        avatarUrl.value = proxy.$caches.getCache('userInfo').avatar_wechat
        username.value = proxy.$caches.getCache('userInfo').nickname_wechat
    }else{
        if(proxy.$caches.getCache('appuserinfo').avatar==''){
            avatarUrl.value = 'https://picsum.photos/200/300'
        }else{
            avatarUrl.value = proxy.$caches.getCache('appuserinfo').avatar
        }
        username.value = proxy.$caches.getCache('appuserinfo').nickname
    }
    const isapp : Ref<number> = ref(1)
    isapp.value = proxy.$caches.getCache('isapp')
    const msg = ref<InstanceType<typeof tmMessage> | null>(null)
    const formvalue : Ref<object> = ref({
        captcha:'',
        username:'',
        password:'',
        iv:0,
        sign:'',
        smsVerificationcode:0
    })

    onMounted(()=>{
        getSystemInfo()
        BasicInformation()
    })

    //app登录需要的数据类型
    interface applogin{
        captcha:string
        username:string
        password:string
        iv:number
        sign:string
    }

    //app注册
    const handleAppRegister = () =>{
        formvalue.value.smsVerificationcode = str.value
        AppRegister(formvalue.value).then(res=>{
            console.log(res)
        }).catch(err=>{
            console.log(err)
        })
    }

    //app登录
    const handleAppLogin = () =>{
        formvalue.value.captcha = str.value

        AppLogin(formvalue.value).then(res=>{
            console.log(res)
            const userinfos = JSON.parse(res.substring(1))
            console.log(userinfos)
            const { status,result:{userinfo,token:{refersh_token,access_token}} } = userinfos
            if(status == 1){
                proxy.$caches.setCache('userid',userinfo.userid)
                proxy.$caches.setCache('token',access_token)
                proxy.$caches.setCache('reftoken',refersh_token)
                proxy.$caches.setCache('appuserinfo',userinfo)
                avatarUrl.value = proxy.$caches.getCache('appuserinfo').avatar
                username.value = proxy.$caches.getCache('appuserinfo').nickname
                isapp.value = 1
                proxy.$caches.setCache('isapp',1)
                msg.show({ model: 'success' })
            }
        }).catch(err=>{
            console.log(err)
        })
    }

    //更新验证码
    const getCode = () =>{
        BasicInformation()
    }

    //获取基本信息
    const BasicInformation = () =>{
        get_user_info().then(res=>{
            console.log(res)
            const { result:{iv,verifycode_img} } : { iv:number,verifycode_img:string }= res
            formvalue.value.iv = iv
            codeUrl.value = verifycode_img
            formvalue.value.sign =  MD5(configs.version+iv.toString()).toString();
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const getSystemInfo = () =>{
        // console.log(uni.getSystemInfoSync().uniPlatform)
        if(proxy.$caches.getCache('token')){
            isapp.value = 1
            proxy.$caches.setCache('isapp',1)
        }else{
            if(uni.getSystemInfoSync().uniPlatform == 'mp-weixin'){
                isapp.value = 2
                proxy.$caches.setCache('isapp',2)


            }else{
                isapp.value = 0
                proxy.$caches.setCache('isapp',0)

            }
        }
    }

    interface loginlist{
        code:string,
        nickName:string,
        avatarUrl:string,
        language:string,
        gender:number
    }

    const handleLogin = () =>{
        uni.getUserProfile({
            'desc':'授权登录',
            success: function(res) {
                // 授权成功，可以获取用户信息
                console.log(res);
                const {userInfo:{nickName,avatarUrl,language,gender}} = res
                // proxy.$caches.setCache('userInfo',res.userInfo)
                uni.login({
                    "provider": "weixin",
                    "onlyAuthorize": true, // 微信登录仅请求授权认证
                    success: function (loginRes) {
                        const {code} = loginRes
                        const newcode:loginlist = {
                            code: code,
                            nickName:nickName,
                            avatarUrl:avatarUrl,
                            language:language,
                            gender:gender
                        }
                        wxlogin(newcode).then(res=>{
                            const resinfo = JSON.parse(res.substring(1))
                            console.log(resinfo)

                            const { status,result:{userid,userinfo,token:{refersh_token,access_token}} } = resinfo
                            if(status == 1){
                                proxy.$caches.setCache('userid',userid)
                                proxy.$caches.setCache('token',access_token)
                                proxy.$caches.setCache('reftoken',refersh_token)
                                isapp.value = 1
                                proxy.$caches.setCache('isapp',1)
                                proxy.$caches.setCache('userInfo',userinfo)
                                username.value = proxy.$caches.getCache('userInfo').nickname_wechat
                                avatarUrl.value = proxy.$caches.getCache('userInfo').avatar_wechat
                                msg.show({ model: 'success' })
                            }
                        })
                        .catch(err=>{
                            console.log(err)
                        })
                    },
                    fail: function (err) {
                        // 登录失败，处理错误情况
                        console.error(err);
                    }
                });

            },
            fail: function(err) {
                // 授权失败，处理错误情况
                console.error(err);
            }
        });
       
    }
    
</script>

<style  scoped>
    .flexcode{
        width: 100% !important;
    }
</style>