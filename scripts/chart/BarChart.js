define(["LineChart", "plugin/jqplot.barRenderer"], function(LineChart) {
	
	function BarChart(el, data, options) {
		LineChart.apply(this, [el, data, options]);
	}
	//复制通用的方法
	$.extend(BarChart.prototype, LineChart.prototype);
	
	//修改为适合柱状图显示的配置
	$.extend(true, BarChart.prototype.defaults, {
		seriesDefaults : {
			renderer:$.jqplot.BarRenderer,
			
			//显示Mark信息
			markerOptions: {
        		show : false
        	},
        	//
        	pointLabels : {
				show : true
			},
			
			rendererOptions: {
                barDirection: 'vertical',//vertical
                waterfall:false,//是否启用Waterfall
                varyBarColor: false
            }
		},
		
		highlighter : {
			show : false,
			showLabel : false
		}
		
	});
	
	$.extend(BarChart.prototype, {
		
		/**
		 * 检查配置是否正确 
		 */
		validate : function(el, data, options) {
			LineChart.prototype.validate.apply(this, [el, data, options]);
			if(options && options.waterfall && data.length > 1) {
				throw new Error("Waterfall 只能配置一列数据");
			}
		},
		
		/**
		 * 解析配置 
         * @param {Object} options
		 */
		renderOption : function(options) {
			LineChart.prototype.renderOption.call(this, options);
			//变为横向
			if(!!options.horizontal) {
				this.configs.seriesDefaults.rendererOptions.barDirection ='horizontal';
			}
			//是否使用Waterfall
			if(!!options.waterfall) {
				this.configs.seriesDefaults.rendererOptions.waterfall = true;
				this.configs.seriesDefaults.rendererOptions.varyBarColor = true;
			}
		},
		
		renderData : function(data) {
			LineChart.prototype.renderData.call(this, data);
			//
			if(this.configs.seriesDefaults.rendererOptions.barDirection =='horizontal') {
				var xaxis = this.configs.axes.xaxis;
				this.configs.axes.xaxis = this.configs.axes.yaxis;
				this.configs.axes.yaxis = xaxis;
			}
		}
		
	});
	
	return BarChart;
});