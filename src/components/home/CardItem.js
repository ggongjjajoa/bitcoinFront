import React from 'react';
import {connect} from 'react-redux';
import numeral from 'numeral';

import {Link} from 'react-router';

import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import CardActions from 'react-md/lib/Cards/CardActions';
import CardText from 'react-md/lib/Cards/CardText';

import Avatar from 'react-md/lib/Avatars';

import Button from 'react-md/lib/Buttons';

import {setExpandCard} from '../../action/CommonActions';

import Chart from './Chart';

var height = window.innerHeight;
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
			}} avatar={< Button component = {
				Link
			}
			to = {
				"/trade/" + props.contract_type
			}
			className = "md-cell--left" icon > arrow_left < /Button>}></CardTitle>
			<CardText expandable style={{
				paddingTop: "12px",
				paddingBottom: "12px"
			}}>
				<div style={{height: "200px"}}>
					<Chart chartData={props.chartData} height={200} start={props.start} end={props.end}/>
				</div>
			</CardText>
		</Card>
	)
}

export default connect(null)(itemCard);
