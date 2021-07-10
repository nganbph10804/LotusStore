import React, { useEffect } from 'react'

import {
    TableContainer, Table, TableBody
    , TableRow, TableCell, TableHead

} from '@material-ui/core'
const columns = [
    {
        id: 'productThumbnail',
        label: 'Image'
    },
    {
        id: 'productName',
        label: 'Name'
    },
    {
        id: 'productPrice',
        label: 'Price'
    },
    {
        id: 'quantity',
        label: 'Quantity'
    }
]

const styles = {
    fontSize: '16px',
    width: '10%'
}

const formatText=(columnName,columnValue)=>{
    switch(columnName){

        case 'productPrice':
            return `$${columnValue}`
        case 'productThumbnail':
            return <img src={columnValue} width={250}/>
        default:
            return columnValue;
    }
}
const OrderDetail = ({ order}) => {

    const {orderItems} =order;
  
    return (
        <TableContainer>
            <TableHead>
                <TableRow>
                    {columns.map((col, pos) => {
                        return (
                            <TableCell
                                key={pos}
                                style={styles}
                            >
                                {col.label}
                            </TableCell>
                        )
                    })}
                </TableRow>
            </TableHead>
            <TableBody>
                {orderItems&&orderItems.map((row, pos) => {
                    return (
                        <TableRow
                            key={pos}
                        >
                            {columns.map((col, pos) => {
                                const columnName= col.id;
                                const columnValue= row[columnName];
                                const formatedText= formatText(columnName,columnValue);
                                return (
                                    <TableCell
                                        key={pos}
                                        style={styles}
                                    >
                                        {formatedText}
                                    </TableCell>
                                )
                            })}
                        </TableRow>
                    )
                })}
            </TableBody>

        </TableContainer>
    )
}

export default OrderDetail
