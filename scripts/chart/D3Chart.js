function D3Chart(el, data, config) {
	//初始化配置信息
	var options = config || {}, theme = options.theme || "default";
	//复制配置
	this.configs = $.extend(true, {}, this.defaults);
	//存储图像数据
	this.datas = [];
	//验证配置
	//this.validate(el, data, options);
	//激活主题配置
	this.setTheme(theme);
	//解析配置
	this.renderOption(options);
	//解析数据
	this.renderData(data);
	//生成图片
	this.renderChart(el);
}

$.extend(D3Chart.prototype, {

	defaults : {
		type : "serial",

		theme : "defaults",

		dataProvider : null,

		startDuration : 1,

		legend : {
			useGraphSettings : false,
			align : "center",
			markerType : "circle"
		}
	}

});

$.extend(D3Chart.prototype, {

	/**
	 * 设置主题
	 * @param {Object} theme
	 */
	setTheme : function(theme) {
		if (theme == "default") {
			theme = theme + "s";
		}
		this.configs.theme = theme;
	},

	renderOption : function(options) {
		var use3d = options.use3d;
		$.extend(true, this.configs, options);
		this.setUse3d(use3d);
	},

	/**
	 * 解析数据
	 * @param {Object} data
	 */
	renderData : function(data) {
		var catData = [], i = 0, j = 0, valueKey;
		for (; i < data.length; i++) {
			valueKey = "value" + i;
			for ( j = 0; j < data[i].length; j++) {
				if (!catData[j]) {
					//添加新元素
					catData[j] = {};
				}
				catData[j]["category"] = data[i][j][0];
				catData[j][valueKey] = data[i][j][1];
			}
		}
		this.data = catData;
	},

	renderChart : function(el) {
		this.configs.dataProvider = this.data;
		AmCharts.makeChart(el, this.configs);
	},
	
	setUse3d : function(use3d) {
		if(use3d === true || use3d === "true") {
			this.set3d();
		}
	}
});

function Bar3dChart(el, data, options) {
	D3Chart.apply(this, [el, data, options]);
}

$.extend(true, Bar3dChart.prototype, D3Chart.prototype);

$.extend(Bar3dChart.prototype.defaults, {

	type : "serial",
	
	categoryField : "category",

	categoryAxis : {
		gridPosition : "start",
		title : ""
	},

	valueAxes : [{
		title : ""
	}],

	graphs : [],

	legend : {
		useGraphSettings : false
	}
});

$.extend(Bar3dChart.prototype, {

	renderOption : function(options) {
		var legendLabels = options.legendLabels, 
			xLabel = options.xLabel, 
			yLabel = options.yLabel;
		//
		D3Chart.prototype.renderOption.call(this, options);
		//设置分类标签
		this.setLegendLabels(legendLabels);
		//
		this.setAxisLabels(xLabel, yLabel);
	},
	
	set3d : function() {
		$.extend(this.configs, {
			depth3D : 20,
            angle : 30
		});
	},

	/**
	 * 设置Label标签
	 */
	setLegendLabels : function(lbls) {
		if (lbls && $.trim(lbls)) {
			var legends = lbls.split(","), i = 0;
			for (; i < legends.length; i++) {
				var serie = {
					title : legends[i],
					type : "column",
					valueField : "value" + i,
					lineAlpha : 0,
					fillAlphas : 0.8,
					balloonText : "[[title]]&nbsp;[[category]]:<b>[[value]]</b>"
				};
				this.configs.graphs.push(serie);
			}
		}
	},

	setAxisLabels : function(xLabel, yLabel) {
		if (xLabel) {
			this.configs.categoryAxis.title = xLabel;
		}
		if (yLabel) {
			this.configs.valueAxes[0].title = yLabel;
		}
	}
});

//
function Pie3dChart(el, data, options) {
	D3Chart.apply(this, [el, data, options]);
}

$.extend(true, Pie3dChart.prototype, D3Chart.prototype);

$.extend(Pie3dChart.prototype.defaults, {
	
	type : "pie",
	
	titleField: "category",
	
	valueField: "value0"
	
});

$.extend(Pie3dChart.prototype, {
	
	renderOption : function(option) {
		D3Chart.prototype.renderOption.call(this, option);
	},
	
	set3d : function() {
		$.extend(this.configs, {
			depth3D : 15,
            angle : 30
		});
	}
		
});


