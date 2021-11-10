
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/public/applogin","pages/index/index","pages/index/search","pages/mailList/index","pages/user/index","pages/public/login","pages/public/auth","pages/test/test","pages/register/index","pages/mailList/userList","pages/mailList/userInfo","pages/clock/index","pages/upcoming/index","pages/flowable/index","pages/record/index","pages/clock/apply","pages/clock/clockRule","pages/clock/range","pages/clock/summary","pages/user/userInfo","pages/user/feedback","pages/applicate/index","pages/applicate/notificationCenter/website/index","pages/applicate/notificationCenter/website/detail","pages/applicate/notificationCenter/notice/index","pages/data/index","pages/applicate/daily/index"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"超好运","navigationBarBackgroundColor":"#fff","backgroundColor":"#F5F5F5","onReachBottomDistance":100,"rpxCalcBaseDeviceWidth":1024},"tabBar":{"color":"#ACACAC","selectedColor":"#1678FF","backgroundColor":"#FFFFFF","borderStyle":"white","list":[{"pagePath":"pages/upcoming/index","iconPath":"static/tabbar/upcoming.png","selectedIconPath":"static/tabbar/upcoming_cur.png","text":"待办"},{"pagePath":"pages/applicate/index","iconPath":"static/tabbar/app.png","selectedIconPath":"static/tabbar/app_cur.png","text":"应用"},{"pagePath":"pages/mailList/index","iconPath":"static/tabbar/mail.png","selectedIconPath":"static/tabbar/mail_cur.png","text":"通讯录"},{"pagePath":"pages/user/index","iconPath":"static/tabbar/my.png","selectedIconPath":"static/tabbar/my_cur.png","text":"我的"}],"midButton":{"width":"75px","height":"60px","iconPath":"static/tabbar/work.png","iconWidth":"40px"}},"networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000},"nvueCompiler":"uni-app","nvueStyleCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"至简协同","compilerVersion":"3.2.12","entryPagePath":"pages/public/applogin"};
var __uniRoutes = [{"path":"/pages/public/applogin","meta":{"isQuit":true},"window":{"navigationBarTitleText":"登录","navigationStyle":"custom"}},{"path":"/pages/index/index","meta":{},"window":{"navigationBarTitleText":"工作台","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/index/search","meta":{},"window":{"navigationBarTitleText":"搜索","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/mailList/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"通讯录","enablePullDownRefresh":false}},{"path":"/pages/user/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的","enablePullDownRefresh":false}},{"path":"/pages/public/login","meta":{},"window":{"navigationBarTitleText":"登录","enablePullDownRefresh":false}},{"path":"/pages/public/auth","meta":{},"window":{"navigationBarTitleText":"授权登录","enablePullDownRefresh":false}},{"path":"/pages/test/test","meta":{},"window":{"navigationBarTitleText":"测试用","enablePullDownRefresh":false}},{"path":"/pages/register/index","meta":{},"window":{"navigationBarTitleText":"注册","navigationStyle":"custom"}},{"path":"/pages/mailList/userList","meta":{},"window":{"navigationBarTitleText":"通讯录用户","navigationStyle":"custom"}},{"path":"/pages/mailList/userInfo","meta":{},"window":{"navigationBarTitleText":"用户信息","enablePullDownRefresh":false}},{"path":"/pages/clock/index","meta":{},"window":{"navigationBarTitleText":"打卡","enablePullDownRefresh":false}},{"path":"/pages/upcoming/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"待办","enablePullDownRefresh":true}},{"path":"/pages/flowable/index","meta":{},"window":{"navigationBarTitleText":"申请","enablePullDownRefresh":false}},{"path":"/pages/record/index","meta":{},"window":{"navigationBarTitleText":"详情","enablePullDownRefresh":false}},{"path":"/pages/clock/apply","meta":{},"window":{"navigationBarTitleText":"申请","enablePullDownRefresh":false}},{"path":"/pages/clock/clockRule","meta":{},"window":{"navigationBarTitleText":"考勤规则","enablePullDownRefresh":false}},{"path":"/pages/clock/range","meta":{},"window":{"navigationBarTitleText":"考勤范围","enablePullDownRefresh":false}},{"path":"/pages/clock/summary","meta":{},"window":{"navigationBarTitleText":"统计汇总","enablePullDownRefresh":false}},{"path":"/pages/user/userInfo","meta":{},"window":{"navigationBarTitleText":"我的信息","enablePullDownRefresh":false}},{"path":"/pages/user/feedback","meta":{},"window":{"navigationBarTitleText":"产品反馈","enablePullDownRefresh":false}},{"path":"/pages/applicate/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"应用中心","enablePullDownRefresh":false}},{"path":"/pages/applicate/notificationCenter/website/index","meta":{},"window":{"navigationBarTitleText":"官网新闻","enablePullDownRefresh":true}},{"path":"/pages/applicate/notificationCenter/website/detail","meta":{},"window":{"navigationBarTitleText":"新闻详情","titleNView":{"type":"transparent"}}},{"path":"/pages/applicate/notificationCenter/notice/index","meta":{},"window":{"navigationBarTitleText":"通知公告","enablePullDownRefresh":true}},{"path":"/pages/data/index","meta":{},"window":{"navigationBarTitleText":"报表","enablePullDownRefresh":false}},{"path":"/pages/applicate/daily/index","meta":{},"window":{"navigationBarTitleText":"日报","enablePullDownRefresh":false}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
