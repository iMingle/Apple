define(["PlotChart", "plugin/jqplot.funnelRenderer"], function(PlotChart) {
	
	function FunnelChart(el, data, options) {
		PlotChart.apply(this, [el, data, options]);
	}
	
	//复制通用的方法
	$.extend(true, FunnelChart.prototype, PlotChart.prototype);
	
	//覆盖方法
	$.extend(FunnelChart.prototype, {
		
		renderOption : function(options) {
			$.extend(this.configs, {
				legend: {
		           show: true,
		           
		           renderer : $.jqplot.FunnelLegendRenderer,
		           
		           rendererOptions: {
		               numberColumns: 1,
		               fontSize: '12px'
		           }
		        },
		        
		        seriesDefaults : { 
					renderer:$.jqplot.FunnelRenderer,
					
					rendererOptions : {
						showDataLabels : true,
						
						fill : true,
						
						shadowDepth : 0
				
					}
				},
				
				sort : false,
				
				sortData : false
			});
			
		}
		
		
	});
	
	return FunnelChart;
});