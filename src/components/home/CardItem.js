import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import numeral from 'numeral';

import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import CardActions from 'react-md/lib/Cards/CardActions';
import CardText from 'react-md/lib/Cards/CardText';

import Avatar from 'react-md/lib/Avatars';

import {setExpandCard} from '../../action/CommonActions';
import Chart from './Chart';

const itemCard = (props) => {
	return (
		<Card onExpanderClick={() => {
			if (props.expand) {
				props.dispatch(setExpandCard(""));
			} else {
				props.dispatch(setExpandCard(props.contract_type));
			}
		}} expanded={props.expand}>
			<CardTitle title={props.title == ""
				? "Data Not Found"
				: props.title} subtitle={numeral(props.subtitle).format('0,0.00')} expander style={{
				padding: "12px"
			}} avatar={< Avatar src = {
				"http://localhost/img/btc.png"
			}
			role = "presentation" > B < /Avatar>}/>
			<CardText expandable>
                <Chart chartData={props.chartData}/>
			</CardText>
		</Card>
	)
}

export default connect(null)(itemCard);
