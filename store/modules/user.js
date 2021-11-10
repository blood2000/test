
const user = {
  state: {
    info: {user: uni.getStorageSync('userInfo')},
    nickName: uni.getStorageSync('userInfo').nickName
  },

  mutations: {
    SET_INFO: (state, info) => {
      state.info = { 
        user: info 
      };
    },
    SET_NICKNAME:(state, nickName) =>{
      console.log(nickName);
      state.nickName = nickName
    } 
  },

  actions: {
    
  }
};

export default user;
