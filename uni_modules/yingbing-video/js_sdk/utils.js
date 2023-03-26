export default {
	/* *
	 * 秒数转化为时分秒
	 * @param {String} value 秒数
	 * */
	timesFormat (value) {
		let hours = Math.floor(value / 60 / 60 % 60) >= 10 ? Math.floor(value / 60 / 60 % 60) : '0' + Math.floor(value / 60 / 60 % 60);
		let minutes = Math.floor(value / 60 % 60) >= 10 ? Math.floor(value / 60 % 60) : '0' + Math.floor(value / 60 % 60);
		let seconds = Math.floor(value % 60) >= 10 ? Math.floor(value % 60) : '0' + Math.floor(value % 60);
		return hours == '00' ? (minutes + ':' + seconds) : (hours + ':' + minutes + ':' + seconds);
	},
	/* *
	 * 时间转化为秒数
	 * @param {String} time 时间（HH:mm:ss）
	 * */
	time2seconds (time){
		const seconds = parseInt(time.split(':')[0]) * 60 + parseInt(time.split(':')[1].split('.')[0]) + parseInt(time.split(':')[1].split('.')[1]) / 1000;
		return seconds; 
	},
	/**
	 * 生成随机字符串
	 * @param {Number} len 长度
	*/
	randomString (len) {
		len = len || 32;
		var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
		var maxPos = $chars.length;
		var pwd = '';
		for (let i = 0; i < len; i++) {
		　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
		}
		return pwd;
	},
	/* *
	 * 获取文件后缀
	 * @param {String} name 带后缀的文件名称
	 * */
	suffix (name) {
	  	//获取图片后缀
	  	let fileName = name.lastIndexOf(".");
	  	let fileNameLength = name.length;
	  	let fileFormat = name.substring(fileName + 1, fileNameLength);
	  	return fileFormat;
	},
}
