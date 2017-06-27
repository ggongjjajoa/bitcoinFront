import React from 'react';

import Toolbar from 'react-md/lib/Toolbars';

import Button from 'react-md/lib/Buttons/Button';

import FontIcon from 'react-md/lib/FontIcons';

import Switch from 'react-md/lib/SelectionControls/Switch';

import NumericInput from 'react-numeric-input';

class Order extends React.Component {
    render() {
        return (
            <div>
                <Toolbar colored title="New Order" fixed actions={<Button icon onClick={() => {
		            this.props.closeDialog()
		        }}>close</Button>}/>
                <form className="md-toolbar-relative">
                    <div className="md-grid">
                        <div className="md-cell md-cell--1-phone md-cell--3">
                            Price
                        </div>
                        <div className="md-cell md-cell--3-phone md-cell--9">
                            <NumericInput mobile className="form-control" style={{
                                width: "100%"
                            }}/>
                        </div>
                        <div className="md-cell md-cell--1-phone md-cell--3">
                            Amount
                        </div>
                        <div className="md-cell md-cell--3-phone md-cell--9">
                            <NumericInput mobile className="form-control" style={{
                                width: "100%"
                            }}/>
                        </div>
                        <div className="md-cell md-cell--1-phone md-cell--3">
                            Laverage
                        </div>
                        <div className="md-cell md-cell--3-phone md-cell--9">
                            <NumericInput mobile className="form-control" style={{
                                width: "100%"
                            }}/>
                        </div>
						<Switch id="marketCheck" name="market" label="Market" className="md-cell md-cell--4-phone md-cell--12 md-cell--bottom" style={{
	                        margin: "0px 8px"
	                    }}/>
                        <div className="md-cell md-cell--2-phone md-cell--6">
                            <Button flat label="Open Long"/>
                            <Button flat label="Close Long"/>
                            <Button flat label="Open Short"/>
                            <Button flat label="Close Short"/>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default Order;
