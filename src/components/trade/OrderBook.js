import React, {PropTypes} from 'react'

import DataTable from 'react-md/lib/DataTables/DataTable';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import TableBody from 'react-md/lib/DataTables/TableBody';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableColumn from 'react-md/lib/DataTables/TableColumn';

import numeral from 'numeral';

const OrderBook = (props) => {
    console.log("update");
	return (
		<div className="md-grid" style={{padding:"0px 0px"}}>
			<DataTable plain responsive={false} className="md-cell md-cell--2-phone md-cell--6" style={{margin:"0px 0px",width:"50%"}}>
				<TableHeader>
					<TableRow>
						<TableColumn style={{padding:"10px"}}>type</TableColumn>
						<TableColumn style={{padding:"10px"}}>Price</TableColumn>
						<TableColumn style={{padding:"10px"}}>Amount</TableColumn>
					</TableRow>
				</TableHeader>
				<TableBody>
					{props.depthList.map((item, i) => {
						return (
							<TableRow key={i} onClick={(e)=>{props.onOrder(e,item[0],item[1])}}>
                                <TableColumn style={{padding:"10px"}}>{item[2]}</TableColumn>
								<TableColumn style={{padding:"10px"}}>{numeral(item[0]).format('0,0.00')}</TableColumn>
								<TableColumn style={{padding:"10px", textAlign:"right"}}>{item[1]}</TableColumn>
							</TableRow>
						);
					})}
				</TableBody>
			</DataTable>
			<DataTable plain responsive={false} className="md-cell md-cell--2-phone md-cell--6" style={{margin:"0px 0px",width:"50%"}}>
				<TableHeader>
					<TableRow>
                        <TableColumn style={{padding:"10px"}}>Time</TableColumn>
						<TableColumn style={{padding:"10px"}}>Price</TableColumn>
						<TableColumn style={{padding:"10px"}}>Amount</TableColumn>
					</TableRow>
				</TableHeader>
				<TableBody>
					{props.tickerList.map((item, i) => {
                        let date = new Date(item.date);
						return (
							<TableRow key={i} onClick={(e)=>{props.onOrder(e,item.price,item.amount)}}>
								<TableColumn style={{padding:"10px"}}>{date.getHours()+":"+date.getMinutes()}</TableColumn>
								<TableColumn style={{padding:"10px"}}>{numeral(item.price).format('0,0.00')}</TableColumn>
								<TableColumn style={{padding:"10px", textAlign:"right"}}>{item.amount}</TableColumn>
							</TableRow>
						);
					})}
				</TableBody>
			</DataTable>
		</div>
	);
}

export default OrderBook;
