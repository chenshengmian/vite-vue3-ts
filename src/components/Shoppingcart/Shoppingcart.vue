<template>
  <tm-app>
    <div style="border: 2rpx solid #e0dede;margin:20rpx">
        <block v-for="(item, index) in cardArr" :key="index">
        <div class="cart">
            <div style="display: flex; justify-self: start">
            <tm-checkbox
                :round="10"
                value="banner"
                style="display: flex; align-items: center"
            ></tm-checkbox>
            <tm-image :width="180" :height="150" :src="item.url"></tm-image>
            <div style="font-size: 26rpx; margin-left: 15rpx; position: relative">
                <div>{{ item.name }}</div>
                <div style="position: absolute; bottom: 0">
                <span style="font-size: 19rpx">￥</span>{{ item.price }}.
                </div>
            </div>
            </div>
            <div style="">
            <tm-stepper
                circular
                :max="item.maxnum"
                :defaultValue="item.num"
                :fontSize="24"
            ></tm-stepper>
            </div>
        </div>
        </block>
    </div>
    <div style="position: fixed;bottom:150rpx;width:100%;">
        <div style="display:flex;justify-content: space-between;">
            <div style="display:flex; align-items: center">
                <tm-checkbox
                :round="10"
                value="all"
                label="全选"
            ></tm-checkbox>
            </div>

            <div style="display:flex;">
                <div style="display:flex; align-items: center; font-size:25rpx;margin-right:20rpx">合计： ￥{{ sumprice }}</div>
                <tm-button color="pink" @click="showWin2 = true" :shadow="0" size="small" label="结算"> </tm-button>
            </div>
        </div>
    </div>
    <tm-modal
			ref="modal"
			color="grey-5"
			:height="500"
			:border="0"
			text
			okColor="black"
			cancelColor="white"
			linear="bottom"
			title="信息框"
			v-model:show="showWin2"
		>
			<view>
				<tm-input></tm-input>
				<tm-image src="https://picsum.photos/450/150" :height="150" :width="450"></tm-image>
				<tm-text
					label="主体内容哦主体内容哦主体内容哦主体内容哦主体内容哦主体内容哦主体内容哦主体内容哦主体内容哦主体内容哦主体内容哦主体内容哦主体内容哦主体内容哦主体内容哦"
				></tm-text>
				<tm-image src="https://picsum.photos/450/150?id=36" :height="150" :width="450"></tm-image>
			</view>
		</tm-modal>
  </tm-app>

   
</template>

<script lang="ts" setup>
import { ref, Ref } from "vue";
import { onShow, onLoad } from "@dcloudio/uni-app";
import tmApp from "@/tmui/components/tm-app/tm-app.vue";
import tmSheet from "@/tmui/components/tm-sheet/tm-sheet.vue";
import tmText from "@/tmui/components/tm-text/tm-text.vue";
import tmImage from "@/tmui/components/tm-image/tm-image.vue";
import tmCheckbox from "@/tmui/components/tm-checkbox/tm-checkbox.vue";
import tmStepper from "@/tmui/components/tm-stepper/tm-stepper.vue";
import tmCard from "@/tmui/components/tm-card/tm-card.vue";
import tmButton from '../../tmui/components/tm-button/tm-button.vue'
import tmModal from '@/tmui/components/tm-modal/tm-modal.vue'
const test = ref("");
const title: Ref<string> = ref("眼镜框");
const price: Ref<number> = ref(100);
const radio = ref(null);
const sumprice: Ref<number> = ref(100)
const showWin2 = ref(false)
const cardArr: Ref<Array> = ref([
  {
    id: 1,
    name: "眼镜框",
    url: "https://store.tmui.design/api_v2/public/random_picture",
    maxnum: 99,
    price: 100,
    num: 5,
  },
  {
    id: 2,
    name: "护眼仪",
    url: "https://store.tmui.design/api_v2/public/random_picture?random=2",
    maxnum: 5,
    price: 1990,
    num: 4,
  },
  {
    id: 3,
    name: "眼药水",
    url: "https://store.tmui.design/api_v2/public/random_picture?random=3",
    maxnum: 10,
    price: 12,
    num: 2,
  },
]);
</script>

<style  scoped>
.cart {
  display: flex;
  justify-content: space-between;
  padding: 30rpx;
}
</style>