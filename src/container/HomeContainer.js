import React from 'react';
import update from 'react-addons-update';
import {connect} from 'react-redux';

import {serverUrl} from '../Config';

import CardList from '../components/home/CardList';

class HomeContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openChartNo: -1,
            itemList: [],
            subscribeTicker: null
        }
    }

    componentDidMount() {
        if (this.props.CommonStore.itemList != null) {
            this.setState({itemList: this.props.CommonStore.itemList});
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.state.items.length == 0 && nextProps.CommonStore.itemList != null){
            this.setState({itemList: nextProps.CommonStore.itemList});
        }
    }

    render() {
        return (
            <div>
                <CardList itemList={this.state.itemList}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {CommonStore: state.CommonReducer};
};

export default connect(mapStateToProps)(HomeContainer);
