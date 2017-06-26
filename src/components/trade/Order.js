import React from 'react';

import Papers from 'react-md/lib/Papers';

import Toolbar from 'react-md/lib/Toolbars';

import Button from 'react-md/lib/Buttons/Button';

import FontIcon from 'react-md/lib/FontIcons';

import TextField from 'react-md/lib/TextFields';

import Divider from 'react-md/lib/Dividers';

const Order = (props) => {
	const actions = <Button icon onClick={() => {
		props.closeDialog()
	}}>close</Button>;
    const leftIconPrice = <FontIcon onClick={()=>{console.log("click");
    }}>remove</FontIcon>
	return (
		<div>
			<Toolbar colored title="New Order" fixed actions={actions}/>
			<form className="md-toolbar-relative">
				<TextField id="applicationPrice" label="Price" type="number" defaultValue={0} step={0.10} min={0} floating={true} pattern="^\d+(\.|\,)\d{2}" className="md-cell" leftIcon={leftIconPrice}/>
				<TextField id="floatingPrice" label="Title" type="number" lineDirection="left" placeholder="0" className="md-cell md-cell--center"/>
			</form>
		</div>
	)
}

export default Order
