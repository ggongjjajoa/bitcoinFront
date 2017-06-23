import React from 'react';
import update from 'react-addons-update';
import axios from 'axios';
import {connect} from 'react-redux';

import {serverUrl} from '../Config';

import CardList from '../components/home/CardList';

class HomeContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			itemList: [],
			chartData: [],
			bufChartData: [],
			subscribeTicker: null
		}
	}

	componentDidMount() {
		if (this.props.CommonStore.itemList != null) {
			this.setState({itemList: this.props.CommonStore.itemList});
		}
	}

	componentWillReceiveProps(nextProps) {
		if (this.state.itemList.length == 0 && nextProps.CommonStore.itemList != null) {
			this.setState({itemList: nextProps.CommonStore.itemList});
		}
		if (nextProps.CommonStore.expandItem != "") {
			this.getChartData(nextProps.CommonStore.expandItem);
		}
	}

	getChartData(contract_type) {
		this.setState({chartData: [],bufChartData:[]})
		axios.get(serverUrl + "/quotes/future_kline?symbol=btc_usd&type=1min&contract_type=" + contract_type).then((resp) => {
            let dataList = [];
            for (let i = 0; i < resp.data.length; i++) {
				let date = new Date(resp.data[i][0]);
				dataList.push({
					'date': date,
					'open': resp.data[i][1],
					'close': resp.data[i][4],
					'high': resp.data[i][2],
					'low': resp.data[i][3],
					'volume': resp.data[i][5],
					'data': "ticker"
				});
			}
			this.setState({chartData: dataList, bufChartData: dataList})
		}).catch((err) => {
			console.log("error!!" + err);
		});
	}

	render() {
		return (
			<div>
				<CardList itemList={this.state.itemList} chartData={this.state.bufChartData}/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {CommonStore: state.CommonReducer};
};

export default connect(mapStateToProps)(HomeContainer);
