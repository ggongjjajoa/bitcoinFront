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

const Order = (props) => {
    const actions = <Button icon onClick={() => {
        props.closeDialog()
    }}>close</Button>;
    return (
        <div>
            <Toolbar colored title="New Order" fixed actions={actions}/>
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
                    <TextField id="PriceField" placeholder="Price" type="number" leftIcon={< FontIcon > attach_money < /FontIcon>} size={10} className="md-cell md-cell--2-phone md-cell--4 md-cell--bottom" style={{
                        margin: "0px 8px",
                        height: "50px"
                    }}/>
                    <TextField id="AmountField" placeholder="Amount" type="number" leftIcon={< FontIcon > shopping_cart < /FontIcon>} size={10} className="md-cell md-cell--2-phone md-cell--4 md-cell--bottom" rightIcon={< FontIcon > vertical_align_top < /FontIcon>} style={{
                        margin: "0px 8px"
                    }}/>
                    <Slider leftIcon={< FontIcon > perm_data_setting < /FontIcon>} id="LeverageSlider" min={1} max={80} defaultValue={10} inputWidth={80} className="md-cell md-cell--4-phone md-cell--4 md-cell--bottom" style={{
                        margin: "0px 8px"
                    }} editable/>
                </div>
                <div className="md-grid" style={{
                    margin: "0px 8px",
                    padding: "0px"
                }}>
                    <Button primary raised label="Chat" className="md-cell md-cell--2-phone">chat_bubble_outline</Button>
                    <Button secondary raised label="Chat" className="md-cell md-cell--2-phone">chat_bubble_outline</Button>
                </div>
            </form>
        </div>
    )
}

export default Order
