define(["LineChart", "plugin/jqplot.barRenderer"], function(LineChart) {
	
	/**
	 * Bar数据必须放在第一列，Line数据放在Bar的后面 
	 */
	function LineBarChart(el, data, options) {
		LineChart.apply(this, [el, data, options]);
	}
	//复制通用的方法
	$.extend(LineBarChart.prototype, LineChart.prototype);
	//
	$.extend(LineBarChart.prototype, {
		
		/**
		 * 添加LineRender配置
 		 * @param {Object} data
		 */
		renderData : function(data) {
			LineChart.prototype.renderData.call(this, data);
			if(this.option.series.length !== 2) {
				throw new Error("数据配置错误");
			}
			//待扩展
			$.extend(true, this.option.series[0], {
				renderer:$.jqplot.BarRenderer,
				showHighlight: false
			});
		}
		
	});
	//
	return LineBarChart;
});
