$(document).ready(function(){
	//1.点击按钮可以在屏幕中间显示一个窗口
	//2.点击按钮2可以在屏幕的左下角显示一个窗口
	//3.页面装载完成后，可以在屏幕右下角飘上一个窗口，并且窗口慢慢淡出

    /*
	 *$(".title img").click(function(){
	 *    //关闭按钮点击之后，关闭窗口
	 *    $(this).parent().parent().hide("slow");
	 *});
     */
	var centerwin = $("#center");
	var leftwin = $("#left");
	var rightwin = $("#right");
	$("#centerpop").click(function(){
		//鼠标点击按钮之后，把id为center的窗口显示在页面中间
		//计算位于屏幕中间的窗口的左边界和上边界的值
		//浏览器可视区域的宽和高，当前窗口的宽和高
		//需要考虑到横向滚动条的当前左边界值以及纵向滚动条的当前上边界值
		centerwin.show("slow");
	});
	$("#leftpop").click(function() {
		leftwin.slideDown("slow");
	});

	setTimeout(function () {
		centerwin.mywin({left: "center", top: "center"});
		leftwin.mywin({left: "left", top: "bottom"}, function(){
			leftwin.slideUp("slow");
		});
		var windowobj = $(window);
		var cwinwidth = rightwin.outerWidth(true);
		var cwinheight = rightwin.outerHeight(true);
		var browserwidth = windowobj.width();
		var browserheight = windowobj.height();
		var	scrollLeft = windowobj.scrollLeft();
		var	scrollTop = windowobj.scrollTop();
		var rleft = scrollLeft + browserwidth - cwinwidth;
		if ($.browser.safari) {
			rleft = rleft - 15;
		}
		if ($.browser.opera) {
			rleft = rleft + 15;
		}
		if ($.browser.msie && $.browser.version.indexOf("8") >= 0) {
			rleft = rleft - 20;
		}
		rightwin.mywin({left: "right", top: "bottom"}, function() {
			rightwin.hide();
		},{left: rleft, top: scrollTop + browserheight}).fadeOut(15000).dequeue();
	},500);

});

/*
 *$.fn.hello = function() {
 *    alert("hello:" + this.val());
 *    return this;
 *}
 */

/**
 *@param position表示窗口的最终位置,包含两个属性，一个是left，一个是top
 *@param hidefunc表示执行窗口隐藏的方法
 *@param initPos表示窗口初始位置，包含两个属性，一个是left，一个是top
 */
$.fn.mywin = function(position, hidefunc, initPos) {
	if (position && position instanceof Object) {
		var positionleft = position.left;
		var positiontop = position.top;
		
		var left;
		var top;
		var windowobj = $(window);
		var currentwin = this;
		var cwinwidth;
		var cwinheight;

		var browserwidth;
		var browserheight;
		var scrollLeft;
		var scrollTop;
		//计算浏览器当前可视区域的宽和高，以及滚动条左边界，上边界的值
		function getBrowserDim() {
			browserwidth = windowobj.width();
			browserheight = windowobj.height();
			scrollLeft = windowobj.scrollLeft();
			scrollTop = windowobj.scrollTop();	
		}		
		//计算窗口真实的左边界值
		function calLeft(positionleft, scrollLeft, browserwidth, cwinwidth) {
			if (positionleft && typeof positionleft == "string") {
				if (positionleft == "center") {
					left = scrollLeft + (browserwidth - cwinwidth) / 2;	
				} else if (positionleft == "left") {
					left = scrollLeft;	
				} else if (positionleft == "right") {
					left = scrollLeft + browserwidth - cwinwidth;
					if ($.browser.safari) {
						left = left - 15;
					}
					if ($.browser.opera) {
						left = left + 15;
					}
					if ($.browser.msie && $.browser.version.indexOf("8") >= 0) {
						left = left - 20;
					}
				} else  {
					left = scrollLeft + (browserwidth - cwinwidth) / 2;	
				}
			} else if (positionleft && typeof positionleft == "number") {
				left = positionleft;
			} else {
				left = 0;
			}
		}
		//计算窗口真实的上边界值		
		function calTop(positiontop, scrollTop, browserheight, cwinheight) {
			if (positiontop && typeof positiontop == "string") {
				if (positiontop == "center") {
					top = scrollTop + (browserheight - cwinheight) / 2;
				} else if (positiontop == "top") {
					top = scrollTop;
				} else if (positiontop == "bottom") {
					top = scrollTop + browserheight - cwinheight;
					if ($.browser.opera) {
						top = top - 25;
					}
				} else {
					top = scrollTop + (browserheight - cwinheight) / 2;
				}
			} else if (positiontop && typeof positiontop == "number") {
				top = positiontop;
			} else {
				top = 0;
			}
		}
		//移动窗口的位置
		function moveWin() {
			calLeft(currentwin.data("positionleft"), scrollLeft, browserwidth, cwinwidth);
			calTop(currentwin.data("positiontop"), scrollTop, browserheight, cwinheight);
			currentwin.animate({
				left: left,
				top: top
			},600);	
		}
		
		//定义关闭按钮的动作
		currentwin.children(".title").children("img").click(function() {
			if (!hidefunc) {
				currentwin.hide("slow")	;
			} else {
				hidefunc();
			}
		});

		if (initPos && initPos instanceof Object) {
			var initLeft = initPos.left;
			var initTop = initPos.top;
			if (initLeft && typeof initLeft == "number") {
				currentwin.css("left", initLeft);	
			} else {
				currentwin.css("left", 0);
			}
			if (initTop && typeof initTop == "number") {
				currentwin.css("top", initTop);	
			} else {
				currentwin.css("top", 0);
			}
			currentwin.show();
		}
		cwinwidth = currentwin.outerWidth(true);
		cwinheight = currentwin.outerHeight(true);
		currentwin.data("positionleft", positionleft);
		currentwin.data("positiontop", positiontop);
		getBrowserDim();
		moveWin();

		var scrollTimeout;
		//浏览器滚动条滚动时，移动窗口的位置
		$(window).scroll(function(){
			//判断一下当前窗口是否可见
			if (!currentwin.is(":visible")) {
				return;	
			}
			clearTimeout(scrollTimeout);
			scrollTimeout = setTimeout(function(){
				getBrowserDim();		
				moveWin();
			},300);
		});
		//浏览器大小改变时，移动窗口的位置
		$(window).resize(function(){
			//判断一下当前窗口是否可见
			if (!currentwin.is(":visible")) {
				return;	
			}
			getBrowserDim();	
			moveWin();	
		});
		//返回当前对象，以便可以级联的执行其他方法
		return currentwin;
	}
}
