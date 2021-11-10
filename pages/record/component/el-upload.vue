<template>

  <view class="form-group-to" v-show="!cur.__config__.hidden">
    <template v-if="cur['list-type'] === 'picture-card'">
        <view class="cu-bar bg-white margin-top">
          <view class="action flex"><view class="text-red margin-sright" v-if="cur.__config__.required">*</view>{{ cur.__config__.label || '图片上传'}}</view>
          <view class="action">{{imgList.length}}/4</view>
        </view>
        <view class="cu-form-group">
          <view class="grid col-4 grid-square flex-sub">
            <view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
            <image :src="imgList[index]" mode="aspectFill"></image>
              <view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
                <text class='cuIcon-close'></text>
              </view>
            </view>
            <view class="solids" @tap="ChooseImage" v-if="!cur.disabled && imgList.length<4">
              <text class='cuIcon-cameraadd'></text>
            </view>
          </view>
        </view>
    </template>
    <template v-if="cur['list-type'] === 'text'">
        <l-file ref="lFile" @up-success="onSuccess"></l-file>
        <view class="cu-bar bg-white margin-top">
          <view class="action flex"><view class="text-red margin-sright" v-if="cur.__config__.required">*</view>{{ cur.__config__.label || '文件上传'}}</view>
          <view class="action">{{imageValue.length}}/4</view>
        </view>
        <view class="cu-form-group" style="flex-direction: column;">
          <view class="grid col-4 grid-square flex-sub" style="width: 100%; ">
            <view style="width: 100%;padding-bottom: 40upx;" class="my-box" v-for="(item,index) in imageValue" :key="index" :data-url="imageValue[index]">
              <view >{{item.name}}</view>
              <view class="cu-tag bg-red" style="borderRadius:6upx;" @tap.stop="DelImgtext" :data-index="index" v-if="!cur.disabled">
                <text class='cuIcon-close'></text>
              </view>
              <view class="cu-tag bg-red" style="borderRadius:6upx;" @tap.stop="downloadFile(item)" :data-index="index" v-else>
                <text class='cuIcon-right'></text>
              </view>
            </view>
          </view>
          <view style="width: 100%;" v-if="!cur.disabled && imageValue.length<4"> 
            <button style="width: 200upx;" @tap="onUpload" class="cu-btn block bg-blue margin-tb-sm" type="">选择文件</button>
          </view>
        </view>
    </template>
  </view>
</template>

<script>
import baseURL from '@/config/index'
import { authorPre, arrType, produceCode, appCode, appVersion, terminalType } from '@/config/headers';

export default {
  props: {
    cur: {
      type: Object,
      default: () => {
        return {};
      },
    },
    value: {
      default: undefined,
    },
  },

  data() {
    return {
      imgList: [], // 图片展示
	    // imageValue:[] // 其他文件格式展示
    };
  },

  computed:{
    imageValue:{
      get(){
        let arr = []
        if(this.cur['file-list'] && Array.isArray(this.cur['file-list']) && this.cur['file-list'].length > 0){
          arr = this.cur['file-list']
          return arr
        } else {
          arr = this.cur.__config__.defaultValue || []
          return arr.map(e=>{
            return {
              name: this.fileName(e),
              url: e
            }
          }) 
        }


      },
      set(val){
        console.log(val);
      }
    }
  },

  mounted() {
    
    if(this.cur['list-type'] === 'picture-card'){
      this.imgList = this.cur.__config__.defaultValue || []
    }
  },

  methods: {
    // s=普通图片上传
    ChooseImage() {
      uni.chooseImage({
        count: 4, //默认9
        sizeType: ["original", "compressed"], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album"], //从相册选择
        success: (res) => {
          // h5 无法多图上传(只能遍历上传)
          for(let i = 0; i < res.tempFiles.length; i++) {
							if (res.tempFiles[i].size / 1024 / 1024 > 5){
								uni.showToast({
									title: '第' + i+1 + '张图片大小超过5M',
									icon: 'none'
								})
							}else{
								this.uploadImage(res.tempFiles[i].path, res.tempFiles[i])
							}
						}
        },
      });
    },

    uploadImage(images, imagesres){
      var that = this;
      const { action } = this.cur
      this.$loading(true)
      uni.uploadFile({
					url: baseURL + action,
					filePath: images,
					name: 'file',
					formData: {
						"file": images,
					},
					header:{
            "Content-Type": "multipart/form-data",
            "Authorization": uni.getStorageSync('token'),
            'Produce-Code': produceCode,
            'App-Code': appCode,
						"App-Type": arrType,
            'App-Version': appVersion,
            'Terminal-Type': terminalType,
          },
					success: function (res) {
            that.$loading(false)

						var data = JSON.parse(res.data);
						//服务器返回格式: { "Catalog": "testFolder", "FileName": "1.jpg", "Url": "https://test.com/1.jpg" }
            if(data.code == 200){
              that.imgList.push(data.data.path);

              that.$emit('input', that.imgList )
              that.$set(that.cur.__config__, 'defaultValue', that.imgList)
              that.$set(that.cur, 'file-list', that.imgList.map(e=>{

                /* 规定格式 其中 uid必须有
                  name: "2108300846155175_unload_1.png"
                  percentage: 100
                  raw: File
                  response: {code: 200, msg: '上传成功', data: {…}}
                  size: 97461
                  status: "success"
                  uid: 1635502877082
                  url: "blob:http://localhost:81/544faf88-84c2-4181-a80c-df32cdf28fb2"
                */

                return {
                  name: that.fileName(e),
                  uid: Date.now(),
                  size: imagesres.size,
                  url: e
                }
              }))

            } else {
              uni.showModal({
                title: '错误提示',
                content: data.code + data.msg,
                showCancel: false,
              })
            }
					},
					fail: function (res) {
						that.$loading(false)
						uni.showModal({
							title: '错误提示',
							content: '上传图片失败',
							showCancel: false,
							success: function (res) { }
						})
					}
				});
    },

    // 查看图片
    ViewImage(e) {
      uni.previewImage({
        urls: this.imgList,
        current: e.currentTarget.dataset.url,
      });
    },
    // 删除图片
    DelImg(e) {
      uni.showModal({
        title: "提示",
        content: "确定要删除图片？",
        cancelText: "取消",
        confirmText: "确定",
        success: (res) => {
          if (res.confirm) {
            this.imgList.splice(e.currentTarget.dataset.index, 1);
          }
        },
      });
    },
    // e=

    /* s= 上传 */
    // 删除文件
    DelImgtext(e) {
      uni.showModal({
        title: "提示",
        content: "确定要删除图片？",
        cancelText: "取消",
        confirmText: "确定",
        success: (res) => {
          if (res.confirm) {
            this.imageValue.splice(e.currentTarget.dataset.index, 1);
          }
        },
      });
    },

    onUpload() { 
      this.$refs.lFile.upload({
        // #ifdef APP-PLUS
        currentWebview: this.$mp.page.$getAppWebview(),
        // #endif
        //非真实地址，记得更换
        url: baseURL + this.cur.action,
        //默认file,上传文件的key
        name: 'file',
        header:{
            // "Content-Type": "multipart/form-data",
            "Authorization": uni.getStorageSync('token'),
            'Produce-Code': produceCode,
            'App-Code': appCode,
						"App-Type": arrType,
            'App-Version': appVersion,
            'Terminal-Type': terminalType,
        },
        // header: {'Content-Type':'类型','Authorization':'token'},
        //...其他参数
      });
    },
    onSuccess(res) {
      
      if(res.code == 200){
        const that = this
        // 新添加的
        const obj = {
          name: res.fileName,
          url: res.data.path,
          uid:  Date.now(),
          size: res.size
        }

        this.imageValue.push(obj)

        // file-list 和 defaultValue 都使用到监听了, 所以数据赋值顺序有规定
        that.$set(that.cur, 'file-list', this.imageValue.map((e, index)=>{
                return {
                  name: e.name,
                  uid: e.uid || Date.now() + index,
                  size: e.size ,
                  url: e.url
                }
              })
        )

        const defaultValue = this.imageValue.map(e=> e.url)
        
        this.$emit('input', defaultValue)

        this.$set(this.cur.__config__, 'defaultValue', defaultValue)


      } else {
        uni.showModal({
          title: '错误提示',
          content: data.code + data.msg,
          showCancel: false,
        })
      }
      this.$loading(false)
    },

    // 下载文件
    downloadFile(row){
      console.log(row, '点击查看, h5页面查看~~');
	  
		//#ifdef APP-PLUS
        uni.downloadFile({
          url: row.url,
          success: function (res) {
            var filePath = res.tempFilePath;
            uni.openDocument({
              filePath: filePath,
              success: function (res) {
				  console.log(res, '打开成功');
			  },
			  fail: (err)=>{
				console.log(err);
			  }
            });
          }
        });
		//#endif
    },
    // e=

    fileName(path){
      if(!path) return ''
      let fileName = path
      if(path.indexOf('/') > 0) {
        fileName = path.substring(path.lastIndexOf('/')+1, path.length)
      }
      return fileName
    }
  },
};
</script>
