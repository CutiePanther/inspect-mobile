export default {
	timestampFormat: (timestamp) => {
		const zeroize = (num) => {
			return (String(num).length === 1 ? '0' : '') + num
		}
		const curTimestamp = parseInt(new Date.getTime())
		const timestampDiff = curTimestamp - timestamp
		const curDate = new Date(curTimestamp)
		const tmDate = new Date(timestamp)
		const Y = tmDate.getFullYear()
		const m = tmDate.getMonth() + 1
		const d = tmDate.getDate()
		const H = zeroize(tmDate.getHours())
		const i = zeroize(tmDate.getMinutes())
		const s = zeroize(tmDate.getSeconds())
		if(timestampDiff < 60) { //1min
			return '刚刚'
		} else if (timestampDiff < 3600) {
			return Math.floor(timestampDiff/60) + '分钟前'
		} else if (curDate.getFullYear() === Y && curDate.getMonth() + 1 === m && curDate.getDate() === d) {
			return `今天${H}:${i}`
		} else {
			const newDate = new Date((curTimestamp - 86400) * 1000)
			if (newDate.getFullYear() === Y && newDate.getMonth() + 1 === m && newDate.getDate() === d) {
				return `昨天${H}:${i}`
			} else {
				return `${Y}-${m}-${d}`
			}
		}
	},
	timeFormat: (time, format) => {
		const zeroize = (num) => {
			return (String(num).length === 1 ? '0' : '') + num
		}
		if(!(time instanceof Date)) {
			time = new Date(time)
		}
		let [year, month, day, hour, minutes, seconds] = [
			time.getFullYear(),
			zeroize(time.getMonth() + 1),
			zeroize(time.getDate()),
			zeroize(time.getHours()),
			zeroize(time.getMinutes()),
			zeroize(time.getSeconds())
		]
		switch (format) {
			case 'Y-M-D':
				return `${year}-${month}-${day}`
			case 'Y.M.D':
				return `${year}.${month}.${day}`
			case '年-月-日 H:M:S':
				return `${year}年${month}月${day}日 ${hour}:${minutes}:${seconds}`
			case 'H:M:S':
				return `${hour}:${minutes}:${seconds}`
			default:
				return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`
		}
	},
	backRouter(self, url = 'pages/index/index') {
		self.$u.route({
			type: 'redirectTo',
			url
		})
	}
}