import React from 'react';
import Loader from 'halogen/ScaleLoader';
import {format} from "d3-format";
import {timeFormat} from "d3-time-format";
import {
    ChartCanvas,
    Chart,
    series,
    scale,
    coordinates,
    tooltip,
    axes,
    indicator,
    helper
} from "react-stockcharts";

var { fitWidth } = helper;
var {CandlestickSeries, LineSeries, BarSeries} = series;
var {discontinuousTimeScaleProvider} = scale;
var {CrossHairCursor, MouseCoordinateX, MouseCoordinateY, CurrentCoordinate, EdgeIndicator} = coordinates;
var {XAxis, YAxis} = axes;
var {OHLCTooltip, MovingAverageTooltip} = tooltip;
var {ema, sma, wma, tma} = indicator;

class CandleStickStockScaleChart extends React.Component {
    render() {
        var { type, width, ratio } = this.props;
        let chartData = this.props.chartData;
        let sma5 = sma().windowSize(5).sourcePath("close").merge((d, c) => {
            d.sma5 = c;
        }).accessor(d => d.sma5).stroke("#e54c3c");

        let sma10 = sma().windowSize(10).sourcePath("close").merge((d, c) => {
            d.sma10 = c;
        }).accessor(d => d.sma10).stroke("#dadee0");

        let sma20 = sma().windowSize(20).sourcePath("close").merge((d, c) => {
            d.sma20 = c;
        }).accessor(d => d.sma20).stroke("#fb01fb");

        let sma60 = sma().windowSize(60).sourcePath("close").merge((d, c) => {
            d.sma60 = c;
        }).accessor(d => d.sma60).stroke("#00d800");

        let sma120 = sma().windowSize(120).sourcePath("close").merge((d, c) => {
            d.sma120 = c;
        }).accessor(d => d.sma120).stroke("#0000ff");

        let margin = {
            left: 70,
            right: 70,
            top: 20,
            bottom: 20
        };
        let gridHeight = width - margin.top - margin.bottom;
        let gridWidth = 400 - margin.left - margin.right;

        let showGrid = true;
        let yGrid = showGrid
            ? {
                innerTickSize: -1 * gridWidth,
                tickStrokeDasharray: 'Solid',
                tickStrokeOpacity: 0.1,
                tickStrokeWidth: 1
            }
            : {};
        let xGrid = showGrid
            ? {
                innerTickSize: -1 * gridHeight,
                tickStrokeDasharray: 'Solid',
                tickStrokeOpacity: 0.1,
                tickStrokeWidth: 1
            }
            : {};
        if (chartData.length==0) {
            return (
                <div className="text-center" style={{
                    marginTop: "20px"
                }}>
                    <br/><br/><br/><br/><br/><Loader color="#dadee0" height={"100px"} width={"20px"} radius={"0px"} margin="2px"/>
                </div>
            );
        } else {
            return (
                <div className="panel-body">
                    <ChartCanvas ratio={1} xExtents={[chartData[chartData.length-101].date, chartData[chartData.length-1].date]} width={width} height={400} margin={margin} type="hybrid" seriesName="MSFT" data={chartData} xAccessor={d => d.date} calculator={[sma5, sma10, sma20, sma60, sma120]} xScaleProvider={discontinuousTimeScaleProvider}>
                        <Chart id={1} yExtents={[
                            d => [
                                d.high, d.low
                            ],
                            sma5.accessor(),
                            sma10.accessor(),
                            sma20.accessor(),
                            sma60.accessor(),
                            sma120.accessor()
                        ]} ticks={6}>
                            <YAxis axisAt="left" orient="left" {...yGrid} tickStroke="#dadee0" stroke="#dadee0"/>
                            <XAxis axisAt="bottom" orient="bottom" tickStroke="#dadee0" stroke="#dadee0"/>
                            <MouseCoordinateY at="right" orient="right" displayFormat={format(".2f")}/>
                            <MouseCoordinateX at="top" orient="top" displayFormat={timeFormat("%m-%d %H:%M")}/>
                            <CandlestickSeries fill={(d) => d.close > d.open
                                ? "#9ad858"
                                : "#bf67b1"} wickStroke={d => d.close > d.open
                                ? "#9ad858"
                                : "#bf67b1"} stroke={d => d.close > d.open
                                ? "#9ad858"
                                : "#bf67b1"}/>
                            <LineSeries yAccessor={sma5.accessor()} stroke={sma5.stroke()} highlightOnHover/>
                            <LineSeries yAccessor={sma10.accessor()} stroke={sma10.stroke()} highlightOnHover/>
                            <LineSeries yAccessor={sma20.accessor()} stroke={sma20.stroke()} highlightOnHover/>
                            <LineSeries yAccessor={sma60.accessor()} stroke={sma60.stroke()} highlightOnHover/>
                            <LineSeries yAccessor={sma120.accessor()} stroke={sma120.stroke()} highlightOnHover/>
                            <CurrentCoordinate yAccessor={sma5.accessor()} fill={sma5.stroke()}/>
                            <CurrentCoordinate yAccessor={sma10.accessor()} fill={sma10.stroke()}/>
                            <CurrentCoordinate yAccessor={sma20.accessor()} fill={sma20.stroke()}/>
                            <CurrentCoordinate yAccessor={sma60.accessor()} fill={sma60.stroke()}/>
                            <CurrentCoordinate yAccessor={sma120.accessor()} fill={sma120.stroke()}/>
                            <EdgeIndicator itemType="last" orient="right" edgeAt="right" yAccessor={d => d.close} fill={d => d.close > d.open
                                ? "#9ad858"
                                : "#bf67b1"}/>
                            <EdgeIndicator itemType="first" orient="left" edgeAt="left" yAccessor={d => d.close} fill={d => d.close > d.open
                                ? "#9ad858"
                                : "#bf67b1"}/>
                            <OHLCTooltip origin={[0, -5]} stroke="#ffffff"/>
                            <MovingAverageTooltip origin={[0, 0]} calculators={[sma5, sma10, sma20, sma60, sma120]}/>
                        </Chart>
                        <CrossHairCursor/>
                    </ChartCanvas>
                </div>
            );
        }
    }
}

CandleStickStockScaleChart.defaultProps = {
	type: "svg",
};
CandleStickStockScaleChart = fitWidth(CandleStickStockScaleChart);

export default CandleStickStockScaleChart;
