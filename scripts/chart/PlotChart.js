define(["jquery.jqplot"], function() {

	var fontFamily = '"微软雅黑", "Times New Roman"';

	function PlotChart(el, data, config) {
		//初始化配置信息
		var options = config || {}, theme = options.theme || "default";
		//复制配置
		this.configs = $.extend(true, {}, this.defaults);
		//存储图像数据
		this.datas = [];
		//验证配置
		this.validate(el, data, options);
		//激活主题配置
		this.setTheme(theme);
		//解析配置
		this.renderOption(options);
		//解析数据
		this.renderData(data);
		//生成图片
		this.renderChart(el);
	}

	/**
	 * 主题配置
	 */
	PlotChart.prototype.themes = {
		defaults : {
			seriesColors : ["red", "yellow"],

			grid : {
				backgroundColor : "#CCC",
				borderWidth : 1,
				gridLineColor : 'red',
				gridLineWidth : 1.1,
				borderColor : '#dfe2ea',
				drawGridlines : true,
				shadow : false
			},

			title : {
				fontFamily : fontFamily,
				textColor : 'red'
			},

			axesStyles : {
				borderWidth : 0,
				ticks : {
					fontSize : '16px',
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

	/**
	 * 默认配置
	 */
	PlotChart.prototype.defaults = {

		animateReplot : false,

		animate : true,

		cursor : {
			show : true,
			zoom : true
		},

		series : [],

		//是否叠加
		stackSeries : false
	};

	//实现方法
	$.extend(PlotChart.prototype, {

		/**
		 * 检查配置是否正确
		 */
		validate : function(el, data, options) {
			if (!data) {
				throw new Error("没有配置数据");
			}
		},

		/**
		 * 生成图形之前，最后一次解析配置，可在此方法中更改或添加自定义属性
		 * @param {Object} options
		 */
		renderOption : function(options) {
			var legendLabels = options.legendLabels;
			//直接覆盖配置
			$.extend(true, this.configs, options);
			this.setLegendLabels(legendLabels);
		},

		/**
		 * 设置Label标签
		 */
		setLegendLabels : function(lbls) {
			if (lbls && $.trim(lbls)) {
				var legends = lbls.split(","), i = 0;
				for (; i < legends.length; i++) {
					var serie = {
						label : legends[i]
					};
					this.configs.series.push(serie);
				}
			}
		},

		renderChart : function(el) {
			this.plot = $.jqplot(el, this.datas, this.configs);
		},

		/**
		 * 解析数据配置
		 */
		renderData : function(data) {
			this.datas = data;
		},

		/**
		 * 设置主题
		 * @param {Object} theme
		 */
		setTheme : function(theme) {
			if (theme == "default") {
				theme = theme + "s";
			}
			$.extend(true, this.configs, this.themes[theme]);
		}
	});
	
	return PlotChart;
	
});
