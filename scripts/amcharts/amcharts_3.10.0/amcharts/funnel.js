AmCharts.AmFunnelChart = AmCharts.Class({
	inherits: AmCharts.AmSlicedChart,
	construct: function(u) {
		this.type = "funnel";
		AmCharts.AmFunnelChart.base.construct.call(this, u);
		this.cname = "AmFunnelChart";
		this.startX = this.startY = 0;
		this.baseWidth = "100%";
		this.neckHeight = this.neckWidth = 0;
		this.rotate = !1;
		this.valueRepresents = "height";
		this.pullDistance = 30;
		this.labelPosition = "center";
		this.labelText = "[[title]]: [[value]]";
		this.balloonText = "[[title]]: [[value]]\n[[description]]";
		AmCharts.applyTheme(this, u, this.cname)
	},
	drawChart: function() {
		AmCharts.AmFunnelChart.base.drawChart.call(this);
		var u = this.chartData;
		if (AmCharts.ifArray(u))
			if (0 < this.realWidth && 0 < this.realHeight) {
				var t = this.container,
					D = this.startDuration,
					k = this.rotate,
					x = this.updateWidth();
				this.realWidth = x;
				var g = this.updateHeight();
				this.realHeight = g;
				var q = AmCharts.toCoordinate,
					A = q(this.marginLeft, x),
					v = q(this.marginRight, x),
					a = q(this.marginTop, g) + this.getTitleHeight(),
					q = q(this.marginBottom, g),
					v = x - A - v,
					y = AmCharts.toCoordinate(this.baseWidth, v),
					l = AmCharts.toCoordinate(this.neckWidth, v),
					z = g - q - a,
					w = AmCharts.toCoordinate(this.neckHeight,
						z),
					r = a + z - w;
				k && (a = g - q, r = a - z + w);
				this.firstSliceY = a;
				AmCharts.VML && (this.startAlpha = 1);
				for (var h = v / 2 + A, E = (z - w) / ((y - l) / 2), m = y / 2, y = (z - w) * (y + l) / 2 + l * w, B = a, F = 0, w = 0; w < u.length; w++) {
					var c = u[w],
						d;
					if (!0 !== c.hidden) {
						var n = [],
							e = [],
							b;
						if ("height" == this.valueRepresents) b = z * c.percents / 100;
						else {
							var p = -y * c.percents / 100 / 2,
								C = m;
							d = -1 / (2 * E);
							b = Math.pow(C, 2) - 4 * d * p;
							0 > b && (b = 0);
							b = (Math.sqrt(b) - C) / (2 * d);
							if (!k && a >= r || k && a <= r) b = 2 * -p / l;
							else if (!k && a + b > r || k && a - b < r) d = k ? Math.round(b + (a - b - r)) : Math.round(b - (a + b - r)), b = d / E, b = d + 2 * (-p - (C - b /
								2) * d) / l
						}
						p = m - b / E;
						C = !1;
						!k && a + b > r || k && a - b < r ? (p = l / 2, n.push(h - m, h + m, h + p, h + p, h - p, h - p), k ? (d = b + (a - b - r), a < r && (d = 0), e.push(a, a, a - d, a - b, a - b, a - d, a)) : (d = b - (a + b - r), a > r && (d = 0), e.push(a, a, a + d, a + b, a + b, a + d, a)), C = !0) : (n.push(h - m, h + m, h + p, h - p), k ? e.push(a, a, a - b, a - b) : e.push(a, a, a + b, a + b));
						t.set();
						d = t.set();
						n = AmCharts.polygon(t, n, e, c.color, c.alpha, this.outlineThickness, this.outlineColor, this.outlineAlpha);
						d.push(n);
						this.graphsSet.push(d);
						c.wedge = d;
						c.index = w;
						if (e = this.gradientRatio) {
							var s = [],
								f;
							for (f = 0; f < e.length; f++) s.push(AmCharts.adjustLuminosity(c.color,
								e[f]));
							0 < s.length && n.gradient("linearGradient", s);
							c.pattern && n.pattern(c.pattern)
						}
						0 < D && (this.chartCreated || d.setAttr("opacity", this.startAlpha));
						this.addEventListeners(d, c);
						c.ty0 = a - b / 2;
						this.labelsEnabled && this.labelText && c.percents >= this.hideLabelsPercent && (e = this.formatString(this.labelText, c), (n = this.labelFunction) && (e = n(c, e)), s = c.labelColor, s || (s = this.color), n = this.labelPosition, f = "left", "center" == n && (f = "middle"), "left" == n && (f = "right"), e = AmCharts.wrappedText(t, e, s, this.fontFamily, this.fontSize,
							f, !1, this.maxLabelWidth), e.node.style.pointerEvents = "none", d.push(e), s = h, k ? (f = a - b / 2, c.ty0 = f) : (f = a + b / 2, c.ty0 = f, f < B + F + 5 && (f = B + F + 5), f > g - q && (f = g - q)), "right" == n && (s = v + 10 + A, c.tx0 = h + (m - b / 2 / E), C && (c.tx0 = h + p)), "left" == n && (c.tx0 = h - (m - b / 2 / E), C && (c.tx0 = h - p), s = A), c.label = e, c.labelX = s, c.labelY = f, c.labelHeight = e.getBBox().height, e.translate(s, f), m = e.getBBox(), B = AmCharts.rect(t, m.width + 5, m.height + 5, "#ffffff", .005), B.translate(s + m.x, f + m.y), d.push(B), c.hitRect = B, F = e.getBBox().height, B = f);
						(0 === c.alpha || 0 < D && !this.chartCreated) &&
							d.hide();
						a = k ? a - b : a + b;
						m = p;
						c.startX = AmCharts.toCoordinate(this.startX, x);
						c.startY = AmCharts.toCoordinate(this.startY, g);
						c.pullX = AmCharts.toCoordinate(this.pullDistance, x);
						c.pullY = 0;
						c.balloonX = h;
						c.balloonY = c.ty0
					}
				}
				this.arrangeLabels();
				this.initialStart();
				(u = this.legend) && u.invalidateSize()
			} else this.cleanChart();
		this.dispDUpd();
		this.chartCreated = !0
	},
	arrangeLabels: function() {
		var u = this.rotate,
			t;
		t = u ? 0 : this.realHeight;
		for (var D = 0, k = this.chartData, x = k.length, g, q = 0; q < x; q++) {
			g = k[x - q - 1];
			var A = g.label,
				v = g.labelY,
				a = g.labelX,
				y = g.labelHeight,
				l = v;
			u ? t + D + 5 > v && (l = t + D + 5) : v + y + 5 > t && (l = t - 5 - y);
			t = l;
			D = y;
			if (A) {
				A.translate(a, l);
				var z = A.getBBox()
			}
			g.hitRect.translate(a + z.x, l + z.y);
			g.labelY = l;
			g.tx = a;
			g.ty = l;
			g.tx2 = a
		}
		"center" != this.labelPosition && this.drawTicks()
	}
});