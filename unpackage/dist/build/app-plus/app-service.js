(this["webpackJsonp"]=this["webpackJsonp"]||[]).push([["app-service"],{"0de9":function(t,e,n){"use strict";function i(t){var e=Object.prototype.toString.call(t);return e.substring(8,e.length-1)}function a(){return"string"===typeof __channelId__&&__channelId__}function r(t,e){switch(i(e)){case"Function":return"function() { [native code] }";default:return e}}function o(t){for(var e=arguments.length,n=new Array(e>1?e-1:0),i=1;i<e;i++)n[i-1]=arguments[i];console[t].apply(console,n)}function s(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];var o=e.shift();if(a())return e.push(e.pop().replace("at ","uni-app:///")),console[o].apply(console,e);var s=e.map((function(t){var e=Object.prototype.toString.call(t).toLowerCase();if("[object object]"===e||"[object array]"===e)try{t="---BEGIN:JSON---"+JSON.stringify(t,r)+"---END:JSON---"}catch(a){t=e}else if(null===t)t="---NULL---";else if(void 0===t)t="---UNDEFINED---";else{var n=i(t).toUpperCase();t="NUMBER"===n||"BOOLEAN"===n?"---BEGIN:"+n+"---"+t+"---END:"+n+"---":String(t)}return t})),u="";if(s.length>1){var c=s.pop();u=s.join("---COMMA---"),0===c.indexOf(" at ")?u+=c:u+="---COMMA---"+c}else u=s[0];console[o](u)}n.r(e),n.d(e,"log",(function(){return o})),n.d(e,"default",(function(){return s}))},"11b8":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={name:"tuiTag",emits:["click"],props:{type:{type:String,default:"primary"},padding:{type:String,default:"16rpx 26rpx"},margin:{type:String,default:"0"},size:{type:String,default:"28rpx"},shape:{type:String,default:"square"},plain:{type:Boolean,default:!1},hover:{type:Boolean,default:!1},scaleMultiple:{type:Number,default:1},originLeft:{type:Boolean,default:!1},originRight:{type:Boolean,default:!1},index:{type:Number,default:0}},methods:{handleClick:function(){this.$emit("click",{index:this.index})},getTypeClass:function(t,e){return e?"tui-"+t+"-outline":"tui-"+t},getClassName:function(t,e){var n=e?"tui-tag-outline ":"";return"square"!=t&&("circle"==t?n+=e?"tui-tag-outline-fillet":"tui-tag-fillet":"circleLeft"==t?n+="tui-tag-fillet-left":"circleRight"==t&&(n+="tui-tag-fillet-right")),n}}};e.default=i},"1c2b":function(t,e,n){"use strict";n.r(e);var i=n("c003"),a=n("e151");for(var r in a)["default"].indexOf(r)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(r);var o=n("f0c5"),s=Object(o["a"])(a["default"],i["b"],i["c"],!1,null,"5fe332a5",null,!1,i["a"],void 0);e["default"]=s.exports},"1e5a":function(t,e,n){"use strict";n.r(e);var i=n("c2b6"),a=n("2540");for(var r in a)["default"].indexOf(r)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(r);var o=n("f0c5"),s=Object(o["a"])(a["default"],i["b"],i["c"],!1,null,"7566e01a",null,!1,i["a"],void 0);e["default"]=s.exports},2540:function(t,e,n){"use strict";n.r(e);var i=n("70ed"),a=n.n(i);for(var r in i)["default"].indexOf(r)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(r);e["default"]=a.a},2857:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={name:"tuiButton",emits:["click","getuserinfo","contact","getphonenumber","error"],behaviors:["wx://form-field-button"],props:{type:{type:String,default:"primary"},shadow:{type:Boolean,default:!1},width:{type:String,default:"100%"},height:{type:String,default:"96rpx"},size:{type:Number,default:32},bold:{type:Boolean,default:!1},margin:{type:String,default:"0"},shape:{type:String,default:"square"},plain:{type:Boolean,default:!1},link:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},disabledGray:{type:Boolean,default:!1},loading:{type:Boolean,default:!1},formType:{type:String,default:""},openType:{type:String,default:""},index:{type:[Number,String],default:0},preventClick:{type:Boolean,default:!1}},data:function(){return{time:0}},methods:{handleClick:function(){var t=this;if(!this.disabled){if(this.preventClick){if((new Date).getTime()-this.time<=200)return;this.time=(new Date).getTime(),setTimeout((function(){t.time=0}),200)}this.$emit("click",{index:Number(this.index)})}},bindgetuserinfo:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.detail,n=void 0===e?{}:e;this.$emit("getuserinfo",n)},bindcontact:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.detail,n=void 0===e?{}:e;this.$emit("contact",n)},bindgetphonenumber:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.detail,n=void 0===e?{}:e;this.$emit("getphonenumber",n)},binderror:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.detail,n=void 0===e?{}:e;this.$emit("error",n)},getShadowClass:function(t,e,n){var i="";return e&&"white"!=t&&!n&&(i="tui-shadow-"+t),i},getDisabledClass:function(t,e,n){var i="";if(t&&"white"!=e&&-1==e.indexOf("-")){var a=this.disabledGray?"tui-gray-disabled":"tui-dark-disabled";i=n?"tui-dark-disabled-outline":a}return i},getShapeClass:function(t,e){var n="";return"circle"==t?n=e?"tui-outline-fillet":"tui-fillet":"rightAngle"==t&&(n=e?"tui-outline-rightAngle":"tui-rightAngle"),n},getHoverClass:function(t,e,n){var i="";return t||(i=n?"tui-outline-hover":"tui-"+(e||"primary")+"-hover"),i}}};e.default=i},"30f8":function(t,e,n){"use strict";var i=n("4ea4"),a=i(n("9523"));n("5b09"),n("33db");var r=i(n("a499")),o=i(n("8bbf"));function s(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,i)}return n}o.default.config.productionTip=!1,r.default.mpType="app";var u=new o.default(function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?s(Object(n),!0).forEach((function(e){(0,a.default)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}({},r.default));u.$mount()},"33db":function(t,e,n){var i=n("ed6d"),a=n("6b58"),r=n("36c6"),o=n("970b"),s=n("5bc3"),u=n("7037"),c=n("9523");function l(t){var e=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,i=r(t);if(e){var o=r(this).constructor;n=Reflect.construct(i,arguments,o)}else n=i.apply(this,arguments);return a(this,n)}}var f=uni.getSystemInfoSync(),p="https://tongji.dcloud.io/uni/stat",d="__UNI__ED98F15",_=function(t,e){var n=uni.getStorageSync("$$STAT__DBDATA:"+d)||{};n||(n={}),n[t]=e,uni.setStorageSync("$$STAT__DBDATA:"+d,n)},h=function(t){var e=uni.getStorageSync("$$STAT__DBDATA:"+d)||{};if(!e[t]){var n=uni.getStorageSync("$$STAT__DBDATA:"+d);if(n||(n={}),!n[t])return;e[t]=n[t]}return e[t]},v=function(t){var e=uni.getStorageSync("$$STAT__DBDATA:"+d)||{};e[t]?(delete e[t],uni.setStorageSync("$$STAT__DBDATA:"+d,e)):(e=uni.getStorageSync("$$STAT__DBDATA:"+d),e[t]&&(delete e[t],uni.setStorageSync("$$STAT__DBDATA:"+d,e)))},g={enable:!0,version:"1"},y={},m=n("de71").default,b=m.pages;for(var S in b){var x,w=b[S],T=w.navigationBarTitleText||w.defaultTitle||(null===(x=w.navigationBar)||void 0===x?void 0:x.titleText)||"";T&&(y[S]=T)}function $(){var t="";if("n"===D()){try{t=plus.runtime.getDCloudId()}catch(e){t=""}return t}try{t=uni.getStorageSync("__DC_STAT_UUID")}catch(e){t="__DC_UUID_VALUE"}if(!t){t=Date.now()+""+Math.floor(1e7*Math.random());try{uni.setStorageSync("__DC_STAT_UUID",t)}catch(e){uni.setStorageSync("__DC_STAT_UUID","__DC_UUID_VALUE")}}return t}var k={appid:"__UNI__ED98F15"},D=function(){var t,e=(t={app:"n","app-plus":"n",h5:"h5","mp-weixin":"wx"},c(t,["y","a","p","mp-ali"].reverse().join(""),"ali"),c(t,"mp-baidu","bd"),c(t,"mp-toutiao","tt"),c(t,"mp-qq","qq"),c(t,"quickapp-native","qn"),c(t,"mp-kuaishou","ks"),c(t,"mp-lark","lark"),c(t,"quickapp-webview","qw"),t);if("ali"===e["app-plus"]&&my&&my.env){var n=my.env.clientName;if("ap"===n)return"ali";if("dingtalk"===n)return"dt"}return e["app-plus"]},A=function(t){var e=D(),n="";return t||("wx"===e&&(n=uni.getLaunchOptionsSync().scene),n)},C=function(t){var e=t||I();if("bd"===D()){var n=e.$mp&&e.$mp.page&&e.$mp.page.is,i=e.$scope&&e.$scope.is;return n||i||""}return e.route||e.$scope&&e.$scope.route||e.$mp&&e.$mp.page.route},O=function(t){var e=t&&(t.$page||t.$scope&&t.$scope.$page),n=uni.getStorageSync("_STAT_LAST_PAGE_ROUTE");return e?"/"===e.fullPath?e.route:e.fullPath||e.route:n||""},I=function(){var t=getCurrentPages(),e=t[t.length-1];return e?e.$vm:null},q=function(t){return"page"===t.mpType||"page"===t.$mpType||t.$mp&&"page"===t.$mp.mpType||"page"===t.$options.mpType?"page":"app"===t.mpType||"app"===t.$mpType||t.$mp&&"app"===t.$mp.mpType||"app"===t.$options.mpType?"app":null},P=function(t){var e=[],n=[],i=[],a=function(a){var r=t[a];r.forEach((function(t){var r;r=function(t){var e="";for(var n in t)e+=n+"="+t[n]+"&";return e.substr(0,e.length-1)}(t),0===a?e.push(r):3===a?i.push(r):n.push(r)}))};for(var r in t)a(r);return e.push.apply(e,n.concat(i)),JSON.stringify(e)},R=function(t){return y&&y[t]||""},E=function(t){var e={usv:"3.7.3",conf:JSON.stringify({ak:"__UNI__ED98F15"})};uni.request({url:p,method:"GET",data:e,success:function(e){var n=e.data;0===n.ret&&"function"===typeof t&&t({enable:n.enable})},fail:function(e){var n=1;try{n=uni.getStorageSync("Report_Status")}catch(e){n=1}""===n&&(n=1),"function"===typeof t&&t({enable:n})}})},j=function(){return parseInt((new Date).getTime()/1e3)},B=function(){var t=h("__first__visit__time"),e=0;return t?e=t:(e=j(),_("__first__visit__time",e),v("__last__visit__time")),e},N=0,U=0,M=function(){return N=j(),_("__page__residence__time",N),N},L=function(){var t=h("__total__visit__count"),e=1;return t&&(e=t,e++),_("__total__visit__count",e),e},H=function(){var t=j(),e=_("__first_time",t);return e},z=function(t){var e=0,n=h("__first_time"),i=j();if(0!==n&&(e=i-n),e=e<1?1:e,"app"===t){var a=e>300;return{residenceTime:e,overtime:a}}if("page"===t){var r=e>1800;return{residenceTime:e,overtime:r}}return{residenceTime:e}},G=function(t){var e=g.reportInterval;if(0===Number(e))return 0;e=e||t;return/(^[1-9]\d*$)/.test(e)?Number(e):t}(10),J={uuid:function(t){return f.deviceId||$()}(),ak:k.appid,p:"android"===f.platform?"a":"i",ut:D(),mpn:function(){var t="";return"wx"!==D()&&"qq"!==D()||uni.canIUse("getAccountInfoSync")&&(t=uni.getAccountInfoSync().miniProgram.appId||""),D(),t}(),usv:"3.7.3",v:function(){return"n"===D()?plus.runtime.version:""}(),ch:function(){var t=D(),e="";return"n"===t&&(e=plus.runtime.channel),e}(),cn:"",pn:"",ct:"",t:j(),tt:"",brand:f.brand||"",md:f.model,sv:f.system.replace(/(Android|iOS)\s/,""),mpsdk:f.SDKVersion||"",mpv:f.version||"",lang:f.language,pr:f.pixelRatio,ww:f.windowWidth,wh:f.windowHeight,sw:f.screenWidth,sh:f.screenHeight},F=function(){"use strict";function t(){o(this,t),this.self="",this.__licationShow=!1,this.__licationHide=!1,this.statData=J,this._navigationBarTitle={config:"",page:"",report:"",lt:""},this._query={};var e="function"===typeof uni.addInterceptor;e&&(this.addInterceptorInit(),this.interceptLogin(),this.interceptShare(!0),this.interceptRequestPayment())}return s(t,[{key:"addInterceptorInit",value:function(){var t=this;uni.addInterceptor("setNavigationBarTitle",{invoke:function(e){t._navigationBarTitle.page=e.title}})}},{key:"interceptLogin",value:function(){var t=this;uni.addInterceptor("login",{complete:function(){t._login()}})}},{key:"interceptShare",value:function(t){var e=this;t?uni.addInterceptor("share",{success:function(){e._share()},fail:function(){e._share()}}):e._share()}},{key:"interceptRequestPayment",value:function(){var t=this;uni.addInterceptor("requestPayment",{success:function(){t._payment("pay_success")},fail:function(){t._payment("pay_fail")}})}},{key:"_login",value:function(){this.sendEventRequest({key:"login"},0)}},{key:"_share",value:function(){this.sendEventRequest({key:"share"},0)}},{key:"_payment",value:function(t){this.sendEventRequest({key:t},0)}},{key:"applicationShow",value:function(){if(this.__licationHide){var t=z("app");if(t.overtime){var e=uni.getStorageSync("_STAT_LAST_PAGE_ROUTE"),n={path:e,scene:this.statData.sc,cst:2};this.sendReportRequest(n)}this.__licationHide=!1}}},{key:"applicationHide",value:function(t,e){t||(t=I()),this.__licationHide=!0;var n=z(),i=O(t);uni.setStorageSync("_STAT_LAST_PAGE_ROUTE",i),this.sendHideRequest({urlref:i,urlref_ts:n.residenceTime},e),H()}},{key:"pageShow",value:function(t){this._navigationBarTitle={config:"",page:"",report:"",lt:""};var e=O(t),n=C(t);if(this._navigationBarTitle.config=R(n),this.__licationShow)return H(),uni.setStorageSync("_STAT_LAST_PAGE_ROUTE",e),void(this.__licationShow=!1);var i=z("page");if(i.overtime){var a={path:e,scene:this.statData.sc,cst:3};this.sendReportRequest(a)}H()}},{key:"pageHide",value:function(t){if(!this.__licationHide){var e=z("page"),n=O(t),i=uni.getStorageSync("_STAT_LAST_PAGE_ROUTE");return i||(i=n),uni.setStorageSync("_STAT_LAST_PAGE_ROUTE",n),void this.sendPageRequest({url:n,urlref:i,urlref_ts:e.residenceTime})}}},{key:"sendReportRequest",value:function(t,e){this._navigationBarTitle.lt="1",this._navigationBarTitle.config=R(t.path);var n=t.query&&"{}"!==JSON.stringify(t.query),i=n?"?"+JSON.stringify(t.query):"",a=function(){var t=h("__last__visit__time"),e=0;return t&&(e=t),_("__last__visit__time",j()),e}();if(0!==a||!a){var r=function(t){var e="";if("n"===D()){try{e=plus.device.uuid}catch(n){e=""}return e}return f.deviceId||$()}();this.statData.odid=r}Object.assign(this.statData,{lt:"1",url:t.path+i||"",t:j(),sc:A(t.scene),fvts:B(),lvts:a,tvc:L(),cst:t.cst||1}),"n"===D()?this.getProperty(e):this.getNetworkInfo(e)}},{key:"sendPageRequest",value:function(t){var e=t.url,n=t.urlref,i=t.urlref_ts;this._navigationBarTitle.lt="11";var a={ak:this.statData.ak,uuid:this.statData.uuid,p:this.statData.p,lt:"11",ut:this.statData.ut,url:e,tt:this.statData.tt,urlref:n,urlref_ts:i,ch:this.statData.ch,usv:this.statData.usv,t:j()};this.request(a)}},{key:"sendHideRequest",value:function(t,e){var n=t.urlref,i=t.urlref_ts,a={ak:this.statData.ak,uuid:this.statData.uuid,p:this.statData.p,lt:"3",ut:this.statData.ut,urlref:n,urlref_ts:i,ch:this.statData.ch,usv:this.statData.usv,t:j()};this.request(a,e)}},{key:"sendEventRequest",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.key,n=void 0===e?"":e,i=t.value,a=void 0===i?"":i,r="";try{r=C()}catch(c){var o=h("__launch_options");r=o.path}this._navigationBarTitle.config=R(r),this._navigationBarTitle.lt="21";var s={ak:this.statData.ak,uuid:this.statData.uuid,p:this.statData.p,lt:"21",ut:this.statData.ut,url:r,ch:this.statData.ch,e_n:n,e_v:"object"===u(a)?JSON.stringify(a):a.toString(),usv:this.statData.usv,t:j()};this.request(s)}},{key:"sendPushRequest",value:function(t,e){var n=this,i=j(),a={lt:"101",cid:e,t:i,ut:this.statData.ut};var r=P({101:[a]}),o={usv:"3.7.3",t:i,requests:r};"h5"!==a.ut?"n"!==D()||"a"!==this.statData.p?this.sendRequest(o):setTimeout((function(){n.sendRequest(o)}),200):this.imageRequest(o)}},{key:"getProperty",value:function(t){var e=this;plus.runtime.getProperty(plus.runtime.appid,(function(n){e.statData.v=n.version||"",e.getNetworkInfo(t)}))}},{key:"getNetworkInfo",value:function(t){var e=this;uni.getNetworkType({success:function(n){e.statData.net=n.networkType,e.getLocation(t)}})}},{key:"getLocation",value:function(t){var e=this;k.getLocation?uni.getLocation({type:"wgs84",geocode:!0,success:function(n){n.address&&(e.statData.cn=n.address.country,e.statData.pn=n.address.province,e.statData.ct=n.address.city),e.statData.lat=n.latitude,e.statData.lng=n.longitude,e.request(e.statData,t)}}):(this.statData.lat=0,this.statData.lng=0,this.request(this.statData,t))}},{key:"request",value:function(t,e){var n=this,i=j(),a=this._navigationBarTitle;Object.assign(t,{ttn:a.page,ttpj:a.config,ttc:a.report});var r=h("__UNI__STAT__DATA")||{};r[t.lt]||(r[t.lt]=[]),r[t.lt].push(t),_("__UNI__STAT__DATA",r);var o=function(){return U=j(),N=h("__page__residence__time"),U-N}();if(!(o<G)||e){M();var s=P(r),u={usv:"3.7.3",t:i,requests:s};v("__UNI__STAT__DATA"),"h5"!==t.ut?"n"!==D()||"a"!==this.statData.p?this.sendRequest(u):setTimeout((function(){n.sendRequest(u)}),200):this.imageRequest(u)}}},{key:"getIsReportData",value:function(){return function(){return new Promise((function(t,e){var n="",i=(new Date).getTime(),a=1;try{n=uni.getStorageSync("Report_Data_Time"),a=uni.getStorageSync("Report_Status")}catch(r){n="",a=1}""!==a?(1===a&&t(),n||(uni.setStorageSync("Report_Data_Time",i),n=i),i-n>864e5&&E((function(t){var e=t.enable;uni.setStorageSync("Report_Data_Time",i),uni.setStorageSync("Report_Status",e)}))):E((function(e){var n=e.enable;uni.setStorageSync("Report_Data_Time",i),uni.setStorageSync("Report_Status",n),1===n&&t()}))}))}()}},{key:"sendRequest",value:function(t){var e=this;this.getIsReportData().then((function(){uni.request({url:p,method:"POST",data:t,success:function(){0},fail:function(n){++e._retry<3&&setTimeout((function(){e.sendRequest(t)}),1e3)}})}))}},{key:"imageRequest",value:function(t){this.getIsReportData().then((function(){var e=new Image,n=function(t){var e=Object.keys(t),n=e.sort(),i={},a="";for(var r in n)i[n[r]]=t[n[r]],a+=n[r]+"="+t[n[r]]+"&";return{sign:"",options:a.substr(0,a.length-1)}}(function(t){var e={};for(var n in t)e[n]=encodeURIComponent(t[n]);return e}(t)).options;e.src="https://tongji.dcloud.io/uni/stat.gif?"+n}))}},{key:"sendEvent",value:function(t,e){(function(t,e){return t?"string"!==typeof t?(console.error("uni.report [eventName] Parameter type error, it can only be of type String"),!0):t.length>255?(console.error("uni.report [eventName] Parameter length cannot be greater than 255"),!0):"string"!==typeof e&&"object"!==u(e)?(console.error("uni.report [options] Parameter type error, Only supports String or Object type"),!0):"string"===typeof e&&e.length>255?(console.error("uni.report [options] Parameter length cannot be greater than 255"),!0):"title"===t&&"string"!==typeof e?(console.error("uni.report [eventName] When the parameter is title, the [options] parameter can only be of type String"),!0):void 0:(console.error("uni.report Missing [eventName] parameter"),!0)})(t,e)||("title"!==t?this.sendEventRequest({key:t,value:"object"===u(e)?JSON.stringify(e):e},1):this._navigationBarTitle.report=e)}}]),t}(),V=function(t){"use strict";i(n,t);var e=l(n);function n(){return o(this,n),e.call(this)}return s(n,[{key:"pushEvent",value:function(t){var e=this,n=function(){if(g.collectItems){var t=g.collectItems.uniPushClientID;return"boolean"===typeof t&&t}return!1}();uni.getPushClientId&&n&&uni.getPushClientId({success:function(n){var i=n.cid||!1;i&&e.sendPushRequest(t,i)}})}},{key:"launch",value:function(t,e){M(),this.__licationShow=!0,_("__launch_options",t),t.cst=1,this.sendReportRequest(t,!0)}},{key:"load",value:function(t,e){this.self=e,this._query=t}},{key:"appHide",value:function(t){this.applicationHide(t,!0)}},{key:"appShow",value:function(t){this.applicationShow(t)}},{key:"show",value:function(t){this.self=t,"page"===q(t)&&this.pageShow(t),"app"===q(t)&&this.appShow()}},{key:"hide",value:function(t){this.self=t,"page"===q(t)&&this.pageHide(t),"app"===q(t)&&this.appHide()}},{key:"error",value:function(t){var e="";e=t.message?t.stack:JSON.stringify(t);var n="";try{n=get_route()}catch(a){n=""}var i={ak:this.statData.ak,uuid:this.statData.uuid,p:this.statData.p,lt:"31",url:n,ut:this.statData.ut,ch:this.statData.ch,mpsdk:this.statData.mpsdk,mpv:this.statData.mpv,v:this.statData.v,em:e,usv:this.statData.usv,t:parseInt((new Date).getTime()/1e3)};this.request(i)}}],[{key:"getInstance",value:function(){return uni.__stat_instance||(uni.__stat_instance=new n),uni.__stat_instance}}]),n}(F),W=V,X=W.getInstance(),Z=!1,K={onLaunch:function(t){X.launch(t,this),X.pushEvent(t)},onLoad:function(t){if(X.load(t,this),this.$scope&&this.$scope.onShareAppMessage){var e=this.$scope.onShareAppMessage;this.$scope.onShareAppMessage=function(t){return X.interceptShare(!1),e.call(this,t)}}},onShow:function(){Z=!1,X.show(this)},onHide:function(){Z=!0,X.hide(this)},onUnload:function(){Z?Z=!1:X.hide(this)},onError:function(t){X.error(t)}};function Q(){var t=n("8bbf");(t.default||t).mixin(K),uni.report=function(t,e){X.sendEvent(t,e)}}(function(){Q()})()},"36c6":function(t,e){function n(e){return t.exports=n=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},t.exports.__esModule=!0,t.exports["default"]=t.exports,n(e)}t.exports=n,t.exports.__esModule=!0,t.exports["default"]=t.exports},"3c96":function(t,e){t.exports=function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t},t.exports.__esModule=!0,t.exports["default"]=t.exports},"4a4b":function(t,e){function n(e,i){return t.exports=n=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},t.exports.__esModule=!0,t.exports["default"]=t.exports,n(e,i)}t.exports=n,t.exports.__esModule=!0,t.exports["default"]=t.exports},"4ea4":function(t,e){t.exports=function(t){return t&&t.__esModule?t:{default:t}},t.exports.__esModule=!0,t.exports["default"]=t.exports},"5b09":function(t,e,n){if("undefined"===typeof Promise||Promise.prototype.finally||(Promise.prototype.finally=function(t){var e=this.constructor;return this.then((function(n){return e.resolve(t()).then((function(){return n}))}),(function(n){return e.resolve(t()).then((function(){throw n}))}))}),"undefined"!==typeof uni&&uni&&uni.requireGlobal){var i=uni.requireGlobal();ArrayBuffer=i.ArrayBuffer,Int8Array=i.Int8Array,Uint8Array=i.Uint8Array,Uint8ClampedArray=i.Uint8ClampedArray,Int16Array=i.Int16Array,Uint16Array=i.Uint16Array,Int32Array=i.Int32Array,Uint32Array=i.Uint32Array,Float32Array=i.Float32Array,Float64Array=i.Float64Array,BigInt64Array=i.BigInt64Array,BigUint64Array=i.BigUint64Array}uni.restoreGlobal&&uni.restoreGlobal(weex,plus,setTimeout,clearTimeout,setInterval,clearInterval),__definePage("pages/index/index",(function(){return Vue.extend(n("1e5a").default)}))},"5bc3":function(t,e,n){var i=n("a395");function a(t,e){for(var n=0;n<e.length;n++){var a=e[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,i(a.key),a)}}t.exports=function(t,e,n){return e&&a(t.prototype,e),n&&a(t,n),Object.defineProperty(t,"prototype",{writable:!1}),t},t.exports.__esModule=!0,t.exports["default"]=t.exports},"62de":function(t,e,n){"use strict";n.r(e);var i=n("ac58"),a=n("b255");for(var r in a)["default"].indexOf(r)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(r);var o=n("f0c5"),s=Object(o["a"])(a["default"],i["b"],i["c"],!1,null,"06b33c4a",null,!1,i["a"],void 0);e["default"]=s.exports},6439:function(t,e,n){"use strict";n.r(e);var i=n("bf86"),a=n.n(i);for(var r in i)["default"].indexOf(r)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(r);e["default"]=a.a},6999:function(t,e,n){"use strict";n.r(e);var i=n("2857"),a=n.n(i);for(var r in i)["default"].indexOf(r)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(r);e["default"]=a.a},"6b58":function(t,e,n){var i=n("7037")["default"],a=n("3c96");t.exports=function(t,e){if(e&&("object"===i(e)||"function"===typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return a(t)},t.exports.__esModule=!0,t.exports["default"]=t.exports},7037:function(t,e){function n(e){return t.exports=n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t.exports.__esModule=!0,t.exports["default"]=t.exports,n(e)}t.exports=n,t.exports.__esModule=!0,t.exports["default"]=t.exports},"70ed":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{question:"",aq:[],timer:null,bottom:0,custom_data:"",modal:!1,isloading:!1,words:["\u4f60\u5e72\u561b\u662f\u4ec0\u4e48\u610f\u601d","\u4ec0\u4e48\u662f\u53ea\u56e0","\u4ec0\u4e48\u662f\u8521\u5f90\u5764","\u4ec0\u4e48\u662f\u9e21\u4f60\u592a\u7f8e","\u7528Python\u5199\u4e00\u4e2a\u731c\u6570\u5b57\u6e38\u620f\u5e76\u8fd0\u884c\u5b83","\u5199\u4e00\u7bc7\u79d1\u5e7b\u5c0f\u8bf4","\u5982\u4f55\u95ee\u4e00\u4e2a\u8ba9 AI \u4e5f\u7b54\u4e0d\u51fa\u7684\u95ee\u9898","Ai \u4f1a\u66ff\u4ee3\u4eba\u7c7b\u5de5\u4f5c\u5417\uff1f","\u5199\u4e00\u7bc71\u4e07\u5b57\u7684Java\u540e\u7aef\u8bba\u6587","\u5199\u4e00\u4e2a\u7f51\u9875\u4ee3\u7801","\u4eca\u65e5\u70ed\u95e8","\u539f\u795e\u9ad8\u7ea7\u73a9\u6cd5","\u738b\u8005\u8363\u8000\u9ad8\u7ea7\u73a9\u6cd5","\u6211\u7684\u4e16\u754c\u9ad8\u7ea7\u73a9\u6cd5"]}},onLoad:function(){},methods:{handleClick:function(t){this.question=t,this.send()},send:function(){var e=this,n=this.question;if(this.isloading)uni.showToast({icon:"none",title:"AI\u6b63\u5728\u601d\u8003\uff0c\u8bf7\u7a0d\u7b49\u4e5f\u53ef\u4ee5\u5173\u6ce8\u6211\u7684qq\u6216\u8005\u516c\u4f17\u53f7\u4e5f\u53ef\u4ee5\u50cf\u6211\u53cd\u9988\u6587\u5b57\u5feb\u6377\u65b9\u5f0f"});else if(n){this.isloading=!0,this.question="",this.bottom+=uni.getSystemInfoSync().screenHeight,this.$nextTick((function(){var t=this;setTimeout((function(){uni.pageScrollTo({scrollTop:t.bottom,duration:0})}),300)}));var i=(new Date).getTime(),a="";this.aq.push({id:i,question:n,answer:""}),this.aq.forEach((function(t){a+="Human:".concat(t.question,"\n"),a+="AI:".concat(t.answer,"\n")})),uni.request({url:"https://api.forchange.cn",method:"POST",data:{prompt:a},timeout:99999999999999,success:function(t){e.aq.forEach((function(e){e.id==i&&(e.answer=t.data.choices[0].text)})),e.isloading=!1},fail:function(n){t("log",n," at pages/index/index.vue:125"),e.aq.forEach((function(t){t.id==i&&(t.error=!0)})),uni.showToast({icon:"none",title:"\u670d\u52a1\u5668\u7e41\u5fd9\uff0c\u8bf7\u91cd\u8bd5"}),e.isloading=!1}})}else uni.showToast({icon:"none",title:"\u5185\u5bb9\u4e0d\u80fd\u4e3a\u7a7a"})},copy:function(t){uni.setClipboardData({data:t})},handleTouchStart:function(t){var e=this;this.timer=setTimeout((function(){e.custom_data=t,e.modal=!0}),800)},handleTouchEnd:function(){clearTimeout(this.timer)}}};e.default=n}).call(this,n("0de9")["default"])},"8bbf":function(t,e){t.exports=Vue},9523:function(t,e,n){var i=n("a395");t.exports=function(t,e,n){return e=i(e),e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t},t.exports.__esModule=!0,t.exports["default"]=t.exports},"970b":function(t,e){t.exports=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},t.exports.__esModule=!0,t.exports["default"]=t.exports},"9aa7":function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){}));var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("button",{staticClass:t._$s(0,"sc","tui-btn"),class:t._$s(0,"c",[t.plain?"tui-"+t.type+"-outline":"tui-btn-"+(t.type||"primary"),t.getDisabledClass(t.disabled,t.type,t.plain),t.getShapeClass(t.shape,t.plain),t.getShadowClass(t.type,t.shadow,t.plain),t.bold?"tui-text-bold":"",t.link?"tui-btn__link":"","100%"!==t.width&&t.width&&!0!==t.width?"":"tui-btn__flex-1"]),style:t._$s(0,"s",{width:t.width,height:t.height,lineHeight:t.height,fontSize:t.size+"rpx",margin:t.margin}),attrs:{"hover-class":t._$s(0,"a-hover-class",t.getHoverClass(t.disabled,t.type,t.plain)),loading:t._$s(0,"a-loading",t.loading),"form-type":t._$s(0,"a-form-type",t.formType),"open-type":t._$s(0,"a-open-type",t.openType),disabled:t._$s(0,"a-disabled",t.disabled),_i:0},on:{getuserinfo:t.bindgetuserinfo,getphonenumber:t.bindgetphonenumber,contact:t.bindcontact,error:t.binderror,click:function(e){return e.stopPropagation(),t.handleClick(e)}}},[t._t("default",null,{_i:1})],2)},a=[]},a2d1:function(t,e,n){"use strict";n.r(e);var i=n("9aa7"),a=n("6999");for(var r in a)["default"].indexOf(r)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(r);var o=n("f0c5"),s=Object(o["a"])(a["default"],i["b"],i["c"],!1,null,"54fc166a",null,!1,i["a"],void 0);e["default"]=s.exports},a395:function(t,e,n){var i=n("7037")["default"],a=n("e50d");t.exports=function(t){var e=a(t,"string");return"symbol"===i(e)?e:String(e)},t.exports.__esModule=!0,t.exports["default"]=t.exports},a499:function(t,e,n){"use strict";n.r(e);var i=n("6439");for(var a in i)["default"].indexOf(a)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(a);var r=n("f0c5"),o=Object(r["a"])(i["default"],void 0,void 0,!1,null,null,null,!1,void 0,void 0);e["default"]=o.exports},ac58:function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){}));var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("view",{staticClass:t._$s(0,"sc","tui-modal__container"),class:t._$s(0,"c",[t.show?"tui-modal-show":""]),style:t._$s(0,"s",{zIndex:t.zIndex}),attrs:{_i:0},on:{touchmove:function(t){t.stopPropagation(),t.preventDefault()}}},[n("view",{staticClass:t._$s(1,"sc","tui-modal-box"),class:t._$s(1,"c",[t.fadeIn||t.show?"tui-modal-normal":"tui-modal-scale",t.show?"tui-modal-show":""]),style:t._$s(1,"s",{width:t.width,padding:t.padding,borderRadius:t.radius,backgroundColor:t.backgroundColor,zIndex:t.zIndex+1}),attrs:{_i:1}},[t._$s(2,"i",!t.custom)?n("view",[t._$s(3,"i",t.title)?n("view",{staticClass:t._$s(3,"sc","tui-modal-title"),attrs:{_i:3}},[t._v(t._$s(3,"t0-0",t._s(t.title)))]):t._e(),n("view",{staticClass:t._$s(4,"sc","tui-modal-content"),class:t._$s(4,"c",[t.title?"":"tui-mtop"]),style:t._$s(4,"s",{color:t.color,fontSize:t.size+"rpx"}),attrs:{_i:4}},[t._v(t._$s(4,"t0-0",t._s(t.content)))]),n("view",{staticClass:t._$s(5,"sc","tui-modalBtn-box"),class:t._$s(5,"c",[2!=t.button.length?"tui-flex-column":""]),attrs:{_i:5}},[t._l(t._$s(6,"f",{forItems:t.button}),(function(e,i,a,r){return[n("button",{key:t._$s(6,"f",{forIndex:a,keyIndex:0,key:i+"_0"}),staticClass:t._$s("7-"+r,"sc","tui-modal-btn"),class:t._$s("7-"+r,"c",["tui-"+(e.type||"primary")+(e.plain?"-outline":""),2!=t.button.length?"tui-btn-width":"",t.button.length>2?"tui-mbtm":"","circle"==t.shape?"tui-circle-btn":""]),attrs:{"hover-class":t._$s("7-"+r,"a-hover-class","tui-"+(e.plain?"outline":e.type||"primary")+"-hover"),"data-index":t._$s("7-"+r,"a-data-index",i),_i:"7-"+r},on:{click:t.handleClick}},[t._v(t._$s("7-"+r,"t0-0",t._s(e.text||"\u786e\u5b9a")))])]}))],2)]):n("view",[t._t("default",null,{_i:9})],2)]),n("view",{staticClass:t._$s(10,"sc","tui-modal-mask"),class:t._$s(10,"c",[t.show?"tui-mask-show":""]),style:t._$s(10,"s",{zIndex:t.maskZIndex}),attrs:{_i:10},on:{click:t.handleClickCancel}})])},a=[]},b255:function(t,e,n){"use strict";n.r(e);var i=n("b711"),a=n.n(i);for(var r in i)["default"].indexOf(r)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(r);e["default"]=a.a},b711:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={name:"tuiModal",emits:["click","cancel"],props:{show:{type:Boolean,default:!1},width:{type:String,default:"84%"},backgroundColor:{type:String,default:"#fff"},padding:{type:String,default:"40rpx 64rpx"},radius:{type:String,default:"24rpx"},title:{type:String,default:""},content:{type:String,default:""},color:{type:String,default:"#999"},size:{type:Number,default:28},shape:{type:String,default:"square"},button:{type:Array,default:function(){return[{text:"\u53d6\u6d88",type:"red",plain:!0},{text:"\u786e\u5b9a",type:"red",plain:!1}]}},maskClosable:{type:Boolean,default:!0},fadeIn:{type:Boolean,default:!1},custom:{type:Boolean,default:!1},zIndex:{type:Number,default:9997},maskZIndex:{type:Number,default:9990}},data:function(){return{}},methods:{handleClick:function(t){if(this.show){var e=t.currentTarget.dataset;this.$emit("click",{index:Number(e.index)})}},handleClickCancel:function(){this.maskClosable&&this.$emit("cancel")}}};e.default=i},bf86:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={onLaunch:function(){t("log","App Launch"," at App.vue:4")},onShow:function(){t("log","App Show"," at App.vue:7")},onHide:function(){t("log","App Hide"," at App.vue:10")}};e.default=n}).call(this,n("0de9")["default"])},c003:function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){}));var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("view",{staticClass:t._$s(0,"sc","tui-tag"),class:t._$s(0,"c",[t.originLeft?"tui-origin-left":"",t.originRight?"tui-origin-right":"",t.getClassName(t.shape,t.plain),t.getTypeClass(t.type,t.plain)]),style:t._$s(0,"s",{transform:"scale("+t.scaleMultiple+")",padding:t.padding,margin:t.margin,fontSize:t.size,lineHeight:t.size}),attrs:{"hover-class":t._$s(0,"a-hover-class",t.hover?"tui-tag-opcity":""),_i:0},on:{click:t.handleClick}},[t._t("default",null,{_i:1})],2)},a=[]},c2b6:function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return i}));var i={tuiTag:n("1c2b").default,tuiModal:n("62de").default,tuiButton:n("a2d1").default},a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("view",{staticClass:t._$s(0,"sc","content"),attrs:{_i:0}},[t._l(t._$s(1,"f",{forItems:t.aq}),(function(e,i,a,r){return n("view",{key:t._$s(1,"f",{forIndex:a,key:"1-"+r}),staticClass:t._$s("1-"+r,"sc","aq"),attrs:{_i:"1-"+r}},[n("view",{staticClass:t._$s("2-"+r,"sc","question"),attrs:{_i:"2-"+r}},[n("view",{staticClass:t._$s("3-"+r,"sc","left"),attrs:{_i:"3-"+r}},[n("image",{staticClass:t._$s("4-"+r,"sc","icon"),attrs:{_i:"4-"+r}})]),n("view",{staticClass:t._$s("5-"+r,"sc","right"),attrs:{_i:"5-"+r}},[n("text",[t._v(t._$s("6-"+r,"t0-0",t._s(e.question)))])])]),n("view",{staticClass:t._$s("7-"+r,"sc","answer"),attrs:{_i:"7-"+r}},[n("view",{staticClass:t._$s("8-"+r,"sc","left"),attrs:{_i:"8-"+r}},[n("image",{staticClass:t._$s("9-"+r,"sc","icon"),attrs:{_i:"9-"+r}})]),n("view",{staticClass:t._$s("10-"+r,"sc","right"),attrs:{_i:"10-"+r}},[t._$s("11-"+r,"i",""==e.answer&&1!=e.error)?n("view",{staticClass:t._$s("11-"+r,"sc","wait"),attrs:{_i:"11-"+r}}):t._$s("12-"+r,"e",1==e.error)?n("text",{staticClass:t._$s("12-"+r,"sc","error"),attrs:{_i:"12-"+r}}):n("text",{attrs:{_i:"13-"+r},on:{touchstart:function(n){return t.handleTouchStart(e.answer)},touchend:t.handleTouchEnd}},[t._v(t._$s("13-"+r,"t0-0",t._s(e.answer)))])])])])})),t._$s(14,"i",t.aq.length<=0)?n("view",{staticClass:t._$s(14,"sc","tips"),attrs:{_i:14}},[n("view"),n("view",{staticClass:t._$s(16,"sc","words"),attrs:{_i:16}},[t._l(t._$s(17,"f",{forItems:t.words}),(function(e,i,a,r){return[n("tui-tag",{key:t._$s(17,"f",{forIndex:a,keyIndex:0,key:"17-0"+r}),staticClass:t._$s("18-"+r,"sc","tag"),attrs:{type:"black",padding:"20rpx 30rpx",_i:"18-"+r},on:{click:function(n){return t.handleClick(e)}}},[t._v(t._$s("18-"+r,"t0-0",t._s(e)))])]}))],2)]):t._e(),n("view",{staticClass:t._$s(19,"sc","send"),attrs:{_i:19}},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.question,expression:"question"}],staticClass:t._$s(20,"sc","in"),attrs:{_i:20},domProps:{value:t._$s(20,"v-model",t.question)},on:{confirm:t.send,input:function(e){e.target.composing||(t.question=e.target.value)}}}),n("image",{staticClass:t._$s(21,"sc","icon"),attrs:{_i:21},on:{click:t.send}})]),n("tui-modal",{attrs:{show:t.modal,custom:!0,_i:22}},[n("view",{staticClass:t._$s(23,"sc","tui-modal-custom"),attrs:{_i:23}},[n("textarea",{directives:[{name:"model",rawName:"v-model",value:t.custom_data,expression:"custom_data"}],staticClass:t._$s(24,"sc","tui-modal-custom-text"),attrs:{_i:24},domProps:{value:t._$s(24,"v-model",t.custom_data)},on:{input:function(e){e.target.composing||(t.custom_data=e.target.value)}}}),n("tui-button",{attrs:{height:"72rpx",size:28,shape:"circle",_i:25},on:{click:function(e){t.modal=!1}}},[t._v("")])],1)])],2)},r=[]},de71:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;e.default={pages:{},globalStyle:{}}},e151:function(t,e,n){"use strict";n.r(e);var i=n("11b8"),a=n.n(i);for(var r in i)["default"].indexOf(r)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(r);e["default"]=a.a},e50d:function(t,e,n){var i=n("7037")["default"];t.exports=function(t,e){if("object"!==i(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var a=n.call(t,e||"default");if("object"!==i(a))return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)},t.exports.__esModule=!0,t.exports["default"]=t.exports},ed6d:function(t,e,n){var i=n("4a4b");t.exports=function(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&i(t,e)},t.exports.__esModule=!0,t.exports["default"]=t.exports},f0c5:function(t,e,n){"use strict";function i(t,e,n,i,a,r,o,s,u,c){var l,f="function"===typeof t?t.options:t;if(u){f.components||(f.components={});var p=Object.prototype.hasOwnProperty;for(var d in u)p.call(u,d)&&!p.call(f.components,d)&&(f.components[d]=u[d])}if(c&&("function"===typeof c.beforeCreate&&(c.beforeCreate=[c.beforeCreate]),(c.beforeCreate||(c.beforeCreate=[])).unshift((function(){this[c.__module]=this})),(f.mixins||(f.mixins=[])).push(c)),e&&(f.render=e,f.staticRenderFns=n,f._compiled=!0),i&&(f.functional=!0),r&&(f._scopeId="data-v-"+r),o?(l=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"===typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),a&&a.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(o)},f._ssrRegister=l):a&&(l=s?function(){a.call(this,this.$root.$options.shadowRoot)}:a),l)if(f.functional){f._injectStyles=l;var _=f.render;f.render=function(t,e){return l.call(e),_(t,e)}}else{var h=f.beforeCreate;f.beforeCreate=h?[].concat(h,l):[l]}return{exports:t,options:f}}n.d(e,"a",(function(){return i}))}},[["30f8","app-config"]]]);