<template>
	<view>
		<view class="uni-head" :class="colorMode==false?colorType:''" :style="naviBarHeight+bgColors">

			<view class="mode" v-if="mode=='deNav'">
				<view class="deNav" v-if="textAlign==false" @tap="goBack" :style="tltTs">
					<view class="fhico" v-if="isReturn"></view>
					{{title}}
				</view>
				<view class="deNav" v-else style="width: 100%;" :style="tltTs">
					<view class="fhico" style="position: absolute;left: 3.3333%;" v-if="isReturn"></view>
					{{title}}
				</view>
				<view class="qxsearch" v-if="RbtnMode==true" @tap.stop="handleRbtn" :style="tltTss">
					<slot v-if="$slots['customRbtn']" name="customRbtn"></slot>
					<view v-else class="rbtn"></view>
				</view>
			</view>

			<view class="mode" v-if="mode=='searchNav'">
				<view class="searchNav" :style="tltTs">
					<view class="searchBox" :style="searchCss1">
						<!-- #ifdef MP -->
						<view class="fhico" :class="mBInfoH!=0?'mpfh':''" @tap="qxsearch"></view>
						<!-- #endif -->
						<input confirm-type="search" v-model="searchVal" @confirm="searchConfirm" :focus="searchfocus"
							:adjust-position="false" :placeholder="searchTips" placeholder-style="color:#ccc"
							:style="mBInfoH!=0?'height:'+mBInfoH+'px;margin-top:0;margin-left:0;width:60%;':''" />
						<!-- #ifndef MP -->
						<view class="qxsearch" @tap="qxsearch">取消</view>
						<!-- #endif -->
					</view>
					<view class="searchBox" :style="searchCss2">
						<view class="qxsearch" @tap.stop="handleLbtn" :style="mBInfoH!=0?'height:'+mBInfoH+'px;line-height:'+mBInfoH+'px;':''">
							<slot v-if="$slots['customLbtn']" name="customLbtn"></slot>
							<view v-else>{{title}}</view>
						</view>
						<view class="searchip"
							:style="mBInfoH!=0?'height:'+mBInfoH+'px;margin-top:0;margin-left:0;width:54%;':''"
							@tap="clickip">{{searchTips}}</view>
						<!-- #ifndef MP -->
						<view class="qxsearch" @tap.stop="handleRbtn" style="float: right;">
							<slot v-if="$slots['customRbtn']" name="customRbtn"></slot>
							<view v-else class="rbtn"></view>
						</view>
						<!-- #endif -->
					</view>
				</view>
			</view>
		</view>

		<view v-if="mode=='searchNav'">
			<view class="searchCon" :style="'top:'+ sotop +'px;'+searchCss3" style="margin-bottom: 15px;" v-if="$slots['customSearchCon']">
				<slot name="customSearchCon"></slot>
			</view>
			<view v-else class="searchCon" :style="'top:'+ sotop +'px;'+searchCss3" style="margin-bottom: 15px;">
				<view class="searchHistoryTlt" v-if="searchHistoryList!=''">历史记录<text @tap="empty">清空</text></view>
				<view class="searchHistoryItem" v-if="searchHistoryList!=''">
					<view @tap="searchHistoryBtn(index)" v-for="(item, index) in searchHistoryList.slice(0,15)"
						:key="index">{{item}}</view>
				</view>

				<view class="searchHistoryTlt" style="color: red;" v-if="searchLists!=''">热门搜索</view>
				<view class="searchHistoryItems" v-if="searchLists!=''">
					<view @tap="searchHistoryBtns(index)" v-for="(item, index) in searchLists" :key="index">
						<text :style="index<=2?'color: red':'color: #666'">{{index+1}}</text>{{item}}
					</view>
				</view>
			</view>
		</view>

		<view :style="naviBarHeight" style="box-sizing: border-box;"></view>
	</view>
</template>

<script>
	export default {
		name:"customHead",
		props: {
			title: {
				type: String,
				default: ''
			},
			textAlign: {
				type: [Boolean, String],
				default: true
			},
			isReturn: {
				type: [Boolean, String],
				default: false
			},
			RbtnMode: {
				type: [Boolean, String],
				default: false
			},
			mode: {
				type: String,
				default: 'deNav'
			},
			colorMode: {
				type: [Boolean, String],
				default: false
			},
			colorType: {
				type: String,
				default: 'green'
			},
			bgColor: {
				type: String,
				default: '#0fac9c'
			},
			searchTips: {
				type: String,
				default: ''
			},
			searchLists: Array
		},
		data() {
			return {
				titleHeight: 0, //状态栏和导航栏的总高度
				statusBarHeight: 0, //状态栏高度
				naviBarHeight: 0, //导航栏高度
				sotop: 0,
				mBInfoH: 0,
				searchVal: '',
				searchHistoryList: [], //历史记录
				bgColors: '',

				tltTs: '',
				tltTss: '',
				searchShow: false,
				searchCss1: 'left:6.6666%;opacity: 0;z-index: -2;',
				searchCss2: '',
				searchCss3: 'opacity: 0;z-index: -2;',
				searchfocus: false,

			}
		},
		mounted() {
			const res = uni.getSystemInfoSync()
			const system = res.platform
			this.statusBarHeight = res.statusBarHeight

			if (this.colorMode == true) {
				this.bgColors = 'background:' + this.bgColor
			}

			//#ifdef MP
			const mBInfo = uni.getMenuButtonBoundingClientRect();
			this.titleHeight = (mBInfo.top - this.statusBarHeight) * 2 + mBInfo.height;
			this.naviBarHeight = 'height:' + (this.titleHeight + this.statusBarHeight) + 'px;'
			const mBInfoL = mBInfo.left
			const mBInfoR = mBInfo.right
			const mBInfoT = mBInfo.top
			const mBInfoB = mBInfo.bottom
			const mBInfoH = mBInfo.height
			this.tltTs = 'top:' + mBInfoT + 'px;left:0px;bottom:' + mBInfoB + 'px;height:' + mBInfoH + 'px;line-height:' + mBInfoH + 'px'
			this.tltTss = 'position: absolute;width: auto;top:' + mBInfoT + 'px;right:'+(mBInfoR-mBInfoL+15)+'px;bottom:' + mBInfoB + 'px;height:' + mBInfoH + 'px;line-height:' + mBInfoH + 'px'
			this.sotop = this.titleHeight + this.statusBarHeight
			this.mBInfoH = mBInfoH
			//#endif

			//#ifndef APP-PLUS || MP
			this.naviBarHeight = 'height:55px;'
			this.tltTs = 'height:55px;line-height:55px;left:0;top:0;'
			this.sotop = 55
			this.tltTss = 'float: right;width: auto;margin-right: 15px;'
			//#endif

			//#ifdef APP-PLUS
			this.naviBarHeight = 'height:' + (55 + this.statusBarHeight) + 'px;padding-top: ' + this.statusBarHeight + 'px;'
			this.tltTs = 'height:55px;line-height:55px;left:0;top:0;'
			this.sotop = 55 + this.statusBarHeight
			this.tltTss = 'float: right;width: auto;margin-right: 15px;'
			//#endif
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			clickip() {
				var _this = this
				_this.searchVal = ''
				uni.getStorage({
					key: 'searchList',
					success: function(res) {
						_this.searchHistoryList = JSON.parse(res.data)
					}
				})
				_this.searchCss1 = 'left:6.6666%;opacity: 0;z-index: -2;'
				_this.searchCss2 = 'opacity: 0;z-index: -2;'
				setTimeout(function() {
					_this.searchCss1 = 'left:0;opacity: 1;z-index: 999;'
				}, 0)
				_this.searchCss3 = 'opacity: 1;z-index: 998;'
				_this.searchfocus = true


			},
			qxsearch() {
				var _this = this
				_this.searchCss1 = 'left:6.6666%;opacity: 0;z-index: -2;'
				_this.searchCss2 = 'opacity: 1;z-index: 999;'
				_this.searchCss3 = 'opacity: 0;z-index: -2;'
				_this.searchfocus = false
				_this.searchVal = ''
			},
			handleLbtn() {
				this.$emit('Lbtn', null)
			},
			handleRbtn() {
				this.$emit('Rbtn', null)
			},
			searchConfirm() {
				var _this = this
				_this.$emit('searchConfirm', [_this.searchVal])
				if (_this.searchVal == '') {
					return false
				} else {
					if (!_this.searchHistoryList.includes(_this.searchVal)) {
						_this.searchHistoryList.unshift(_this.searchVal);
						uni.setStorage({
							key: 'searchList',
							data: JSON.stringify(_this.searchHistoryList)
						});
					} else {
						//有搜索记录，删除之前的旧记录，将新搜索值重新push到数组首位
						let i = _this.searchHistoryList.indexOf(_this.searchVal);
						_this.searchHistoryList.splice(i, 1);
						_this.searchHistoryList.unshift(_this.searchVal);
						uni.setStorage({
							key: 'searchList',
							data: JSON.stringify(_this.searchHistoryList)
						});
					}
				}
				_this.searchVal = ''
			},

			//清空历史记录
			empty() {
				var _this = this
				uni.showModal({
				    title: '提示',
				    content: '是否清空历史记录',
				    success: function (res) {
				        if (res.confirm) {
				            uni.removeStorage({
				            	key: 'searchList'
				            });
							_this.searchHistoryList = [];
				        }
				    }
				});
				
			},
			searchHistoryBtn(e) {
				var _this = this
				_this.searchVal = _this.searchHistoryList[e]
				_this.searchConfirm()
			},
			searchHistoryBtns(e) {
				var _this = this
				_this.searchVal = _this.searchLists[e]
				_this.searchConfirm()
			}
		}
	}
</script>

<style lang="scss">
	.uni-head {
		width: 100%;
		font-size: 18px;
		line-height: 18px;
		color: #fff;
		text-align: center;
		box-sizing: border-box;
		position: fixed;
		top: 0;
		left: 0;
		overflow: hidden;
		z-index: 999;

	}

	.uni-head.red {
		background: -webkit-gradient(linear, left top, right top, from(#ff557f), to(#e3390e));
		background: -o-linear-gradient(left, #ff557f, #e3390e);
		background: linear-gradient(to right, #ff557f, #e3390e);
	}

	.uni-head.yellow {
		background: -webkit-gradient(linear, left top, right top, from(#ffbe3a), to(#ff763a));
		background: -o-linear-gradient(left, #ffbe3a, #ff763a);
		background: linear-gradient(to right, #ffbe3a, #ff763a);
	}

	.uni-head.blue {
		background: -webkit-gradient(linear, left top, right top, from(#55d5fc), to(#3f8cfe));
		background: -o-linear-gradient(left, #55d5fc, #3f8cfe);
		background: linear-gradient(to right, #55d5fc, #3f8cfe);
	}

	.uni-head.green {
		background: -webkit-gradient(linear, left top, right top, from(#14cbe7), to(#0fac9c));
		background: -o-linear-gradient(left, #14cbe7, #0fac9c);
		background: linear-gradient(to right, #14cbe7, #0fac9c);
	}

	.mode {
		float: left;
		width: 100%;
		position: relative;
	}

	.mode .deNav {
		text-align: center;
		position: absolute;
		z-index: 3;
		font-size: 16px;
		padding: 0 3.3333%;
		box-sizing: border-box;
	}

	.mode .searchNav {
		position: relative;
		width: 100%;
		z-index: 999;
		font-size: 16px;
		box-sizing: border-box;
		text-align: left;
	}

	.mode .searchNav text {
		width: auto;
		padding-right: 3.3333%;
		height: 100%;
		float: left;
		display: inline-block;
		color: #fff;
	}

	.mode .searchNav input {
		width: 78%;
		height: 35px;
		background: #fff;
		border-radius: 35px;
		vertical-align: middle;
		display: inline-block;
		padding: 0 15px;
		font-size: 32rpx;
		box-sizing: border-box;
		color: #737373;
		display: block;
		float: left;
		margin-top: 10px;
		margin-left: 3.3333%;
		outline: none;
	}

	.searchip {
		width: 64%;
		height: 35px;
		line-height: 35px;
		background: #fff;
		border-radius: 35px;
		display: block;
		float: left;
		padding: 0 15px;
		margin-top: 10px;
		font-size: 32rpx;
		box-sizing: border-box;
		color: #ccc;
	}

	.searchBox {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		transition: all 0.4s;
	}

	.searchCon {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background: #FFFFFF;
		transition: all 0.4s;
	}

	.qxsearch {
		float: left;
		display: block;
		width: 18%;
		height: 55px;
		line-height: 55px;
		text-align: center;
		font-size: 16px;
		color: #fff;
		box-sizing: border-box;
		padding: 0 15px;
		overflow: hidden;
		position: relative;
	}

	.qxsearch .rbtn {
		width: 24px;
		height: 14px;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-left: -12px;
		margin-top: -10px;
		border-top: 2px solid #ffffff;
		border-bottom: 2px solid #ffffff;
	}

	.qxsearch .rbtn::after {
		content: "";
		width: 24px;
		height: 2px;
		position: absolute;
		top: 50%;
		left: 0;
		margin-top: -1px;
		background: #fff;

	}

	.fhico {
		width: 20rpx;
		height: 100%;
		float: left;
		margin-right: 10px;
		position: relative;
	}

	.fhico::after {
		content: "";
		width: 20rpx;
		height: 20rpx;
		position: absolute;
		top: 50%;
		margin-top: -12rpx;
		left: 3px;
		border-left: 2px solid #ffffff;
		border-bottom: 2px solid #ffffff;
		transform: rotate(45deg);
	}

	.mpfh {
		padding: 0 3.3333%;
	}

	.mpfh::after {
		left: 50%;
	}

	.searchHistoryTlt {
		width: 100%;
		padding: 0 3.3333%;
		box-sizing: border-box;
		height: 55px;
		line-height: 55px;
		font-size: 16px;
		color: #434343;
		float: left;
	}

	.searchHistoryTlt text {
		float: right;
		color: #00aaff;
		display: block;
	}

	.searchHistoryItem,
	.searchHistoryItems {
		width: 100%;
		padding: 0 3.3333%;
		box-sizing: border-box;
		float: left;
	}

	.searchHistoryItem view {
		font-size: 16px;
		padding: 3px 10px;
		background: #f5f5f5;
		display: inline-block;
		border-radius: 50px;
		margin-right: 15px;
		margin-bottom: 15px;
		color: #7c7c7c;
	}

	.searchHistoryItems view {
		float: left;
		width: 50%;
		box-sizing: border-box;
		padding-right: 10px;
		padding-bottom: 5px;
		margin-bottom: 10px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 16px;
		color: #666;
	}

	.searchHistoryItems view text {
		display: block;
		float: left;
		width: 20px;
		margin-right: 5px;
		padding-left: 5px;
		box-sizing: border-box;
	}
</style>
