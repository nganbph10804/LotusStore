import React from 'react'
import {
    TableContainer, Table, TableHead
    , TableRow, TableBody, TableCell
} from '@material-ui/core'
import moment from 'moment';
import { useHistory } from 'react-router-dom';

const collumns = [
    {
        id: 'orderCreatedDate',
        label: 'Order Date'
    },
    {
        id: 'documentID',
        label: 'OrderID'
    },
    {
        id: 'orderTotal',
        label: 'Amount'
    }

]

const styles = {
    fontSize: '16px',
    cursor: 'pointer',
    width: '10%'
}
const formatText = (columnName, columnValue) => {
    switch (columnName) {
        case 'orderTotal':
            return `$${columnValue}`;
        case 'orderCreatedDate':
            return moment(columnValue.nano).format('DD/MM/YYYY');

        default:
            return columnValue;
    }
};
const OrderHistory = ({ orders }) => {
    const { data } = orders;
    const history=useHistory();
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        {collumns.map((column, pos) => {
                            const { label } = column;
                            return (
                                <TableCell
                                    key={pos}
                                    style={styles}
                                >
                                    {label}
                                </TableCell>
                            )
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data && data !== 'null' && data !== 'undefined'? data.map((row, pos) => {
                        const {documentID}=row;
                        return (
                            <TableRow 
                            key={pos}
                            onClick={()=>history.push(`/order/${documentID}`)}
                            >
                                {collumns.map((column, pos) => {
                                    const columnName = column.id;
                                    const columnValue = row[columnName];
                                    const formattedText = formatText(columnName, columnValue);

                                    return (
                                        <TableCell
                                            key={pos}
                                            style={styles}
                                        >
                                            {formattedText}
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                        )
                    }):<h1>Opps! you have nothing! </h1>}
                </TableBody>
            </Table>

        </TableContainer>
    )
}

export default OrderHistory
