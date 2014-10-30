/**
 * 
 * @param {Object} el
 * @param {Object} data
 * @param {Object} options
 */
function MelonChart(el, data, option) {
	//初始化配置信息
	var options = option || {},
		theme = options.theme || "default";
	//复制配置
	this.configs = $.extend(true, {}, this.defaults);
	//存储图像数据
	this.datas = [];
	//验证配置
    this.validate(el, data, options);
    //激活主题配置
    this.setTheme(theme);
    //解析配置
    this.renderOptions(options);
    //解析数据
    this.renderData(data);
    //生成图片
    this.renderChart(el);
}

/*
 * 所有的对象会共享这些配置信息，并且一旦改变，会影响到其他所有的对象，所以必须进行复制
 * 
 * */
$.extend(MelonChart.prototype, {
	
	//主题列表
	themes : {
		
		//默认主题
		defaults : {
			
		},
		
		//蓝色主题
		redmond : {
			
		},
		
		//黑色主题
		dark : {
			
		}
		
	},
	
	/**
	 * 默认的配置 
	 */
	defaults : {
		
	}
	
});

/**
 * 
 */
$.extend(MelonChart.prototype, {
	
	/**
	 * 设置主题
 	 * @param {Object} theme
	 */
	setTheme : function(theme) {
		if(theme == "default") {
    		theme = theme + "s";
    	}
    	$.extend(true, this.configs, this.themes[theme]);
	},
	
	/**
	 * 解析配置信息
 	 * @param {Object} options
	 */
	renderOptions : function(options) {
		
	},
	
	/**
	 * 解析数据 
	 */
	renderData : function(data) {
		
	},
	
	/**
	 * 解析图片
 	 * @param {Object} el
	 */
	renderChart : function(el) {
		
	},
	
	/**
	 * 校验图形配置
	 * @param {Object} el
	 * @param {Object} data
	 * @param {Object} options
	 */
	validate : function(el, data, options) {
		
	},
	
	/**
	 * 设置系列标识
 	 * @param {Object} sl
	 */
	setSeriesLabel : function(options) {
		
	},
	
	/**
	 * 
     * @param {Object} xl
 	 * @param {Object} yl
	 */
	setAxisLabel : function(options) {
		
	},
	
	/**
	 * 设置Legend位置
 	 * @param {Object} pos
	 */
	setLegendPos : function(pos) {
		
	},
	
	/**
	 * 设置图形标题
 	 * @param {Object} title
	 */
	setTitle : function(title) {
		
	},
	
});

//专为PlotChart
var fontFamily = '"微软雅黑", "Times New Roman"';
function PlotChart(el, data, options) {
	MelonChart.apply(this, [el, data, options]);
}
//复制配置及方法
$.extend(true, PlotChart.prototype, MelonChart.prototype);
//
PlotChart.prototype.defaults = {
	
	animateReplot : false,
			
	//是否叠加
	stackSeries: false,

	seriesDefaults : {
		pointLabels : {
			show : true,
			hideZeros: true
		},
		fill: false,
    	fillAndStroke: false,
    	lineWidth:3, 
    	markerOptions: {
    		show : true,
    		size : 10,
    		style:'circle' 
    	},
		shadow : false,
		rendererOptions: {
            smooth: false
        }
	},

	cursor: {
       show: true,
       zoom: true
    },

	series : [],

	axes : {
		xaxis : {
			//renderer : $.jqplot.CategoryAxisRenderer,
			showTicks : true
		},
		
		yaxis : {
			showTicks : true
		}
	},

	animate : true,

	highlighter : {
		show : true,
		showLabel : true,
    	tooltipAxes: 'y',
    	sizeAdjust: 7.5 , 
    	tooltipLocation : 'ne'
	}
};
//主题
PlotChart.prototype.themes = {
	//默认主题
	defaults : {
			seriesColors : ["red", "yellow"],
			
			grid : {
				backgroundColor : "#FFF",
				borderWidth : 1,
				gridLineColor : '#dfe2ea',
				gridLineWidth : 1.1,
				borderColor : '#dfe2ea',
				drawGridlines : true,
				shadow : false
			},
			
			title : {
				fontFamily : fontFamily,
				textColor : 'black'
			},

			axesStyles : {
				borderWidth : 0,
				ticks : {
					fontSize : '12pt',
					fontFamily : fontFamily,
					textColor : 'black'
				},
				label : {
					fontFamily : fontFamily,
					textColor : 'black'
				}
			},
			
			legend : {
				textColor : 'black',
				fontFamily : fontFamily,
				background : 'white',
				border : '1px solid black',
				show : true,
				placement : 'ne'
			}
		},
		
		//蓝色主题
		redmond : {
			seriesColors : ["white", "yellow", "red", "blue", "orange"],
			grid : {
				backgroundColor : "orange",
				borderWidth : 2,
				gridLineColor : '#dfe2ea',
				gridLineWidth : 1.1,
				borderColor : '#dfe2ea',
				drawGridlines : true,
				shadow : false
			},
			
			title : {
				fontFamily : fontFamily,
				textColor : 'black'
			},

			axesStyles : {
				borderWidth : 0,
				ticks : {
					fontSize : '12pt',
					fontFamily : fontFamily,
					textColor : 'black'
				},
				label : {
					fontFamily : fontFamily,
					textColor : 'black'
				}
			},
			
			legend : {
				textColor : 'black',
				fontFamily : fontFamily,
				background : 'white',
				border : '1px solid black',
				show : true,
				placement : 'ne'
			}
			
		},
		
		//黑色主题
		dark : {
			seriesColors : ["white", "yellow"],
			
			grid : {
				backgroundColor : "black"
			},
			
			title : {
				fontFamily : fontFamily,
				textColor : 'black'
			},

			axesStyles : {
				borderWidth : 0,
				ticks : {
					fontSize : '12pt',
					fontFamily : fontFamily,
					textColor : 'black'
				},
				label : {
					fontFamily : fontFamily,
					textColor : 'black'
				}
			},
			
			legend : {
				textColor : 'black',
				fontFamily : fontFamily,
				background : 'white',
				border : '1px solid black',
				show : true,
				placement : 'ne'
			}
		}
};
