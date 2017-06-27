import React from 'react';

import Tabs from 'react-md/lib/Tabs/Tabs';
import Tab from 'react-md/lib/Tabs/Tab';
import TabsContainer from 'react-md/lib/Tabs/TabsContainer';

import Papers from 'react-md/lib/Papers';

import FontIcon from 'react-md/lib/FontIcons';

import Button from 'react-md/lib/Buttons/Button';

import Dialog from 'react-md/lib/Dialogs';

import Order from './Order3';

class TapsCtrl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            pageX: null,
            pageY: null
        };
    }

    openDialog(e,data) {
        let {pageX, pageY} = e;
        if (e.changedTouches) {
            const [touch] = e.changedTouches;
            pageX = touch.pageX;
            pageY = touch.pageY;
        }
        this.setState({visible: true, pageX, pageY});
    }

    closeDialog() {
        this.setState({visible: false});
    }

    render() {
        return (
            <div>
                <TabsContainer panelClassName="md-grid" colored panelStyle={{
                    paddingLeft: "0px",
                    paddingRight: "0px"
                }}>
                    <Tabs tabId="tabs" style={{
                        boxShadow: "0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12), 0 2px 4px -1px rgba(0,0,0,.4)"
                    }}>
                        <Tab label="Order Book">
                            <Papers className="md-cell md-cell--2-phone md-cell--4-tablet md-cell--6-desktop">Avatars</Papers>
                            <Papers className="md-cell md-cell--2-phone md-cell--4-tablet md-cell--6-desktop">vvv</Papers>
                        </Tab>
                        <Tab label="Position">
                            <div className="md-cell md-cell--4">two</div>
                        </Tab>
                        <Tab label="Order">
                            <div className="md-cell md-cell--4">two</div>
                        </Tab>
                        <Tab label="History">
                            <div className="md-cell md-cell--4">two</div>
                        </Tab>
                    </Tabs>
                </TabsContainer>
                <Button onClick={(e)=>{this.openDialog(e,11)}} floating secondary fixed>
                    add
                </Button>
                <Dialog id="fullOrder" onHide={()=>{this.closeDialog()}} {...this.state} fullPage aria-label="New Order">
                    <Order closeDialog={this.closeDialog.bind(this)} price={0} amount={0}/>
                </Dialog>
            </div>
        );
    }
}

export default TapsCtrl;
