<template>
	<tm-app ref="app">
        <tm-roll-notice  color="red" @click="test" list="2023年11月17日清仓大甩卖"></tm-roll-notice>
        <tm-carousel autoplay model="dot" :margin="[0, 16]" align="right" :round="3" :width="686" :height="300" :list="listimg2"></tm-carousel>
        <!-- <tm-sheet> -->
			<tm-tabs activeFontColor="yellow" @change="tabschange" showTabsLineAni :list="tabsTitle" :item-width="180" :width="636" default-name="2"></tm-tabs>
		<!-- </tm-sheet> -->
		<view class="flex flex-col flex-col-top-center">
			<tm-waterfall ref="wall" :width="686">
				<tm-waterfall-item @click="itemClick" :img="item.img" v-for="(item, index) in imglist" :key="index" >
					<view class="pt-12 pb-12 px-12" @click="show = true">
						<tm-text :label="item.text" _class="text-overflow-2"></tm-text>
						<view class="flex flex-row flex-row-bottom-start mt-24">
							<!-- <tm-text color="orange" :font-size="24" label='¥'></tm-text> -->
							<tm-text color="orange" _class="px-10" :font-size="36" :label="item.price"></tm-text>
							<tm-text color="grey" :font-size="24" :label="item.num"></tm-text>
						</view>
					</view>
				</tm-waterfall-item>
			</tm-waterfall>
            <tm-sku
                :value="'a-a-a'"
                @buy="buy"
                :num="num"
                :height="900"
                :sku-map="[
                    { key: 'size', value: '商品尺码' },
                    { key: 'color', value: '商品颜色' },
                    { key: 'model', value: '商品型号' }
                ]"
                :list="list"
                v-model:show="show"
            ></tm-sku>
		</view>
	</tm-app>
</template>
<script lang="ts" setup>
import { nextTick, ref, getCurrentInstance } from 'vue'
import { onShow, onLoad } from '@dcloudio/uni-app'
import tmApp from '@/tmui/components/tm-app/tm-app.vue'
import tmSheet from '@/tmui/components/tm-sheet/tm-sheet.vue'
import tmText from '@/tmui/components/tm-text/tm-text.vue'
import tmWaterfall from '@/tmui/components/tm-waterfall/tm-waterfall.vue'
import tmWaterfallItem from '@/tmui/components/tm-waterfall-item/tm-waterfall-item.vue'
import tmCarousel from '@/tmui/components/tm-carousel/tm-carousel.vue'
import tmDivider from '@/tmui/components/tm-divider/tm-divider.vue'
import tmRollNotice from '@/tmui/components/tm-roll-notice/tm-roll-notice.vue'
import tmTabs from '@/tmui/components/tm-tabs/tm-tabs.vue'
import { useTmpiniaStore } from '@/tmui/tool/lib/tmpinia'
import tmSku from '@/tmui/components/tm-sku/tm-sku.vue'
const show = ref(false)
const list = ref({
	data: [
		{
			title: '颜色类型',
			id: 'test',
			children: [
				{
					title: '白色',
					id: 'a',
					num: 5
				},
				{
					title: '黑色',
					id: 'b',
					num: 5
				}
			]
		},
		{
			title: '尺码表',
			id: 'model',
			children: [
				{
					title: 'XS',
					id: 'a',
					num: 5
				},
				{
					title: 'S',
					id: 'b',
					num: 5
				}
			]
		},
		{
			title: '款式',
			id: 'style',
			children: [
				{
					title: '套装',
					id: 'a',
					num: 5
				},
				{
					title: '单件',
					id: 'b',
					num: 5
				}
			]
		}
	],
	product: [
		{
			id: 'a-a-a',
			title: '白色-XS-套装',
			num: 2,
			max_buy: 3,
			price: 56.9,
			salePrice: 54,
			tip: '当前可省10元',
			img: 'https://gw.alicdn.com/bao/uploaded/i1/2328862868/O1CN01b5pglN1X3ahprbU9P_!!2328862868.jpg'
		},
		{
			id: 'a-a-b',
			title: '白色-XS-单件',
			num: 5,
			max_buy: 3,
			price: 56.9,
			salePrice: 54,
			tip: '当前可省10元',
			img: 'https://gw.alicdn.com/bao/uploaded/i3/2328862868/O1CN01UBMJfy1X3af4Lc3ME_!!2328862868.jpg'
		},
		{
			id: 'a-b-a',
			title: '白色-S-套装',
			num: 3,
			max_buy: 3,
			price: 56.9,
			salePrice: 54,
			tip: '当前可省10元',
			img: 'https://gw.alicdn.com/bao/uploaded/i1/TB1fw40oAvoK1RjSZPfSutPKFXa.jpg'
		},
		{
			id: 'a-b-b',
			title: '白色-S-单件',
			num: 5,
			max_buy: 3,
			price: 56.9,
			salePrice: 54,
			tip: '当前可省10元',
			img: 'https://gw.alicdn.com/bao/uploaded/i1/398719215/O1CN01zgD6Xi2HwWY8U589Z_!!398719215.jpg'
		},

		{
			id: 'b-a-a',
			title: '黑色-XS-套装',
			num: 0,
			max_buy: 3,
			price: 56.9,
			salePrice: 54,
			tip: '当前可省10元',
			img: 'https://gw.alicdn.com/bao/uploaded/i1/TB1fw40oAvoK1RjSZPfSutPKFXa.jpg'
		},
		{
			id: 'b-a-b',
			title: '黑色-XS-单件',
			num: 5,
			max_buy: 3,
			price: 56.9,
			salePrice: 54,
			tip: '当前可省10元',
			img: 'https://gw.alicdn.com/bao/uploaded/i3/2328862868/O1CN01UBMJfy1X3af4Lc3ME_!!2328862868.jpg'
		},
		{
			id: 'b-b-a',
			title: '黑色-S-套装',
			num: 0,
			max_buy: 3,
			price: 56.9,
			salePrice: 54,
			tip: '当前可省10元',
			img: 'https://gw.alicdn.com/bao/uploaded/i1/2328862868/O1CN01b5pglN1X3ahprbU9P_!!2328862868.jpg'
		},
		{
			id: 'b-b-b',
			title: '黑色-S-单件',
			num: 5,
			max_buy: 3,
			price: 56.9,
			salePrice: 54,
			tip: '当前可省10元',
			img: 'https://gw.alicdn.com/bao/uploaded/i1/TB1fw40oAvoK1RjSZPfSutPKFXa.jpg'
		}
	]
})

const num = ref(2)
function buy(e: any) {
	console.log(e)
}
const store = useTmpiniaStore()
store.setTmVuetifyAddTheme('luse','#2B9939')
const wall = ref<InstanceType<typeof tmWaterfall> | null>(null)
const tabsTitle = ref([
	{ key: '1', title: '全部', icon: 'tmicon-ios-leaf' },
	{ key: '2', title: '男装', icon: 'tmicon-ios-umbrella' },
    { key: '3', title: '女装', dot: true, dotColor: 'yellow', icon: 'tmicon-ios-rocket' },
	{ key: '4', title: '童装', dot: false, count: '3', icon: 'tmicon-ios-partly-sunny' },
	{ key: '5', title: '冲锋衣', dot: true, dotColor: 'yellow', icon: 'tmicon-ios-rocket' },
	{ key: '6', title: '羽绒服', dot: false, count: '3', icon: 'tmicon-ios-partly-sunny' }
])
const listimg2 = [
	{url:'https://store.tmui.design/api_v2/public/random_picture?row=1&random=12',text:"测试提醒语信息"},
	{url:'https://store.tmui.design/api_v2/public/random_picture?row=1&random=12',text:"南昌红谷滩区."},
]
const imglist = ref([
	{
		img: 'https://gw.alicdn.com/bao/uploaded/i2/1848622920/O1CN018zBHJ91XRPJ4bHW78_!!0-item_pic.jpg_320x320q90.jpg',
		text: '杨大爷麻辣香肠腊肠500克四川特产烟熏肉农家自制川味烤腊肉辣肠',
		price: '49',
		num: '3000+'
	},
	{
		img: 'https://gw.alicdn.com/imgextra/i4/2207613550143/O1CN01hPpOvy1CvXQdlZLeC_!!2207613550143-0-alimamacc.jpg_q90.jpg',
		text: '',
		price: '200',
		num: '3000+'
	},
	{
		img: 'https://gw.alicdn.com/bao/uploaded/i4/14498052/O1CN01pa6ScB29LrgfkRp8V_!!14498052.jpg_320x320q90.jpg',
		text: '带盖 酸奶杯一次性塑料布丁杯胖胖pp果冻杯慕斯甜品杯双皮奶100套',
		price: '12.8',
		num: '1500+'
	},
	{
		img: 'https://images.pexels.com/photos/12640459/pexels-photo-12640459.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
		text: '带盖 酸奶杯一次性塑料布丁杯胖胖pp果冻杯慕斯甜品杯双皮奶100套',
		price: '12.8',
		num: '1500+'
	},
	{
		img: 'https://gw.alicdn.com/bao/uploaded/i4/1026973813/O1CN014Kirba1e2OrHg7gwN_!!1026973813.jpg_320x320q90.jpg',
		text: '带盖 酸奶杯一次性塑料布丁杯胖胖pp果冻杯慕斯甜品杯双皮奶100套',
		price: '12.8',
		num: '1500+'
	},
	{
		img: 'https://gw.alicdn.com/imgextra/i3/23844911/O1CN01N1UxMS1m9Hs6gGu6E_!!23844911-0-alimamacc.jpg',
		text: '',
		price: '200',
		num: '3000+'
	},
	{
		img: 'https://gw.alicdn.com/bao/uploaded/i4/2418392409/O1CN01zT4JbA1TfMoU30Uub_!!2418392409.jpg_320x320q90.jpg',
		text: '50枚挂耳咖啡滤袋日本材质手冲咖啡滤纸咖啡粉滤袋挂耳咖啡袋包邮',
		price: '12.8',
		num: '1500+'
	},
	{
		img: 'https://gw.alicdn.com/bao/uploaded/i2/6000000001207/O1CN016TztFg1Kmqqrtarb0_!!6000000001207-0-picassoopen.jpg_320x320q90.jpg',
		text: '带盖 酸奶杯一次性塑料布丁杯胖胖pp果冻杯慕斯甜品杯双皮奶100套',
		price: '12.8',
		num: '1500+'
	},
	{
		img: 'https://gw.alicdn.com/bao/uploaded/i3/2200531292142/O1CN01gFUdOw1Rh4vjN44sB_!!0-item_pic.jpg_320x320q90.jpg',
		text: '带盖 酸奶杯一次性塑料布丁杯胖胖pp果冻杯慕斯甜品杯双皮奶100套',
		price: '12.8',
		num: '1500+'
	}
])

const itemClick=()=> {
	uni.navigateTo({
		url: 'tree'
	})
}
</script>