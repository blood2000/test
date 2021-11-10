const store = {
    state: {
		isLogin: false,
		userInfo: {}
    },
    getters: {
		
    },
    mutations: {
		login(state, provider) {
			state.isLogin = true;
			state.userInfo = provider;
			console.log(state.userInfo);
		},
		logout(state) {
			state.isLogin = false;
			state.userInfo = {};
			uni.removeStorage({  
		        key: 'userInfo'  
		    })
		}
    },
    actions: {
    }
}
export default store