define(["LineChart"], function(LineChart) {
	//
	function AreaChart(el, data, options) {
		LineChart.apply(this, [el, data, options]);
	}
	//
	$.extend(AreaChart.prototype, LineChart.prototype);
	//修改为适合块状图显示的配置
	$.extend(true, AreaChart.prototype.defaults, {
		seriesDefaults : {
			pointLabels : {
				show : false
			},
			fill: true,
        	fillAndStroke: true,
        	//禁止显示坐标点
        	markerOptions: {
        		show : false
        	}
		},
		
		highlighter : {
			show : false
		}
		
	});
	//重写解析方法
	$.extend(AreaChart.prototype, {
		
		renderOption : function(options) {
			LineChart.prototype.renderOption.call(this, options);
		}
		
	});
	return AreaChart;
});
