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

    _onTouchStart(data, step) {
        this.setState({
            touchActive: true
        }, () => {
            this._onPressLoop(data, step);
        });
    }

    _onTouchEnd() {
        this.setState({touchActive: false});
    }

    _onPressLoop(data, step) {
        if (this.state.touchActive) {
            let nextState = {};
            nextState[data] = (this.state[data]*1) + step;
            this.setState(nextState);
            setTimeout(() => {
                this._onPressLoop(data, step);
            }, 100);
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
                        margin: "0px 8px",
                        padding: "0px"
                    }}>
                        <Switch id="marketCheck" name="market" label="Market" className="md-cell md-cell--4-phone md-cell--12 md-cell--bottom" style={{
                            margin: "0px 8px"
                        }}/>
                    <TextField id="PriceField" placeholder="Price" value={this.state.price} onChange={(e)=>{this.setState({price:e})}} type="number" leftIcon={< FontIcon onTouchStart = {
                            () => {
                                this._onTouchStart("price", -0.1)
                            }
                        }
                        onTouchEnd = {
                            () => {
                                this._onTouchEnd()
                            }
                        } > remove < /FontIcon>} rightIcon={< FontIcon onTouchStart = {
                            () => {
                                this._onTouchStart("price", 0.1)
                            }
                        }
                        onTouchEnd = {
                            () => {
                                this._onTouchEnd()
                            }
                        } > add < /FontIcon>} className="md-cell md-cell--4-phone md-cell--4 md-cell--bottom" style={{
                            margin: "0px 8px"
                        }}/>
                        <TextField id="AmountField" placeholder="Amount" value={this.state.amount} type="number" leftIcon={< FontIcon onTouchStart = {
                            () => {
                                this._onTouchStart("amount", -1)
                            }
                        }
                        onTouchEnd = {
                            () => {
                                this._onTouchEnd()
                            }
                        } > remove < /FontIcon>} rightIcon={< div > < FontIcon > vertical_align_top < /FontIcon > < FontIcon onTouchStart = { () => { this._onTouchStart("amount", 1) } } onTouchEnd = { () => { this._onTouchEnd() } } > add < /FontIcon > </div>} className="md-cell md-cell--4-phone md-cell--4 md-cell--bottom" style={{
                            margin: "0px 8px"
                        }}/>
                        <TextField placeholder="Leverage" id="LeverageField" value={this.state.leverage} type="number" leftIcon={< FontIcon onTouchStart = {
                            () => {
                                this._onTouchStart("leverage", -1)
                            }
                        }
                        onTouchEnd = {
                            () => {
                                this._onTouchEnd()
                            }
                        } > remove < /FontIcon>} rightIcon={< FontIcon onTouchStart = {
                            () => {
                                this._onTouchStart("leverage", 1)
                            }
                        }
                        onTouchEnd = {
                            () => {
                                this._onTouchEnd()
                            }
                        } > add < /FontIcon>} className="md-cell md-cell--4-phone md-cell--4 md-cell--bottom" style={{
                            margin: "0px 8px"
                        }}/>
                        <Button primary raised label="Chat" className="md-cell md-cell--2-phone md-cell--2 md-cell--8-offset">chat_bubble_outline</Button>
                        <Button secondary raised label="Chat" className="md-cell md-cell--2-phone md-cell--2">chat_bubble_outline</Button>
                    </div>
                </form>
            </div>
        );
    }
}

export default Order3;
