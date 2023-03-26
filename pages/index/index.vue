
	<view class="content">
		<view class="aq" v-for="item in aq">
			<view class="question">
				<view class="left">
					<image class="icon" src="https://yunbei123.oss-cn-shanghai.aliyuncs.com/zxgsi/image/8900/23/02/xmYqJNUOSaunwKHbUxMsj2KcagOlX0k2.png"></image>
				</view>
				<view class="right">
					<text>{{item.question}}</text>
				</view>
			</view>

			<view class="answer">
				<view class="left">
					<image class="icon" src="https://yunbei123.oss-cn-shanghai.aliyuncs.com/zxgsi/image/8900/23/02/fjODwNN6YokofUu5PWxTvLDUiUXsrs4B.png"></image>
				</view>
				<view class="right">
					<view class="wait" v-if="item.answer=='' && item.error!=true"></view>
					<text class="error" v-else-if="item.error==true">服务器繁忙，请重试</text>
					<text v-else @touchstart="handleTouchStart(item.answer)" @touchend="handleTouchEnd">{{item.answer}}</text>
				</view>
			</view>
		</view>

		    <view class="tips" v-if="aq.length<=0">
			<view class="">
				制作人：b站e装机反馈qq群611966551，微信公众号：易档手表社区EDSQ，目前版本1.1修复删除上面文字太多置顶
			</view>
			<view class="words">
				<block v-for="item in words"><tui-tag class="tag" type="black" padding="20rpx 30rpx" @click="handleClick(item)">{{item}}</tui-tag></block>
			</view>
		</view>

		<view class="send">
			<input class="in" type="text" placeholder="发送消息给 AI" @confirm="send"
				v-model="question" />
			<image class="icon" @click="send"></image>
		</view>
		
		<tui-modal :show="modal" custom>
			<view class="tui-modal-custom">
				<textarea class="tui-modal-custom-text" v-model="custom_data" maxlength="-1"></textarea>
				<tui-button height="72rpx" :size="28" shape="circle" @click="modal=false">关闭</tui-button>
			</view>
		</tui-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				question: '',
				aq: [],
				timer: null,
				bottom: 0,
				custom_data: '',
				modal: false,
				isloading: false,
				words: ['你干嘛是什么意思','什么是只因','什么是蔡徐坤', '什么是鸡你太美', '用Python写一个猜数字游戏并运行它', '写一篇科幻小说', '如何问一个让 AI 也答不出的问题',  'Ai 会替代人类工作吗？', '写一篇1万字的Java后端论文','写一个网页代码','今日热门','原神高级玩法','王者荣耀高级玩法','我的世界高级玩法']
			}
		},
		onLoad() {
		},
		methods: {
			handleClick(data) {
				this.question = data
				this.send()
			},
			send() {
				let question = this.question
				if(this.isloading) {
					uni.showToast({
						icon: 'none',
						title: 'AI正在思考，请稍等也可以关注我的qq或者公众号也可以像我反馈文字快捷方式'
					})
					return
				}
				if(!question) {
					uni.showToast({
						icon:'none',
						title: '内容不能为空'
					})
					return
				}
				this.isloading = true
				this.question = ''
				this.bottom += uni.getSystemInfoSync().screenHeight
				this.$nextTick(function() {
				        setTimeout(() => {
				            uni.pageScrollTo({
				              scrollTop: this.bottom,
				              duration: 0
				            })
				          }, 300) // 要加点延迟, 不然有可能不生效
					});
				let id = new Date().getTime()
				let prompt = ''
				this.aq.push({
					'id': id,
					'question': question,
					'answer': '',
				})
				this.aq.forEach(item => {
					prompt += `Human:${item.question}\n`
					prompt += `AI:${item.answer}\n`
				})
				// console.log(prompt)
				uni.request({
					url: 'https://api.forchange.cn',
					method: 'POST',
					data: {
						"prompt": prompt
					},
					timeout: 99999999999999,
					success: (res) => {
						this.aq.forEach(item => {
							if (item.id == id) {
								item.answer = res.data.choices[0].text
							}
						})
						this.isloading = false
					},
					fail: (err) => {
						console.log(err)
						this.aq.forEach(item => {
							if (item.id == id) {
								item.error = true
							}
						})
						uni.showToast({
							icon: 'none',
							title: '服务器繁忙，请重试'
						})
						this.isloading = false
					}
				})
			},
			copy(data) {
				uni.setClipboardData({
					data: data
				})
			},
			handleTouchStart(data) {
				this.timer = setTimeout(() => {
					// uni.setClipboardData({
					// 	data: data,
					// 	success: () => {
					// 		uni.showToast({
					// 			icon: 'none',
					// 			title: '复制成功'
					// 		})
					// 	}
					// })
					this.custom_data = data
					this.modal = true
				}, 800)
			},
			handleTouchEnd() {
				clearTimeout(this.timer)
			}
		}
	}
</script>

<style scoped lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: #1F2937;
		font-size: 30rpx;
		width: 100%;
		padding-bottom: 140rpx;
	}

	.tips {
		text-align: center;
		padding: 100rpx;
	}

	.aq {
		width: 100%;
	}

	.question,
	.answer {
		padding: 30rpx;
		display: flex;
		line-height: 1.8;

		.left {}

		.right {
			position: relative;
			padding-left: 30rpx;
		}

		.icon {
			height: 60rpx;
			width: 60rpx;
		}
	}

	.question {
		border-top: 1px solid #e5e7eb;
		border-bottom: 1px solid #e5e7eb;
	}

	.answer {
		background-color: #f8f8f8;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.send {
		position: fixed;
		bottom: 40rpx;
		width: 100%;

		.in {
			margin: 10rpx 30rpx;
			border: 1px solid #e5e7eb;
			padding: 24rpx 54rpx 24rpx 24rpx;
			border-radius: 10rpx;
			box-shadow: 0 0 10px rgba(0, 0, 0, .1);
			background-color: #fff;
			font-size: 30rpx;
		}
		
		.icon {
			width: 60rpx;
			height: 60rpx;
			background-color: #1F2937;
			background: url(data:image/svg+xml;base64,PHN2ZyBzdHJva2U9ImN1cnJlbnRDb2xvciIgZmlsbD0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIKCQkJCWNsYXNzPSJoLTQgdy00IHJvdGF0ZS05MCIgaGVpZ2h0PSIxZW0iIHdpZHRoPSIxZW0iIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CgkJCQk8cGF0aAoJCQkJCWQ9Ik0xMC44OTQgMi41NTNhMSAxIDAgMDAtMS43ODggMGwtNyAxNGExIDEgMCAwMDEuMTY5IDEuNDA5bDUtMS40MjlBMSAxIDAgMDA5IDE1LjU3MVYxMWExIDEgMCAxMTIgMHY0LjU3MWExIDEgMCAwMC43MjUuOTYybDUgMS40MjhhMSAxIDAgMDAxLjE3LTEuNDA4bC03LTE0eiI+CgkJCQk8L3BhdGg+CgkJCTwvc3ZnPg==);
			background-repeat: no-repeat;
			background-position: center;
			rotate: 90deg;
			position: absolute;
			right: 40rpx;
			top: 50%;
			transform: translateX(-50%);
			z-index: 99;
		}
	}

	.wait {
		background-color: rgba(0, 0, 0, 0.5);
		width: 8px;
		height: 24px;
		animation: mywait 1s infinite;
	}
	
	.error {
		color: #eb4d4b;
	}

	@keyframes mywait {
		0% {
			opacity: 1;
		}

		100% {
			opacity: 0;
		}
	}
	
	.tui-modal-custom-text {
		width: 100%;
		height: 60vh;
		margin-bottom: 30rpx;
	}
	
	.words {
		margin-top: 60rpx;
		text-align: left;
		.tag {
			// max-width: 200rpx;
			display: inline-block;
			margin: 20rpx 20rpx 20rpx 0 !important;
			text-align: left;
		}
	}
</style>
 -->