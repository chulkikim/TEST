(function () {
    window.depui = window.depui || {};
    if (window.depui.Chart) {
        return;
    }

    var COLORS = {
        blue: 'rgb(54, 162, 235)',
        green: 'rgb(75, 192, 192)',
        grey: 'rgb(201, 203, 207)',
        orange: 'rgb(255, 159, 64)',
        purple: 'rgb(153, 102, 255)',
        red: 'rgb(255, 99, 132)',
        yellow: 'rgb(255, 205, 86)'
    };
    var COLORNAMES = ['red', 'blue', 'green', 'grey', 'orange', 'purple'];

    /**
     * @param {string|object} selector html element selector or element itself
     */
    function DepuiChart(selector, properties) {
        if (typeof selector === 'string') {
            this._elem = document.querySelector(selector);
        } else {
            this._elem = selector;
        }
        console.assert(this._elem);
        this._designMode = false;
        this._width = '400px';
        this._height = '200px';
        this.setProperties(properties);

        if (this._elem._depuiChart) {
            this._elem._depuiChart.destroy();
        }
        this._elem._depuiChart = this;
    }

    DepuiChart.prototype = {
        setProperties: function (properties) {
            if (properties) {
                if (properties.hasOwnProperty('designMode')) {
                    this._designMode = properties.designMode;
                }
                if (properties.hasOwnProperty('chartWidth')) {
                    this._width = properties.chartWidth;
                }
                if (properties.hasOwnProperty('chartHeight')) {
                    this._height = properties.chartHeight;
                }
            }
            return this;
        },

        draw: function (chartsData) {
            this.reset();

            if (this._designMode) {
                chartsData = createDesignModeData();
            }

            $(this._elem).css('overflow', 'auto');
            for (var i = 0; i < chartsData.length; i++) {
                var settings = resToChartSettings(chartsData[i]);
                var chartContainerElem = document.createElement('div');
                var canvasElem = document.createElement('canvas');
                $(chartContainerElem).addClass('tile');
                $(chartContainerElem).css('width', this._width);
                $(chartContainerElem).css('height', this._height);
                chartContainerElem.appendChild(canvasElem);
                this._elem.appendChild(chartContainerElem);
                var ctx = canvasElem.getContext('2d');
                ctx.canvas.width = this._width;
                ctx.canvas.height = this._height;

                chartContainerElem._depuiRealChart = window.Chart.Scatter(ctx, settings);
            }
            return this;
        },

        reset: function () {
            var children = this._elem.children;
            var size = children.length;
            var child;
            for (var i = size - 1; i >= 0; i--) {
                child = children[i];
                if (child._depuiRealChart) {
                    child._depuiRealChart.destroy();
                    child.remove();
                }
            }
            return this;
        },

        destroy: function () {
            this.reset();
            delete this._elem._depuiChart;
            delete this._elem;
        }
    };

    function getChart(selector) {
        var elem = null;
        if (typeof selector === 'string') {
            elem = document.querySelector(selector);
        } else {
            elem = selector;
        }

        return elem && elem._depuiChart;
    }

    var REQ_DATA = 
        {
            source: {
                url: 'hdfs://70.121.225.27:8020/da/sf_sample_data_q04_1',
                sourceType: 'parquet',
                table: 'datable'
            },
            chart: {
                chartType: 'scatter',
                pixels: {
                    x: 200,
                    y: 200
                },
                xAxis: {
                    column: 'act_time',
                    dataType: 'timestamp'
                },
                yAxis: [
                    {
                        column: 'x',
                        dataType: 'number',
                        function: 'avg',
                        lower: -100,
                        upper: 1600000000
                    }
                ]
            }
        };

    function getChartColumns(options, callback) {
        var reqData = { source: {} };
        reqData.source.url = options.sourceUrl;
        reqData.source.table = 'datable';

        return $.ajax({
            url: 'http://da.nexplant.dep/DataAccelerator/chartService/getChartColumns',
            type: 'POST',
            contentType: 'application/json',
            processData: false,
            data: JSON.stringify(reqData)
        })
        .done(function (data, textStatus, jqXHR) {
            console.log('response:', data);
            if (!data.columns) {
                callback('no columns result');
                return;
            }
            
            for (var i = 0; i < data.columns.length; i++) {
                if (data.columns[i].values) {
                    data.columns[i].values.sort(function (a, b) {
                        return a.localeCompare(b);
                    });
                }
            }

            callback(null, data);
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            callback(textStatus);
        });
    }

    function getChartData(options, callback) {
        var reqData = JSON.parse(JSON.stringify(REQ_DATA));
        var progressiveWheres = [];

        reqData.source.url = options.sourceUrl;
        reqData.chart.xAxis.column = options.xAxis;
        reqData.chart.yAxis[0].column = options.yAxis;
        if (options.colorBy && options.colorBy.length > 0) {
            reqData.chart.added = [{ column: options.colorBy }];
        } else {
            reqData.chart.added = null;
        }
        if (options.groupsBy && options.groupsBy.length > 0) {
            reqData.chart.groupBy = [];
            for (var i = 0; i < options.groupsBy.length; i++) {
                reqData.chart.groupBy.push({ column: options.groupsBy[i] });
                
                if (options.progressive) {
                    // TODO 현재는 groupsBy.length === 1 만 지원
                    var groupCol = options.columns.find(function (col) { return col.name === options.groupsBy[i]; });
                    if (progressiveWheres.length === 0) {
                        for (var j = 0; j < groupCol.values.length; j++) {
                            progressiveWheres.push([{ column: options.groupsBy[i], compOp: '==', value: [groupCol.values[j]] }]);
                        }
                    } else {
                        var newProgressiveWheres = [];
                        for (var j = 0; j < progressiveWheres.length; j++) {
                            for (var k = 0; k < groupCol.values.length; k++) {
                                var newProgCol = JSON.parse(JSON.stringify(progressiveWheres[j]));
                                newProgCol.push({ column: options.groupsBy[i], compOp: '==', value: [groupCol.values[k]]});
                                newProgressiveWheres.push(newProgCol);
                            }
                        }
                        progressiveWheres = newProgressiveWheres;
                    }
                }
            }
        } else {
            reqData.chart.groupBy = undefined;
        }
        reqData.chart.xAxis.lower = options.startDate.getTime();
        reqData.chart.xAxis.upper = options.endDate.getTime();

        var yCol = options.columns.find(function (col) {
            return col.name === options.yAxis;
        });
        reqData.chart.yAxis[0].lower = yCol.minValue;
        reqData.chart.yAxis[0].upper = yCol.maxValue;
        
        console.log('request:', JSON.stringify(reqData));
        
        return getChartDataAjax(options, reqData, { wheres: progressiveWheres, index: 0 }, callback);
    }
    
    function getChartDataAjax(options, reqData, progressiveOptions, callback) {
        // TODO 현재는 1개의 groupBy만 지원
        var newReqData = JSON.parse(JSON.stringify(reqData));
        if (progressiveOptions.wheres.length > 0) {
            if (!newReqData.chart.where) {
                newReqData.chart.where = {
                    logicalOp: 'AND',
                    columns: []
                };
            }
            for (var i = 0; i < progressiveOptions.wheres[progressiveOptions.index].length; i++) {
                newReqData.chart.where.columns.push(progressiveOptions.wheres[progressiveOptions.index][i]);
            }
        }

        var started = new Date();
        return $.ajax({
            url: 'http://da.nexplant.dep/DataAccelerator/chartService/getChartData',
            type: 'POST',
            contentType: 'application/json',
            processData: false,
            data: JSON.stringify(newReqData),
            timeout: 600000 // 10 minutes
        })
        .done(function (data, textStatus, jqXHR) {
            console.log('response:', data);
            if (!data.charts) {
                callback('no chart result');
                return;
            }

            var ended = new Date();
            data.timeTaken = (ended.getTime() - started.getTime()) / 1000;

            data.charts.sort(function (a, b) {
                return a.chartTitle && a.chartTitle.localeCompare(b.chartTitle);
            });
            
            if (options.progressive) {
                if (!progressiveOptions.data) {
                    progressiveOptions.data = data;
                } else {
                    progressiveOptions.data.timeTaken += data.timeTaken;
                    progressiveOptions.data.rowCount += data.rowCount;
                    progressiveOptions.data.charts.push(data.charts[0]);
                }
                callback(null, progressiveOptions.data);
            } else {
                callback(null, data);
            }

            progressiveOptions.index += 1;
            if (progressiveOptions.index < progressiveOptions.wheres.length) {
                getChartDataAjax(options, reqData, progressiveOptions, callback);
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            callback(textStatus);
        });
    }

    function createDesignModeData() {
        var CHARTCOUNT = 4;
        var DATASETS = ['B', 'G'];
        var COUNT_DATA = 10;
        var TITLES = ['colfoo(foo1), colbar(bar1)', 'colfoo(foo1), colbar(bar2)',
                      'colfoo(foo2), colbar(bar1)', 'colfoo(EQP005), colbar(bar2)'
                     ];

        var randomTimeN = function (n) {
            //return random time stamp between today and 255 days ago
            return (window.moment().subtract(n, 'days')).startOf('day').valueOf();
        };
        var randomInt = function (n) {
            return Math.round(Math.random() * n);
        };

        var chartsData = [];
        for (var i = 0; i < CHARTCOUNT; i++) {
            var chartData = {};
            chartsData.push(chartData);

            chartData.chartType = 'scatter';
            chartData.chartTitle = TITLES[i];
            chartData.datasets = [];

            for (var j = 0; j < DATASETS.length; j++) {
                var dataset = {};
                chartData.datasets.push(dataset);
                dataset.added = [{ 'column': 'gb', value: DATASETS[j] }];
                dataset.data = [];
                for (var k = 0; k < COUNT_DATA; k++) {
                    dataset.data.push({
                        x: randomTimeN(k),
                        y: randomInt(50),
                        rowCount: randomInt(100)
                    });
                }
            }
        }

        return chartsData;
    }

    function resToChartSettings(chartData) {
        var settings = {
            type: chartData.chartType,
            data: {
                datasets: []
            },
            options: {
                title: {
                    text: chartData.chartTitle,
                    display: true
                },
                scales: {
                    xAxes: [{
                        position: 'bottom',
                        ticks: {
                            userCallback: function (label, index, labels) {
                                return window.moment(label).format('YYYY-MM-DD');
                            }
                        },
                    }],
                },
                //                legend: {
                //                    display: false
                //                },
                tooltips: {
                    callbacks: {
                        title: function (tooltipItem) {
                            return window.moment(tooltipItem.xLabel).format('YYYY-MM-DD HH:mm:ss');
                        },
                        label: function (tooltipItem, data) {
                            return parseFloat(tooltipItem.yLabel).toPrecision(4) + ' (' + datasets[tooltipItem.datasetIndex].data[tooltipItem.index].rowCount + ')';
                        }
                    }
                },
                animation: false
            }
        };

        var datasets = chartData.datasets;
        var dataset, data;
        var chartDataSets = [];
        var chartDataSet;
        for (var i = 0; i < datasets.length; i++) {
            dataset = datasets[i];
            chartDataSet = {
                label: (dataset.added && dataset.added[0] && dataset.added[0].value) || '',
                data: [],
                borderColor: COLORS[COLORNAMES[i % COLORNAMES.length]],
                backgroundColor: COLORS[COLORNAMES[i % COLORNAMES.length]],
                pointBorderColor: COLORS[COLORNAMES[i % COLORNAMES.length]],
                pointBackgroundColor: COLORS[COLORNAMES[i % COLORNAMES.length]]
            };

            if (chartData.chartType === 'scatter') {
                chartDataSet.pointRadius = [];
            }

            for (var j = 0; j < dataset.data.length; j++) {
                data = dataset.data[j];
                chartDataSet.data[j] = data;
                if (chartDataSet.pointRadius) {
                    chartDataSet.pointRadius[j] = 1;
                }
            }
            chartDataSets[i] = chartDataSet;
        }
        settings.data.datasets = chartDataSets;
        return settings;
    }

    window.depui.Chart = DepuiChart;
    window.depui.getChart = getChart;
    window.depui.getChartColumns = getChartColumns;
    window.depui.getChartData = getChartData;
})();