define(["PlotChart", "plugin/jqplot.categoryAxisRenderer", "plugin/jqplot.highlighter"], function(PlotChart) {

	function LineChart(el, data, options) {
		PlotChart.apply(this, [el, data, options]);
	}
	
	//复制通用的方法
	$.extend(LineChart.prototype, PlotChart.prototype);
	
	//修改为适合线性图显示的配置
	$.extend(LineChart.prototype.defaults, {
		
		animate : true,
		
		seriesDefaults : { 
			renderer:$.jqplot.LineRenderer,
			pointLabels : {
				show : true,
				hideZeros: true
			},
			fill: false,
        	fillAndStroke: false,
        	lineWidth:3, 
        	markerOptions: {
        		show : true,
        		fill : true,
        		size : 10,
        		style:'circle' 
        	},
			shadow : false,
			rendererOptions: {
                smooth: false
            }
		},
		
		axes : {
			xaxis : {
				renderer : $.jqplot.CategoryAxisRenderer,
				showTicks : true
			},
			
			yaxis : {
				showTicks : true
			}
		},

		highlighter : {
			show : true,
			showLabel : true,
        	tooltipAxes: 'y',
        	sizeAdjust: 7.5 , 
        	tooltipLocation : 'ne'
		}
	});
	
	$.extend(LineChart.prototype, {
		
		renderData : function(data) {
			for(var i = 0; i < data.length; i++) {
				 var ticks = [], //坐标标识
                	plotDatas=[];
                 for(var j=0; j<data[i].length; j++) {
                 	ticks.push(data[i][j][0]);
                	plotDatas.push(data[i][j][1]);
                 }
                 this.datas.push(plotDatas);
                 //
                 if(!this.configs.axes.xaxis.ticks || this.configs.axes.xaxis.ticks.length < ticks.length) {
                 	this.configs.axes.xaxis.ticks = ticks;
                 }
			}	
		},
		
		renderOption : function(options) {
			var smooth = !!options.smooth,
				xLabel = options.xLabel,
				yLabel = options.yLabel;
			PlotChart.prototype.renderOption.call(this, options);
			this.setSmooth(smooth);
			this.setAxisLabel(xLabel, yLabel);
		},
		
		/**
         * 设置平滑 
         */
        setSmooth : function(smooth) {
        	this.configs.seriesDefaults.rendererOptions.smooth = smooth;
        },
        
        setAxisLabel : function(xLabel, yLabel) {
        	//解析坐标说明
            if(xLabel) {
            	this.configs.axes.xaxis.label = xLabel;
            }
            if(yLabel) {
            	this.configs.axes.yaxis.label = yLabel;
            }
        }
		
	});
	

	return LineChart;
});
