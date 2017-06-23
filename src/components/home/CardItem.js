import React, { PropTypes } from 'react';

import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import CardActions from 'react-md/lib/Cards/CardActions';
import CardText from 'react-md/lib/Cards/CardText';

import Avatar from 'react-md/lib/Avatars';

import numeral from 'numeral';

const itemCard = (props) => {
    console.log(props);
    return (
        <Card onExpanderClick={()=>{console.log("click");}}>
            <CardTitle title={props.title==""?"Data Not Found":props.title} subtitle={numeral(props.subtitle).format('0,0.00')} expander style={{padding:"12px"}} avatar={<Avatar src={"http://localhost/img/btc.png"} role="presentation">B</Avatar>}/>
            <CardText expandable>
                <p>aaaa</p>
                <p>aaaa</p>
                <p>aaaa</p>
                <p>aaaa</p>
                <p>aaaa</p>
                <p>aaaa</p>
                <p>aaaa</p>
            </CardText>
        </Card>
    )
}

export default itemCard;
