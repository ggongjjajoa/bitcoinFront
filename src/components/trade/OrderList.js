import React, { PropTypes } from 'react';
import {ExpansionList, ExpansionPanel} from 'react-md/lib/ExpansionPanels';

const OrderList = (props) => {
    return (
        <div className="md-cell md-cell--4-phone md-cell--12" style={{
            margin: "0px 0px",
            width: "100%"
        }}>
            <ExpansionList style={{
                padding: 16
            }}>
                <ExpansionPanel label="Hello" secondaryLabel="World!" defaultExpanded></ExpansionPanel>
                <ExpansionPanel label="two" secondaryLabel="aaa" defaultExpanded></ExpansionPanel>
                <ExpansionPanel label="three" secondaryLabel="bbbb" defaultExpanded></ExpansionPanel>
                <ExpansionPanel label="three" secondaryLabel="bbbb" defaultExpanded></ExpansionPanel>
                <ExpansionPanel label="three" secondaryLabel="bbbb" defaultExpanded></ExpansionPanel>
                <ExpansionPanel label="three" secondaryLabel="bbbb" defaultExpanded></ExpansionPanel>
            </ExpansionList>
        </div>
    )
}

export default OrderList;
