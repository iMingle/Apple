define(["PlotChart", "plugin/jqplot.donutRenderer"], function(PlotChart) {
	
	function DonutChart(el, data, options) {
		PlotChart.apply(this, [el, data, options]);
	}
	
	//复制通用的方法
	$.extend(DonutChart.prototype, PlotChart.prototype);
	
	//修改为适合饼状图显示的配置
	$.extend(DonutChart.prototype.defaults, {
		seriesDefaults : { 
			renderer:$.jqplot.DonutRenderer,
			trendline: { 
				show : true
			}, 
			rendererOptions: { 
				padding: 4, 
				fill : true,
				showDataLabels: true,
				dataLabels: 'label',
				sliceMargin: 0, 
                startAngle: -90
			}
		}
	});
	
	//覆盖方法
	$.extend(DonutChart.prototype, {
		
		renderOption : function(options) {
			var showDataLabels = !!options.showDataLabels,
				margin = options.margin || 0,
				notFill = !!options.notFill;
        	//直接覆盖配置
            $.extend(true, this.configs, options);
     		//设置是否显示 数据标签
     		this.setShowDataLabel(showDataLabels);
     		//设置分割间隔
     		this.setMargin(margin);
     		//设置是否填充
     		this.setNotFill(notFill);
		},
		
		/**
		 * 设置是否填充 
		 */
		setNotFill : function(notFill) {
			this.configs.seriesDefaults.rendererOptions.fill = !notFill;
		},
		
		setMargin : function(margin) {
			this.configs.seriesDefaults.rendererOptions.sliceMargin = margin;
		},
		
		/**
		 * 
		 */
		setShowDataLabel : function(showDataLabel) {
			this.configs.seriesDefaults.rendererOptions.showDataLabels = showDataLabel;
		}
		
	});
	
	return DonutChart;
});