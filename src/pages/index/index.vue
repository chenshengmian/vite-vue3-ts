<template>
	<tm-app>
		<tm-sheet>
			<block v-if="acc==0">
				<Homepage/>
			</block>
			<block v-else-if="acc==1">
				<Shoppingcart/>
			</block>
			<block v-else-if="acc==2">
				<PersonalCenter/>
			</block>
		</tm-sheet>
		<tm-tabbar :autoSelect="false" v-model:active="acc" >
			<block v-for="(item,id) in tabbarArr" :key="id">
				<tm-tabbar-item
					@click="changeAcc(item.acc)"
					activeColor="blue"
					:text="item.name"
					:icon="item.icon"
					:unicon="item.unicon"
				></tm-tabbar-item>
			</block>
		</tm-tabbar>
	</tm-app>
</template>

<script lang="ts" setup>
	import { ref, getCurrentInstance, onMounted, Ref, inject } from 'vue';
	import { onShow, onLoad } from "@dcloudio/uni-app";
	import tmApp from "@/tmui/components/tm-app/tm-app.vue";
	import tmTabbar from "@/tmui/components/tm-tabbar/tm-tabbar.vue";
	import tmTabbarItem from "@/tmui/components/tm-tabbar-item/tm-tabbar-item.vue";
	import ShoppingCart from '@/components/Shoppingcart/Shoppingcart.vue'
	import HomePage from '@/components/Homepage/Homepage.vue'
	import PersonalCenter from '@/components/PersonalCenter/PersonalCenter.vue'
	const { proxy } = getCurrentInstance()
	const acc: Ref<number> = ref(0)
	if(!proxy.$caches.getCache('acc')){
		acc.value = 0
	}else{
		acc.value = proxy.$caches.getCache('acc')
	}

	onShow(()=>{
		getacc()
	})
	
	const getacc = () =>{
		if(acc.value == 0 ){
			uni.setNavigationBarTitle({
				title : '首页'
			})
		}else if(acc.value == 1){
			uni.setNavigationBarTitle({
				title : '购物车'
			})
		}else if(acc.value == 2){
			uni.setNavigationBarTitle({
				title : '个人中心'
			})
		}
	}

	const changeAcc = (i:number) =>{
		acc.value = i
		proxy.$caches.setCache('acc',i)
		getacc()
	}

	const tabbarArr = ref([
		{id:1,name:'首页',unicon:'tmicon-home',icon:'tmicon-md-home',acc:0},
		{id:2,name:'购物车',unicon:'tmicon-shoppingcart',icon:'tmicon-shopping-cart-fill',acc:1},
		{id:3,name:'个人中心',unicon:'tmicon-account',icon:'tmicon-md-person',acc:2},
	])
</script>