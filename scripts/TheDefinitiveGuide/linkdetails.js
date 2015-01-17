/**
 * linkdetails.js
 * 这个常见的JavaScript模块查询有href属性但没有title属性的所有<a>元素
 * 并给它们注册onmouseover事件处理程序
 * 这个事件处理程序使用XMLHttpRequest HEAD请求取得链接资源的详细信息
 * 然后把这些详细信息设置为链接的title属性
 * 这样它们将会在工具提示中显示
 */
window.onload = function() {

	var whenReady = (function() {
		// 是否有机会使用跨域请求? Cross-Origin Resource Sharing 跨域资源共享
		var supportsCORS = (new XMLHttpRequest()).withCredentials !== undefined;
		var links = document.getElementsByTagName("a");

		for (var i = 0; i < links.length; i++) {
			var link = links[i];
			if (!link.href) continue;
			if (link.title) continue;
			// 如果这是一个跨域链接
			if (link.host !== location.host || link.protocol !== location.protocol) {
				link.title = "站外链接";					// 假设我们不能得到任何信息
				if (!supportsCORS) continue;
			}

			function mouseoverHandler(e) {
				var link = e.target || e.srcElement;		// <a>元素
				var url = link.href;

				var req = new XMLHttpRequest();
				req.open("HEAD", url);
				req.onreadystatechange = function() {
					if (req.readyState !== 4) return;
					if (req.status === 200) {
						var type = req.getResponseHeader("Content-Type");
						var size = req.getResponseHeader("Content-Length");
						var date = req.getResponseHeader("Last-Modified");

						link.title = "类型: " + type + " \n" + "大小: " + size + " \n" + "时间: " + date;
					} else {
						if (!link.title) {
							link.title = "Couldn't fetch details:\n" + req.status + " " + req.statusText;
						}
					}
				};

				req.send(null);

				// 移除处理程序，仅想一次获取这些头信息
				if (link.removeEventListener) {
					link.removeEventListener("mouseover", mouseoverHandler, false);
				} else {
					link.detachEvent("mouseover", mouseoverHandler);
				}
			}

			if (link.addEventListener) {
				link.addEventListener("mouseover", mouseoverHandler, false);
			} else {
				link.attachEvent("mouseover", mouseoverHandler);
			}

		}
	})();
}