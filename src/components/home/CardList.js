import React, { PropTypes } from 'react';
import CardItem from './CardItem';

const CardList = (props) => {
    console.log(props.itemList);
    return (
        <div>
            {props.itemList.map((item, i) => {
                return (
                    <CardItem key={i} title={item.contract_name} subtitle={item.last_price} before={item.before_price}/>
                );
            })}
        </div>
    )
}

export default CardList;
