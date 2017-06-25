import React from 'react';
import CardItem from './CardItem';

import {connect} from 'react-redux';

const CardList = (props) => {
    return (
        <div>
            {props.itemList.map((item, i) => {
                return (
                    <CardItem key={i} title={item.contract_name} subtitle={item.last_price} before={item.before_price} expand={props.CommonStore.expandItem==item.contract_type} contract_type={item.contract_type} chartData={props.CommonStore.expandItem==item.contract_type?props.chartData:[]}/>
                );
            })}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {CommonStore: state.CommonReducer};
};

export default connect(mapStateToProps)(CardList);
