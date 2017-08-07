import React from 'react';

import Tabs from 'react-md/lib/Tabs/Tabs';
import Tab from 'react-md/lib/Tabs/Tab';
import TabsContainer from 'react-md/lib/Tabs/TabsContainer';

import Papers from 'react-md/lib/Papers';

import FontIcon from 'react-md/lib/FontIcons';

import Button from 'react-md/lib/Buttons/Button';

import Dialog from 'react-md/lib/Dialogs';

import Order from '../../container/OrderContainer';

import OrderBook from './OrderBook';

import PositionList from './PositionList';
import OrderList from './OrderList';
import HistoryList from './HistoryList';

class TapsCtrl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            pageX: null,
            pageY: null,
            price: 0,
            amount: 0
        };
    }

    openDialog(e, price, amount) {
        let {pageX, pageY} = e;
        if (e.changedTouches) {
            const [touch] = e.changedTouches;
            pageX = touch.pageX;
            pageY = touch.pageY;
        }
        this.setState({visible: true, pageX, pageY, price:price, amount:amount});
    }

    closeDialog() {
        this.setState({visible: false});
    }

    render() {
        let height = window.innerHeight;
        return (
            <div>
                <TabsContainer panelClassName="md-grid" colored panelStyle={{
                    padding: "0px"
                }}>
                    <Tabs tabId="tabs" style={{
                        boxShadow: "0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12), 0 2px 4px -1px rgba(0,0,0,.4)"
                    }}>
                        <Tab label="Order Book">
                            <OrderBook depthList={this.props.depthList} tickerList={this.props.tickerList} onOrder={this.openDialog.bind(this)}/>
                        </Tab>
                        <Tab label="Position">
                            <PositionList/>
                        </Tab>
                        <Tab label="Order">
                            <OrderList/>
                        </Tab>
                        <Tab label="History">
                            <HistoryList/>
                        </Tab>
                    </Tabs>
                </TabsContainer>
                <Button onClick={(e)=>{this.openDialog(e,0,0)}} floating secondary fixed>
                    add
                </Button>
                <Dialog id="fullOrder" onHide={()=>{this.closeDialog()}} {...this.state} fullPage aria-label="New Order">
                    <Order closeDialog={this.closeDialog.bind(this)} price={this.state.price} amount={this.state.amount}/>
                </Dialog>
            </div>
        );
    }
}

export default TapsCtrl;
