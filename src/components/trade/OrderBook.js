import React, {PropTypes} from 'react'

import DataTable from 'react-md/lib/DataTables/DataTable';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import TableBody from 'react-md/lib/DataTables/TableBody';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableColumn from 'react-md/lib/DataTables/TableColumn';

import numeral from 'numeral';

import dateformat from 'dateformat';

const OrderBook = (props) => {
	return (
		<div className="md-grid" style={{padding:"0px 0px"}}>
			<DataTable plain responsive={false} className="md-cell md-cell--2-phone md-cell--6" style={{margin:"0px 0px",width:"50%"}}>
				<TableHeader>
					<TableRow>
						<TableColumn style={{padding:"6px"}}>depth</TableColumn>
						<TableColumn style={{padding:"6px"}}>Price</TableColumn>
						<TableColumn style={{padding:"6px"}}>Vol</TableColumn>
					</TableRow>
				</TableHeader>
				<TableBody>
					{props.depthList.map((item, i) => {
						return (
							<TableRow key={i} onClick={(e)=>{props.onOrder(e,item[0],item[1])}}>
                                <TableColumn style={{padding:"6px"}}>{item[2]}</TableColumn>
								<TableColumn style={{padding:"6px"}}>{numeral(item[0]).format('0,0.00')}</TableColumn>
								<TableColumn style={{padding:"6px", textAlign:"right"}}>{item[1]}</TableColumn>
							</TableRow>
						);
					})}
				</TableBody>
			</DataTable>
			<DataTable plain responsive={false} className="md-cell md-cell--2-phone md-cell--6" style={{margin:"0px 0px",width:"50%"}}>
				<TableHeader>
					<TableRow>
                        <TableColumn style={{padding:"6px"}}>Time</TableColumn>
						<TableColumn style={{padding:"6px"}}>Price</TableColumn>
						<TableColumn style={{padding:"6px"}}>Vol</TableColumn>
					</TableRow>
				</TableHeader>
				<TableBody>
					{props.tickerList.map((item, i) => {
						return (
							<TableRow key={i} onClick={(e)=>{props.onOrder(e,item.price,item.amount)}}>
								<TableColumn style={{padding:"6px"}}>{dateformat(item.date, "hh:MM:ss")}</TableColumn>
								<TableColumn style={{padding:"6px"}}>{numeral(item.price).format('0,0.00')}</TableColumn>
								<TableColumn style={{padding:"6px", textAlign:"right"}}>{item.amount}</TableColumn>
							</TableRow>
						);
					})}
				</TableBody>
			</DataTable>
		</div>
	);
}

export default OrderBook;
