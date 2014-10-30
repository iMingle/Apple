/**
 * 引用了Amcharts 
 */
function D3Chart(el, options) {
	this.chart = null; //设置对Chart的引用
	this.el = $(el);
	this.initConfigs(options);
	this.setConfigs(options);
}


$.extend(D3Chart, {
	
	defaults : {
	
		type : "serial",
	
		theme : "defaults",
	
		dataProvider : null,
	
		startDuration : 0,//是否使用动画
		
		legend : {
			useGraphSettings : true,
			align : "center",
			switchType : "v"

		},
		
		graphs : []
	
	},
	
	charts : {},
	
	addChart : function(el, chart) {
		this.charts.el = chart;
	},
	
	getChart : function(el) {
		return this.charts.el;
	}
	
});

$.extend(D3Chart.prototype, {
	
	addIfNotExit : function(object, key, value) {
		if(typeof object[key] === "undefined") {
			object[key] = value;
		}
	},
	
	trigger : function(eventType, params) {
		this.el.trigger(eventType, params);
	},
	
	//添加图形样式
	addGraphStyle : function() {
		//
		for(var i = 0, graph; i < this.configs.graphs.length; i++) {
			graph = this.configs.graphs[i];
			switch(graph.type) {
				
				case "column":
				this.addIfNotExit(graph, "lineAlpha", 0);
				this.addIfNotExit(graph, "fillAlphas", 0.8);
				break;
				
				case "line":
				this.addIfNotExit(graph, "lineThickness", 2);
				this.addIfNotExit(graph, "bullet", "round");// "none", "round", "square", "triangleUp", "triangleDown", "bubble", "custom".
				this.addIfNotExit(graph, "bulletSize", "12");
				break;
				
				case "area" :
				$.extend(graph, {
					type : "line",
					lineAlpha : 0,
					fillAlphas : 0.6
				});
				this.configs.categoryAxis.startOnAxis = true;
				break;
			}
			graph.id = "graph" + i;//添加ID	
			this.addIfNotExit(graph, "balloonText", "[[category]]的[[title]]:<b>[[value]]</b>");		
		}
	},
	
	//覆盖配置信息
	extendConfig : function(options) {
		$.extend(this.configs, options);
	},
	
	//根据配置信息解析
	initConfigs : function(options) {
		this.configs = $.extend(true, {}, D3Chart.defaults);
	},
	
	addTitle : function() {
		if(this.configs.title) {
			this.chart.addTitle(this.configs.title, 14, "#333", .8, true);
			this.chart.validateNow();
		}
	},
	
	//设置3D配置
	set3DConfig : $.noop,
	
	setConfigs : function(options) {
		var theme = options.theme || "defaults",
			use3D = (options.use3D == "true" || options.use3D === true),
			useAnimate = (options.useAnimate == "true" || options.useAnimate === true);//使用动画
		//是否使用3D
		if(use3D) {
			this.set3DConfig();
		}
		if(useAnimate) {
			this.configs.startDuration = 1;
		}
		//使用配置
		this.configs.theme = theme;
		delete options.theme;
		delete options.use3D;
		delete options.useAnimate;
		//
		//添加所有的配置信息
		$.extend(true, this.configs, options);
		this.addGraphStyle();
	},
	
	//生成图片
	render : function() {
		var _this = this,
			id = _this.el.attr("id");
		//判断数据的获取方式
		if(this.configs.ajaxUrl) {
			//ajax方式
			$.getJSON(this.configs.ajaxUrl, function(data, textStatus, jqXHR) {
				//生成图片
				_this.configs.dataProvider = data;
				_this.chart = AmCharts.makeChart(_this.el.get(0), _this.configs);
				_this.addTitle();//添加标题
				D3Chart.addChart(id, _this);
				_this.trigger("rendered", [_this, data]);
				//定时方式
				if(_this.configs.intervals > 0) {
					_this.timer = setInterval(function() {
						$.getJSON(_this.configs.ajaxUrl, function(data, textStatus, jqXHR) {
							//重新载入数据
							_this.chart.dataProvider = data;
							_this.trigger("dataReload", [_this, data]);
							_this.chart.validateData();
						});
					}, _this.configs.intervals);
				}
			});
			
		} else {
			//普通方式
			this.chart = AmCharts.makeChart(_this.el.get(0), this.configs);
			_this.addTitle();//添加标题
			D3Chart.addChart(id, this);
			_this.trigger("rendered", [_this, this.configs.dataProvider]);
		}
	}
	
});

/**
 * 依赖serial.js 
 * @param {Object} el
 * @param {Object} options
 */
function D3SerialChart(el, options) {
	D3Chart.apply(this, [el, options]);
}
$.extend(D3SerialChart.prototype, D3Chart.prototype);
//
$.extend(D3SerialChart.prototype, {
	
	set3DConfig : function() {
		$.extend(this.configs, {
			depth3D : 20,
            angle : 30
		});
	},
	
	//覆盖初始化方法
	initConfigs : function(options) {
		//
		D3Chart.prototype.initConfigs.call(this, options);
		$.extend(this.configs, {
			categoryAxis : {
				gridPosition: "start",
				title : ""
			},
			valueAxes: [{
	            title: ""
	        }]
		});
	},
	
	setConfigs : function(options) {
		var categoryTitle = options.categoryTitle,
			valueAxesTitle = options.valueAxesTitle,
			useStack = (options.useStack == "true" || options.useStack === true);//使用动画
		this.configs.categoryAxis.title = categoryTitle;//设置横坐标标题
		this.configs.valueAxes[0].title = valueAxesTitle;//设置纵坐标标题
		if(useStack) {
			  this.configs.valueAxes[0].stackType = "regular";//"none", "regular", "100%", "3d".
              this.configs.valueAxes[0].gridAlpha = 0.1;
              this.configs.valueAxes[0].axisAlpha = 0;
		}
		delete options.categoryTitle;
		delete options.valueAxesTitle;
		delete options.useStack;
		D3Chart.prototype.setConfigs.call(this, options);
	}
});

/**
 * 饼状
 * @param {Object} el
 * @param {Object} options
 */
function D3PieChart(el, options) {
	D3Chart.apply(this, [el, options]);
	this.configs.type = "pie";
	this.configs.legend.useGraphSettings = false;
}
$.extend(D3PieChart.prototype, D3Chart.prototype);
//
$.extend(D3PieChart.prototype, {
	
	set3DConfig : function() {
		$.extend(this.configs, {
			depth3D : 15,
            angle : 30
		});
	}
});

//雷达
function D3RadarChart(el, options) {
	D3Chart.apply(this, [el, options]);
	this.configs.type = "radar";
	this.configs.legend.showEntries = false;
}
$.extend(D3RadarChart.prototype, D3Chart.prototype);
$.extend(D3RadarChart.prototype, {
	
	initConfigs : function(options) {
		D3Chart.prototype.initConfigs.call(this, options);
		$.extend(this.configs, {
			
			valueAxes: [{
				gridType : "circles",
                fillAlpha : 0.05,
                fillColor : "#000000",
                axisAlpha : 0.2,
                gridAlpha : 0,
                minimum : 0,
                maximum : 1,
                guides : [{
                	angle : 225,
                	tickLength : 0,
                	toAngle : 315,
                	value : 0,
                	toValue : 1,
                	fillColor : "#0066CC",
                	fillAlpha : 0.6
                }, {
                	angle : 45,
                	tickLength : 0,
                	toAngle : 135,
                	value : 0,
                	toValue : 1,
                	fillColor : "#CC3333",
                	fillAlpha : 0.6
                }]
	        }]
		});
	},
	
	setConfigs : function(options) {
		var maximum = options.maximum || 1,
			minimum = options.minimum || 0;
		this.configs.valueAxes[0].minimum = minimum;//设置辅助线最小值
		this.configs.valueAxes[0].maximum = maximum;//设置辅助线最大值
		for(var i = 0; i < this.configs.valueAxes[0].guides.length; i++) {
			this.configs.valueAxes[0].guides[i].value = minimum;
			this.configs.valueAxes[0].guides[i].toValue = maximum;
		}
		delete options.maximum;
		delete options.minimum;
		D3Chart.prototype.setConfigs.call(this, options);
	}
	
});
//
//漏斗图
function D3FunnelChart(el, options) {
	D3Chart.apply(this, [el, options]);
	this.configs.type = "funnel";
	this.configs.legend.showEntries = false;
}
$.extend(D3FunnelChart.prototype, D3Chart.prototype);
$.extend(D3FunnelChart.prototype, {
	
	initConfigs : function(options) {
		D3Chart.prototype.initConfigs.call(this, options);
		$.extend(this.configs, {
            balloon : {
            	fixedPosition : true,
            	cornerRadius : 0
            },
            marginRight : 210,
            labelPosition : "right",
            funnelAlpha : 0.9,
            startX : -500,
            marginLeft : 15,
            startAlpha : 0
		});
		this.addIfNotExit(this.configs, "balloonText", "[[title]] :<b>[[value]]</b>");
	},
	
	setConfigs : function(options) {
		var useNeck = (options.useNeck == "true" || options.useNeck === true);//使用动画
		if(useNeck) {
			$.extend(this.configs, {
				 rotate : false,
				 neckWidth : "40%",
                 neckHeight : "30%"
			});
		}
		delete options.useNeck;
		D3Chart.prototype.setConfigs.call(this, options);
	}
});

//漏斗图
function D3GaugeChart(el, options) {
	D3Chart.apply(this, [el, options]);
	this.configs.type = "gauge";
	delete this.configs.legend;
	delete this.configs.dataProvider;
	delete this.configs.graphs;
}
$.extend(D3GaugeChart.prototype, D3Chart.prototype);
$.extend(D3GaugeChart.prototype, {
	
	/**
	 * 初始化配置 
     * @param {Object} options
	 */
	initConfigs : function(options) {
		D3Chart.prototype.initConfigs.call(this, options);
		$.extend(this.configs, {
			 axes: [{
                    startValue: 0,
                    axisThickness: 1,
                    endValue: 220,
                    bottomTextYOffset: -20,
                    bottomText: "0 km/h",

                    bands: [{
                        startValue: 0,
                        endValue: 90,
                        color: "#00CC00"
                    },

                    {
                        startValue: 90,
                        endValue: 130,
                        color: "#ffac29"
                    },

                    {
                        startValue: 130,
                        endValue: 220,
                        color: "#ea3838",
                        innerRadius: "95%"
                    }]
				}],
                
				arrows: [{}]
		});
	},
	
	setConfigs : function(options) {
		D3Chart.prototype.setConfigs.call(this, options);
		//this.setValues(150);
	},
	
	setValues : function(values) {
		if($.type[values]=== "array") {
			
		} else {
			this.chart.arrows[0].setValue(values);
			this.chart.axes[0].setBottomText(values + this.configs.unitLabel);
		}
	},
	
	render : function() {
		var _this = this,
			id = _this.el.attr("id");
		this.chart = AmCharts.makeChart(_this.el.get(0), this.configs);
		D3Chart.addChart(id, this);
		this.chart.addListener("rendered", function() {
			_this.chart.arrows[0].setValue(190);
            _this.chart.axes[0].setBottomText(190 + " km/h");
		});
			
	}
});


