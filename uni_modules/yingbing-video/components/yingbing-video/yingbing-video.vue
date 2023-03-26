<template>
	<view
	:id="'yb-video' + dataId"
	class="yb-video"
	:prop="videoProp"
	:change:prop="ybVideo.propWatcher">
		<!-- #ifdef H5 || APP-VUE -->
		<view class="content" :style="{'transform': mirrorSync ? 'rotateY(180deg)' : ''}"></view>
		<view class="barrage" :style="{'padding-top': barrageGap + 'px', 'padding-bottom': barrageGap + 'px'}" @tap="handleVideoClick"></view>
		<!-- #endif -->
		<slot></slot>
		<view class="yb-video-contorls" :style="{
			transform: 'translateY(' + (controlsShow ? 0 : '100%')  + ')'
		}" v-if="controls" @touchstart="clearControlsTimer" @touchend="startControlsTimer">
			<view class="yb-video-contorls-top">
				<view @tap="toggle">
					<video-icon :name="isPause ? 'play' : 'pause'" :size="15" color="#fff"></video-icon>
				</view>
				<text class="yb-video-contorls-time">{{Util.timesFormat(currentTime) + ' / ' + Util.timesFormat(duration || 0)}}</text>
				<view class="yb-video-contorls-top-btn" @tap="mutedSync = !mutedSync">
					<video-icon :name="mutedSync ? 'volume-muted' : 'volume-medium'" :size="20" color="#fff"></video-icon>
				</view>
				<view class="yb-video-contorls-top-btn" @tap="settingShow = true">
					<video-icon name="setting" :size="20" color="#fff"></video-icon>
				</view>
				<view class="yb-video-contorls-top-btn" @tap="switchFullScreen">
					<video-icon :name="fullscreen ? 'out-fullscreen' : 'in-fullscreen'" :size="20" color="#fff"></video-icon>
				</view>
			</view>
			<view class="yb-video-contorls-progress">
				<slider v-if="progressShow" :value="progress" @changing="sliderChanging" @change="sliderChange" activeColor="#fff" backgroundColor="#999" block-color="#fff" block-size="10" />
			</view>
			<view class="yb-video-contorls-shadow"></view>
		</view>
		<view class="yb-video-settings" :style="{
			transform: 'scale(' + (settingShow ? 1 : 0) + ')'
		}">
			<view class="yb-video-setting" @tap="switchBarrageShow" v-if="enableBarrage">
				<video-icon :name="barrageShowSync ? 'barrage-show' : 'barrage-hide'" :size="20" color="#333"></video-icon>
				<text class="yb-video-setting-text">{{barrageShowSync ? "关闭弹幕" : "开启弹幕"}}</text>
			</view>
			<view class="yb-video-setting" @tap="showPlaybackRate">
				<video-icon name="play-rate-circle" :size="20" color="#333"></video-icon>
				<text class="yb-video-setting-text">播放速度</text>
			</view>
			<view class="yb-video-setting" @tap="mirrorSync = !mirrorSync">
				<video-icon name="mirror" :size="20" color="#333"></video-icon>
				<text class="yb-video-setting-text">{{mirrorSync ? "退出镜像" : "镜像画面"}}</text>
			</view>
			<!-- #ifdef H5 -->
			<view class="yb-video-setting" @tap="switchPictureInPicture">
				<video-icon :name="pictureInPicture ? 'picture-in-picture-exit' : 'picture-in-picture-open'" :size="20" color="#333"></video-icon>
				<text class="yb-video-setting-text">{{pictureInPicture ? "退出画中画" : "画中画"}}</text>
			</view>
			<!-- #endif -->
		</view>
		<view class="yb-video-settings" :style="{
			transform: 'scale(' + (playbackRateShow ? 1 : 0) + ')',
			height: '150px'
		}">
			<scroll-view class="yb-video-setting-scroll" scroll-y="true">
				<view class="yb-video-setting" v-for="(rate, i) in playbackRateList" :key="rate.value" @tap="playbackRateSync = rate.value">
					<text class="yb-video-setting-text" :style="{color: rate.value == playbackRateSync ? '#2ca2f9' : '#333'}">{{rate.label}}</text>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import VideoIcon from '../modules/video-icon.vue'
	import Util from '../../js_sdk/utils.js'
	export default {
		components: {
			VideoIcon
		},
		props: {
			dataId: {
				type: String,
				default () {
					let mydate = new Date()
					return 'cms' + mydate.getMinutes() + mydate.getSeconds() + mydate.getMilliseconds() + Math.round(Math.random() * 10000)
				}
			},
			//播放链接
			src: {
				type: String,
				default: ''
			},
			//封面
			poster: {
				type: String,
				default: ''
			},
			//视频格式
			formats: {
				type: String,
				default: 'auto'
			},
			//静音
			muted: {
				type: Boolean,
				default: false
			},
			//自动播放
			autoplay: {
				type: Boolean,
				default: false
			},
			//初始播放时间 (单位是秒)
			initialTime: {
				type: Number,
				default: 0
			},
			//是否循环播放
			loop: {
				type: Boolean,
				default: false
			},
			//预加载属性
			preload: {
				type: String,
				default: 'auto' //auto/meta/none
			},
			//控制栏
			controls: {
				type: Boolean,
				default: true
			},
			//镜像画面
			mirror: {
				type: Boolean,
				default: false
			},
			//音量
			volume: {
				type: Number,
				default: 1.0
			},
			//倍率
			playbackRate: {
				type: Number,
				default: 1.0
			},
			playbackRateList: {
				type: Array,
				default () {
					return [{
						label: '0.25',
						value: 0.25
					},{
						label: '0.5',
						value: 0.5
					},{
						label: '0.75',
						value: 0.75
					},{
						label: '正常',
						value: 1.0
					},{
						label: '1.25',
						value: 1.25
					},{
						label: '1.5',
						value: 1.5
					},{
						label: '1.75',
						value: 1.75
					},{
						label: '2.0',
						value: 2.0
					}]
				}
			},
			//展示进度条
			progressShow: {
				type: Boolean,
				default: true
			},
			//展示弹幕
			barrageShow: {
				type: Boolean,
				default: false
			},
			//弹幕库
			barrages: {
				type: Array,
				default () {
					return new Array
				}
			},
			//弹幕配置
			barrageConfig: {
				type: Object,
				default () {
					return new Object
				}
			},
			//弹幕显示上下间距
			barrageGap: {
				type: Number,
				default: 0
			},
			//是否直播
			isLive: {
				type: Boolean,
				default: false
			},
			//flv配置
			flvConfig: {
				type: Object,
				default () {
					return new Object
				}
			},
			//flv切片列表
			segments: {
				type: Array,
				default () {
					return new Array
				}
			},
			//非全屏时屏幕方向 仅APP支持
			generallyDirection: {
				type: String,
				default: 'portrait-primary'
			},
			//全屏时屏幕方向 仅APP支持
			fullscreenDirection: {
				type: String,
				default: 'landscape-primary'
			},
			//当视频尺寸与视频容器大小不一致时的处理
			objectFit: {
				type: String,
				default: 'contain'
			}
		},
		computed: {
			Util () {
				return Util
			},
			progress () {
				return (this.currentTime / this.duration) * 100
			},
			barrageConfigSync () {
				return Object.assign({}, {
					duration: -1, // 弹幕动画的循环周期，-1 表示不循环播放
					speed: 150, // 弹幕的运动速度
					fontSize: 24, // 文字大小，单位：像素
					fontFamily: 'Microsoft Yahei', // 字体，默认值：微软雅黑
					textShadowBlur: 0.5, // 字体阴影扩散，有效值 >= 0
					opacity: 1, // 透明度，有效值 0-1
					defaultColor: '#fff', // 默认颜色，与 CSS 颜色属性一致
				}, this.barrageConfig)
			},
			videoProp () {
				return {
					dataId: this.dataId,
					src: this.src,
					barrages: this.barrages,
					poster: this.poster,
					formats: this.formats,
					state: this.state,
					seekTime: this.seekTime,
					autoplay: this.autoplay,
					loop: this.loop,
					initialTime: this.initialTime,
					muted: this.mutedSync,
					volume: this.volumeSync,
					playbackRate: this.playbackRateSync,
					barrageShow: this.barrageShowSync,
					barrageConfig: JSON.stringify(this.barrageConfigSync),
					danmu: JSON.parse(JSON.stringify(this.danmu)),
					pictureInPicture: this.pictureInPicture,
					fullscreen: this.fullscreen,
					isLive: this.isLive,
					flvConfig: this.flvConfig,
					segments: this.segments,
				}
			}
		},
		data () {
			return {
				enableBarrage: true,
				state: 'ready',
				controlsShow: false,
				settingShow: false,
				playbackRateShow: false,
				isPause: true,
				direction: 'vertical',
				seekTime: -1,
				danmu: {},
				fullscreen: false,
				pictureInPicture: false,
				currentTime: 0,
				duration: 0,
				mutedSync: false,
				mirrorSync: false,
				volumeSync: 1.0,
				playbackRateSync: 1.0,
				barrageShowSync: false
			}
		},
		created () {
			this.onResizeChange()
			// #ifdef APP-VUE
			plus.screen.lockOrientation(this.generallyDirection);
			// #endif
		},
		mounted() {
			this.controlsShow = true
			this.mutedSync = this.muted
			this.mirrorSync = this.mirror
			this.volumeSync = this.volume
			this.playbackRateSync = this.playbackRate
			this.barrageShowSync = this.barrageShow
		},
		beforeDestroy() {
			this.clearControlsTimer()
			// #ifdef APP-VUE
			plus.screen.lockOrientation(this.generallyDirection);
			// #endif
		},
		methods: {
			//触发事件
			onCanplay (e) {
				this.$emit('canplay', e)
				this.duration = e.duration
			},
			onLoadedmetadata (e) {
				this.$emit('loadedmetadata', e)
				this.duration = e.duration
			},
			onPlay () {
				this.$emit('play')
				this.isPause = false
			},
			onPause () {
				this.$emit('pause')
				this.isPause = true
			},
			onEnded () {
				this.$emit('ended')
			},
			onSeeking (e) {
				this.$emit('seeking', e)
			},
			onSeeked (e) {
				this.$emit('seeked', e)
			},
			onWaiting (e) {
				this.$emit('waiting', e)
			},
			onPlaying (e) {
				this.$emit('playing', e)
			},
			onProgress (e) {
				this.$emit('progress', e)
			},
			onTimeupdate (e) {
				this.$emit('timeupdate', e)
				this.currentTime = e.currentTime
			},
			onVolumechange(e) {
				this.$emit('volumeChange', e)
			},
			onRatechange (e) {
				this.$emit('rateChange', e)
			},
			onAbort () {
				this.$emit('abort')
			},
			onErr (e) {
				this.$emit('error', e)
			},
			onEnterpictureinpicture () {
				this.$emit('enterpictureinpicture')
			},
			onLeavepictureinpicture () {
				this.$emit('leavepictureinpicture')
			},
			
			// 操作事件
			play () {
				this.state = 'play'
			},
			pause () {
				this.state = 'pause'
			},
			toggle () {
				this.state = 'toggle'
			},
			seek (time) {
				this.seekTime = time
			},
			drawBarrage (danmu) {
				this.danmu = danmu
			},
			switchPictureInPicture () {
				this.pictureInPicture = !this.pictureInPicture
			},
			switchFullscreen () {
				this.fullscreen = !this.fullscreen
			},
			launchFullscreen () {
				this.fullscreen = true
			},
			exitFullscreen () {
				this.fullscreen = false
			},
			
			switchBarrageShow () {
				this.barrageShowSync = !this.barrageShowSync
			},
			showPlaybackRate () {
				this.settingShow = false
				this.playbackRateShow = true
			},
			
			sliderChange (e) {
				this.seek((e.detail.value / 100) * this.duration)
				this.clearControlsTimer()
				this.startControlsTimer()
			},
			sliderChanging () {
				this.clearControlsTimer()
			},
			fullscreenChange (e) {
				this.fullscreen = e;
				this.$emit('fullscreenChange', e)
				// #ifdef APP-VUE
				if ( this.fullscreen ) {
					plus.screen.lockOrientation(this.fullscreenDirection);
				} else {
					plus.screen.lockOrientation(this.generallyDirection);
				}
				// #endif
			},
			onResizeChange (e) {
				// #ifdef APP-VUE
				const pages = getCurrentPages()
				const page = pages[pages.length - 1]
				const resize = page.$vm.$options.onResize
				const event = (e) => {
					this.direction = e.size.windowWidth > e.size.windowHeight ? 'horizontal' : 'vertical'
					this.$emit('resize', {
						direction: this.direction,
						width: e.size.windowWidth,
						height: e.size.windowWidth
					})
					const query = uni.createSelectorQuery().in(this)
					query.select(`#yb-video${this.dataId}`).boundingClientRect(data => {
					  this.windowWidth = data.width
					  this.windowHeight = data.height
					}).exec();
					resize ? resize(e) : null
				}
				page.$vm.$options.onResize = new Array(0)
				page.$vm.$options.onResize.push(event)
				// #endif
				// #ifdef H5
				window.onresize = () => {
					let width = window.screen.width || document.body.offsetWidth
					let height = window.screen.height || document.body.offsetHeight
					let direction = this.direction
					if ( width > height ) {
						this.direction = 'horizontal'
					} else {
						this.direction = 'vertical'
					}
					if ( this.direction != direction ) {
						this.$emit('resize', {
							direction: this.direction,
							width: width,
							height: height
						})
					}
					const query = uni.createSelectorQuery().in(this)
					query.select(`#yb-video${this.dataId}`).boundingClientRect(data => {
					  this.windowWidth = data.width
					  this.windowHeight = data.height
					}).exec();
				}
				// #endif
			},
			
			//重置变量，方便下次使用
			resetData () {
				this.seekTime = -1
				this.danmu = {}
				this.state = 'ready'
			},
			closeBarrage () {
				this.enableBarrage = false
			},
			handleVideoClick () {
				if ( this.playbackRateShow ) {
					this.playbackRateShow = false
					this.settingShow = true
				} else if ( this.settingShow ) {
					this.settingShow = false
				} else {
					this.controlsShow = !this.controlsShow
				}
			},
			clearControlsTimer () {
				if ( this.controls ) {
					clearTimeout(this.controlsTimer)
					this.controlsTimer = false
				}
			},
			startControlsTimer () {
				if ( this.controls ) {
					this.controlsTimer = setTimeout(() => {
						this.controlsShow = false
					}, 5000)
				}
			}
		},
		watch: {
			controlsShow (newVal) {
				if ( this.controls ) {
					this.clearControlsTimer()
					if ( newVal ) {
						this.startControlsTimer()
					}
				}
			},
			muted (newVal) {
				this.mutedSync = newVal
			},
			mirror (newVal) {
				this.mirrorSync = newVal
			},
			volume (newVal) {
				this.volumeSync = newVal
			},
			playbackRate (newVal) {
				this.playbackRateSync = newVal
			},
			barrageShow (newVal) {
				this.barrageShowSync = newVal
			}
		}
	}
</script>
<!-- #ifdef APP-VUE || H5 -->
<script lang="renderjs" type="module" module="ybVideo">
	let myVideo
	import Utils from '../../js_sdk/utils.js'
	export default {
		data () {
			return {
				hls: null,
				flv: null,
				dp: null,
				barrage: null,
				dom: null,
				canvas: null,
				context: null,
				resizeObserver: null,
				drawTime: 0,
				isParsed: false
			}
		},
		mounted () {
			this.initDom.bind(this)
			this.dom = document.getElementById('yb-video' + this.videoProp.dataId)
			if ( this.videoProp.src || this.videoProp.segments.length > 0 ) {
				this.switchVideo()
			}
		},
		methods: {
			initDom() {
				myVideo = ybVideo.init(document.getElementById('yb-video' + this.videoProp.dataId));
				// 观测更新的数据在 view 层可以直接访问到
				myVideo.setOption(this.videoProp);
			},
			propWatcher (newVal, oldVal={}) {
				setTimeout(() => {
					if ( newVal.src != oldVal.src ) {
						if ( newVal.src ) {
							this.switchVideo()
						}
					}
					if ( JSON.stringify(newVal.segments) != JSON.stringify(newVal.segments) ) {
						if ( newVal.segments.length > 0 ) {
							this.switchVideo()
						}
					}
					if ( newVal.barrages.length > 0 && oldVal.barrages &&  oldVal.barrages.length == 0 ) {
						if ( newVal.barrageShow ) {
							this.setBarrages(newVal.barrages)
						}
					}
					if ( this.dp && this.dom ) {
						if ( newVal.state != oldVal.state ) {
							if ( this.dp && this.dp?.readyState > 0 ) {
								if ( newVal.state == 'play' ) {
									this.dp ? this.dp.play() : null
								}
								if ( newVal.state == 'pause' ) {
									this.dp ? this.dp.pause() : null
								}
								if ( newVal.state == 'toggle' ) {
									if ( this.dp?.paused ) {
										this.dp.play()
									} else {
										this.dp.pause()
									}
								}
							}
							this.triggerMethod('resetData')
						}
						if ( newVal.seekTime != oldVal.seekTime ) {
							if ( newVal.seekTime > -1 ) {
								if ( this.dp ) {
									this.dp.currentTime = newVal.seekTime
									this.triggerMethod('resetData')
								}
							}
						}
						if ( newVal.barrageShow != oldVal.barrageShow ) {
							this.setBarrages(newVal.barrages)
						}
						if ( newVal.barrageConfig != oldVal.barrageConfig ) {
							this.barrage && this.barrage.setConfig(JSON.parse(newVal.barrageConfig))
						}
						if ( newVal.playbackRate != oldVal.playbackRate ) {
							this.dp.playbackRate = newVal.playbackRate
						}
						if ( newVal.volume != oldVal.volume ) {
							this.dp.volume = newVal.volume
						}
						if ( newVal.poster != oldVal.poster ) {
							this.dp.poster = newVal.poster
						}
						if ( newVal.muted != oldVal.muted ) {
							this.dp.muted = newVal.muted
						}
						if ( newVal.loop != oldVal.loop ) {
							this.dp.loop = newVal.loop
						}
						if ( newVal.autoplay != oldVal.autoplay ) {
							this.dp.autoplay = newVal.autoplay
						}
						if ( newVal.preload != oldVal.preload ) {
							this.dp.preload = newVal.preload
						}
						if ( JSON.stringify(newVal.danmu) != JSON.stringify(oldVal.danmu) ) {
							if ( newVal.danmu?.text && this.barrage ) {
								let d = new Date()
								this.barrage.add(Object.assign({}, {
									key: d.getFullYear() + d.getMonth() + d.getDate() + d.getMinutes() + d.getSeconds() + d.getMilliseconds() + Utils.randomString(16),
								}, newVal.danmu, {
									time: newVal.danmu.time && newVal.danmu.time >= 0 ? parseFloat(newVal.danmu.time) * 1000 : this.dp.currentTime * 1000
								}));
							}
							this.triggerMethod('resetData')
						}
						if ( newVal.pictureInPicture != oldVal.pictureInPicture ) {
							if ( newVal.pictureInPicture ) {
								this.dp ? this.dp.requestPictureInPicture() : null
							} else {
								document && document.pictureInPictureElement && document.exitPictureInPicture()
							}
						}
						if ( newVal.objectFit != oldVal.objectFit ) {
							if ( this.dp ) {
								this.dp.style.objectFit = newVal.objectFit
							}
						}
					}
					if ( newVal.fullscreen != oldVal.fullscreen ) {
						if ( newVal.fullscreen ) {
							this.launchFullscreenRender()
						} else {
							this.exitFullscreenRender()
						}
					}
				}, 100)
			},
			switchVideo () {
				this.triggerMethod('resetData')
				if ( this.hls ) {
					this.hls.destroy()
					this.hls = null
				}
				if ( this.flv ) {
					this.flv.pause()
					this.flv.destroy()
					this.flv = null
				}
				if ( this.dp ) {
					let el = this.dom.getElementsByClassName('content')[0]
					el.removeChild(this.dp)
					el = null
					this.dp = null
				}
				this.initVideo()
				if ( this.videoProp.barrageShow ) {
					this.setBarrages(this.videoProp.barrages)
				}
			},
			initVideo () {
				let el = this.dom.getElementsByClassName('content')[0]
				this.dp = document.createElement('VIDEO')
				this.dp.setAttribute('style', 'width: 100%;height: 100%')
				this.videoProp.muted && this.dp.setAttribute('muted', this.videoProp.muted)
				this.videoProp.autoplay && this.dp.setAttribute('autoplay', this.videoProp.autoplay)
				this.videoProp.loop && this.dp.setAttribute('loop', this.videoProp.loop)
				this.videoProp.preload && this.dp.setAttribute('preload', this.videoProp.preload)
				this.dp.setAttribute('playbackRate', this.videoProp.playbackRate)
				this.dp.setAttribute('volume', this.videoProp.volume)
				this.dp.setAttribute('poster', this.videoProp.poster)
				this.dp.setAttribute('x-webkit-airplay', true)
				this.dp.setAttribute('webkit-playsinline', true)
				this.dp.setAttribute('playsinline', true)
				this.dp.setAttribute('x5-video-player-type', 'h5')
				this.dp.setAttribute('x5-video-play', true)
				this.dp.setAttribute('crossOrigin', 'anonymous')
				this.dp.innerHTML = '您的浏览器不支持 video 标签。'
				el.appendChild(this.dp)
				this.dp.style.objectFit = this.videoProp.objectFit
				this.setVideoUrl()
				this.dp.addEventListener('canplay', () => {
					this.triggerMethod('onCanplay', {
						duration: this.dp.duration
					})
				})
				this.dp.addEventListener('loadedmetadata', () => {
					this.triggerMethod('onLoadedmetadata', {
						duration: this.dp.duration
					})
					this.dp.currentTime = this.videoProp.initialTime
				})
				this.dp.addEventListener('play', () => {
					this.triggerMethod('onPlay')
					if ( this.barrage ) {
						this.barrage.goto((this.dp.currentTime || 0) * 1000)
						this.barrage.play()
					}
				})
				this.dp.addEventListener('pause', () => {
					this.triggerMethod('onPause')
					this.barrage && this.barrage.pause()
				})
				this.dp.addEventListener('ended', () => {
					this.triggerMethod('onEnded')
				})
				this.dp.addEventListener('seeking', () => {
					this.triggerMethod('onSeeking', {
						currentTime: this.dp.currentTime
					})
				})
				this.dp.addEventListener('seeked', () => {
					this.triggerMethod('onSeeked', {
						currentTime: this.dp.currentTime
					})
					this.barrage && this.barrage.goto(this.dp.currentTime * 1000)
				})
				this.dp.addEventListener('timeupdate', (e) => {
					this.triggerMethod('onTimeupdate', {
						currentTime: this.dp.currentTime
					})
					if ( this.canvas && this.drawTime == 0 ) {
						this.context.drawImage(e.target, 0, 0, this.canvas.width, this.canvas.height);
						this.drawTime = 1
						window.setTimeout(() => {
							this.drawTime = 0
						}, 200)
					}
				})
				this.dp.addEventListener('waiting', () => {
					this.triggerMethod('onWaiting', {
						currentTime: this.dp.currentTime
					})
				}),
				this.dp.addEventListener('playing', () => {
					this.triggerMethod('onPlaying', {
						currentTime: this.dp.currentTime
					})
				})
				this.dp.addEventListener('progress', () => {
					if( this.dp.buffered.length != 0 ){
						this.triggerMethod('onProgress', {
							start: this.dp.buffered.start(0),
							end: this.dp.buffered.end(0),
						})
					}
				})
				this.dp.addEventListener('abort', () => {
					this.triggerMethod('onAbort')
				})
				this.dp.addEventListener('error', (e) => {
					this.triggerMethod('onErr', e)
				})
				this.dp.addEventListener('volumechange', () => {
					this.triggerMethod('onVolumechange', {
						volume: this.dp.volume
					})
				})
				this.dp.addEventListener('ratechange', () => {
					this.triggerMethod('onRatechange', {
						playbackRate: this.dp.playbackRate
					})
				})
				this.dp.addEventListener('enterpictureinpicture', () => {
					this.triggerMethod('onEnterpictureinpicture')
				})
				this.dp.addEventListener('leavepictureinpicture', () => {
					this.triggerMethod('onLeavepictureinpicture')
				})
			},
			setVideoUrl () {
				this.isParsed = false
				if ( this.videoProp.src ) {
					if ( this.videoProp.formats == 'm3u8' ) {
						this.setM3u8()
					} else if ( this.videoProp.formats == 'flv' ) {
						this.setFlv()
					} else if ( this.videoProp.formats == 'auto' || !this.videoProp.formats ) {
						let suffix = Utils.suffix(this.videoProp.src.split('?')[0])
						if ( suffix == 'mp4' || suffix == 'ogg' || suffix == 'webm' ) {
							this.setBlob()
						} else if ( suffix == 'm3u8' ) {
							this.setM3u8()
						} else if ( suffix == 'flv' ) {
							this.setFlv()
						}
					} else {
						this.setBlob()
					}
				} else {
					this.setFlv()
				}
			},
			setBlob () {
				if ( this.videoProp.enableBlob ) {
					let xhr = new XMLHttpRequest()
					xhr.open('GET', this.videoProp.src, true)
					xhr.responseType = 'blob'
					xhr.onload = () => {
						if ( xhr.status == 200 ) {
							try {
								this.dp.srcObject = xhr.response
								this.dp.load()
							} catch (error) {
								const URL = window.URL || window.webkitURL
								this.dp.src = URL.createObjectURL(xhr.response);
								this.dp.load()
							}
						} else {
							this.dp.src = this.videoProp.src
							this.dp.load()
						}
						xhr.abort()
					}
					xhr.onerror = () => {
						this.dp.src = this.videoProp.src
						this.dp.load()
					}
					xhr.send()
				} else {
					this.dp.src = this.videoProp.src
					this.dp.load()
				}
			},
			setM3u8 () {
				try{
					let Hls = require('hls.js')
					if ( Hls.isSupported() ) {
						this.hls = new Hls()
						this.hls.loadSource(this.videoProp.src)
						this.hls.attachMedia(this.dp);
						this.hls.on(Hls.Events.MANIFEST_PARSED, (e) => {
							this.isParsed = true
						})
						this.hls.on(Hls.Events.ERROR, (e, data) => {
							if ( !this.isParsed ) {
								this.triggerMethod('onErr', data)
								this.hls.destroy()
								this.hls = null
							}
						})
					} else {
						this.dp.src = this.videoProp.src
						this.dp.load()
					}
				}catch(e){
					this.triggerMethod('onErr')
				}
			},
			setFlv () {
				let Flv = require('flv.js')
				if (Flv.isSupported()) {
					this.flv = Flv.createPlayer(
						{
							type: "flv",
							isLive: this.videoProp.isLive,
							url: this.videoProp.src ? this.videoProp.src : null,
							segments: this.videoProp.segments.length > 0 ? this.videoProp.segments : null
						},
						Object.assign({}, {
							enableWorker: false, //不启用分离线程
							enableStashBuffer: false, //关闭IO隐藏缓冲区
							isLive: true,
							lazyLoad: false
						}, this.videoProp.flvConfig)
					)
				} else {
					this.dp.src = this.videoProp.src
					this.dp.load()
				}
				this.flv.on('error', e => {
					this.triggerMethod('onErr', e)
					this.flv.pause()
					this.flv.destroy()
					this.flv = null
				})
				this.flv.attachMediaElement(this.dp);
				this.flv.load();
			},
			//初始化弹幕
			initBarrage (example = []) {
				let Barrage = require('barrage-ui')?.default
				if ( Barrage ) {
					this.barrage = new Barrage({
						container: this.dom.getElementsByClassName('barrage')[0], // 父级容器或ID
						data: example.map(exa => {
							return Object.assign({}, exa, {
								time: parseFloat(exa.time) * 1000
							})
						}), // 弹幕数据
						config: JSON.parse(this.videoProp.barrageConfig)
					})
					if ( !this.dp.paused ) {
						this.barrage.goto((this.dp.currentTime || 0) * 1000)
						this.barrage.play()
					}
					let ResizeObserver = require('resize-observer-polyfill')?.default
					if ( ResizeObserver ) {
						this.resizeObserver = new ResizeObserver(entries => {
							entries.forEach((entry, key) => {
								if ( key == entries.length - 1 ) {
									let canvas = this.dom.getElementsByClassName('barrage-canvas')[0]
									canvas.width = entry.contentRect?.width
									canvas.height = entry.contentRect?.height
								}
							})
						});
						this.resizeObserver.observe(this.dom.getElementsByClassName('barrage')[0]);
					}
				} else {
					this.triggerMethod('closeBarrage')
				}
			},
			destroyBarrages () {
				let barrageEl = this.dom.getElementsByClassName('barrage')[0]
				barrageEl.innerHTML = ''
				barrageEl.setAttribute('class', 'barrage')
				barrageEl = null
				this.barrage = null
				this.resizeObserver?.disconnect()
			},
			setBarrages (barrages = []) {
				if ( this.videoProp.barrageShow ) {
					if ( this.barrage ) {
						this.barrage.setData([])
						this.barrage.setData(barrages.map(exa => {
							return Object.assign({}, exa, {
								time: parseFloat(exa.time) * 1000
							})
						}) || [])
						this.barrage.replay()
						if ( this.dp.paused ) {
							this.barrage.pause()
						}
					} else {
						this.initBarrage(barrages)
					}
				} else {
					this.destroyBarrages()
				}
			},
			switchFullscreenRender () {
				if ( document.fullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || document.webkitFullscreenElement || (this.dom && this.dom.style.position == 'fixed') ) {
					this.exitFullscreenRender()
				} else {
					this.launchFullscreenRender()
				}
			},
			launchFullscreenRender () {
				if ( document.fullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || document.webkitFullscreenElement ) {
					return
				}
				const rfs = document.documentElement.requestFullscreen || document.documentElement.webkitRequestFullscreen || document.documentElement.mozRequestFullscreen || document.documentElement.requestFullScreen || document.documentElement.webkitRequestFullScreen || document.documentElement.mozRequestFullScreen
				if ( typeof rfs != 'undefined' && rfs ) {
					this.dom.addEventListener('fullscreenchange', this.fullscreenchanged);
					this.dom.addEventListener('mozfullscreenchange', this.fullscreenchanged);
					this.dom.addEventListener('msfullscreenchange', this.fullscreenchanged);
					this.dom.addEventListener('webkitfullscreenchange', this.fullscreenchanged);
					rfs.call(this.dom)
				} else {
					this.dom.style.position = 'fixed'
					this.dom.style.left = 0
					this.dom.style.right = 0
					this.dom.style.bottom = 0
					this.dom.style.top = 0
					this.dom.style.zIndex = 999
					this.triggerMethod('fullscreenChange', true)
				}
			},
			exitFullscreenRender () {
				if ( document.fullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || document.webkitFullscreenElement ) {
					const cfs = document.exitFullscreen || document.mozCancelFullScreen || document.msExitFullscreen || document.webkitExitFullscreen
					if ( typeof cfs != 'undefined' && cfs ) {
						cfs.call(document)
					}
				} else {
					if ( this.dom && this.dom.style.position == 'fixed' ) {
						this.dom.style.position = 'static'
						this.dom.style.left = 'inherit'
						this.dom.style.right = 'inherit'
						this.dom.style.bottom = 'inherit'
						this.dom.style.top = 'inherit'
						this.dom.style.zIndex = 'inherit'
						this.triggerMethod('fullscreenChange', false)
					}
				}
			},
			fullscreenchanged (event) {
				if (document.fullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || document.webkitFullscreenElement) {
					this.triggerMethod('fullscreenChange', true)
				} else {
					this.triggerMethod('fullscreenChange', false)
				}
			},
			triggerMethod (name, args) {
				// #ifndef H5
				this.$ownerInstance.callMethod(name, args);
				// #endif
				// #ifdef H5
				this[name](args);
				// #endif
			}
		}
	}
</script>
<!-- #endif -->

<style scoped>
	.yb-video {
		position: relative;
		overflow: hidden;
	}
	.yb-video .content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 100%;
		height: 100%;
	}
	.yb-video .barrage {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}
	.yb-video-settings {
		position: absolute;
		bottom: 15px;
		right: 15px;
		min-width: 125px;
		max-height: calc(100% - 30px);
		background-color: #fff;
		box-shadow: 0 0 10px rgba(0,0,0,.4);
		transition: transform .3s;
		transform-origin: bottom right;
	}
	.yb-video-setting {
		padding: 5px 10px;
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.yb-video-setting:active {
		background-color: #999;
	}
	.yb-video-setting-text {
		font-size: 14px;
		margin-left: 5px;
	}
	.yb-video-setting-scroll {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}
	.yb-video-contorls {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		padding-top: 10px;
		transition: transform .3s;
	}
	.yb-video-contorls-top {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 0 13px;
	}
	.yb-video-contorls-shadow {
		box-shadow: 0 -20px 30px 26px rgba(0,0,0,.8);
	}
	.yb-video-contorls-progress {
		margin: 15px 18px;
	}
	.yb-video-contorls-time {
		font-size: 13px;
		color: #fff;
		margin-left: 10px;
		flex: 1;
	}
	.yb-video-contorls-top-btn {
		margin-left: 25px;
	}
	/deep/ uni-slider {
		margin: 0;
	}
	/deep/ .uni-slider-wrapper {
		min-height: 0;
	}
	/deep/ .uni-slider-tap-area {
		padding: 0;
	}
</style>
