class cache {
	//存储在本地缓存指定的name中
	setCache(name: string, data: any) {
		try {
			uni.setStorageSync(name, data);
		} catch (e) {
			console.log(e)
		}
	}
 
	//从本地缓存中读取置顶name对应的内容
	getCache(name: string) {
		let data;
		try {
			data = uni.getStorageSync(name);
		} catch (e) {
			console.log(e);
		}
		return data;
	}
 
	//从本地缓存中移出指定key
	removeCache(name: string) {
		try {
			uni.removeStorageSync(name);
		} catch (e) {
			//TODO handle the exception
			console.log(e);
		}
	}
 
	//返回一个布尔值,表示name是否在本地缓存之中
	checkCache(name: string) {
		let value;
		try {
			const res = uni.getStorageInfoSync()
			value = res.keys.includes(name)
		} catch (e) {
			console.log(e)
		}
		return value
	}
	
	//清除本地数据缓存
	clearCache(){
		try{
			uni.clearStorageSync();
		}catch(e){
			console.log(e)
		}
	}
}
const caches = new cache()
export default caches;