import React from 'react';

import Toolbar from 'react-md/lib/Toolbars';

import Button from 'react-md/lib/Buttons/Button';

import FontIcon from 'react-md/lib/FontIcons';

import Slider from 'react-md/lib/Sliders';

import TextField from 'react-md/lib/TextFields';

import Switch from 'react-md/lib/SelectionControls/Switch';

import Tabs from 'react-md/lib/Tabs/Tabs';
import Tab from 'react-md/lib/Tabs/Tab';
import TabsContainer from 'react-md/lib/Tabs/TabsContainer';

import NumberInput from '../numberInput';

import Checkbox from 'react-md/lib/SelectionControls/Checkbox';

class Order3 extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			price: this.props.price,
			amount: this.props.amount,
			leverage: 10,
			touchActive: false
		}
	}

	render() {
		return (
			<div>
				<Toolbar colored title="New Order" fixed actions={< Button icon onClick = {
					() => {
						this.props.closeDialog()
					}
				} > close < /Button>}/>
				<form className="md-toolbar-relative">
					<TabsContainer onTabChange={(e) => {
						console.log(e);
					}}>
						<Tabs tabId="tab">
							<Tab label="Long" style={{
								color: "#000000"
							}}/>
							<Tab label="Short" style={{
								color: "#000000"
							}}/>
						</Tabs>
					</TabsContainer>
					<div className="md-grid" style={{
						margin: "0px 0px",
						padding: "0px"
					}}>
                        <NumberInput value={0} step={0.1} label={"Price"} float={2} className="md-cell md-cell--2-phone md-cell--3 md-cell--bottom"/>
						<Checkbox id="market" name="marketCheck" label="Market" className="md-cell md-cell--2-phone md-cell--1 md-cell--bottom"/>
						<NumberInput value={0} label={"Amount"} className="md-cell md-cell--2-phone md-cell--3 md-cell--bottom"/>
                        <Button raised label="Max" className="md-cell md-cell--2-phone md-cell--1 md-cell--bottom"/>
						<NumberInput value={10} min={1} max={80} label={"Leveage"} className="md-cell md-cell--2-phone md-cell--3 md-cell--bottom"/>
                        <div className="md-cell md-cell--2-phone md-cell--1 md-cell--bottom"/>
						<Button primary raised label="Chat" className="md-cell md-cell--2-phone md-cell--2 md-cell--8-offset"></Button>
						<Button secondary raised label="Chat" className="md-cell md-cell--2-phone md-cell--2"></Button>
					</div>
				</form>
			</div>
		);
	}
}

export default Order3;