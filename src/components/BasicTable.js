import React, { useMemo } from 'react';
import { useTable, useSortBy } from 'react-table';
import MOCK_DATA from './MOCK_DATA.json';
import { COLUMNS } from './columns_th'
import './table.css';
import {FaArrowDown, FaArrowUp} from 'react-icons/fa'
import {AiOutlineArrowDown, AiOutlineArrowUp} from 'react-icons/ai'

export const BasicTable = () => {
    
    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => MOCK_DATA, [])
    
    const tableInstance = useTable({
            columns,
            data
        },
        useSortBy)

    const { 
        getTableProps, 
        getTableBodyProps, 
        headerGroups, 
        rows, 
        prepareRow
    } = tableInstance

    return(
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    <span>
                                        {column.isSorted ? (column.isSortedDesc ? <AiOutlineArrowDown/> : <AiOutlineArrowUp/>) : ''}
                                    </span>
                                </th>
                            ))}
                    </tr>
                ))}                
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                        prepareRow(row)
                        return(
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}                                
                            </tr>
                        );
                    })}                
            </tbody>
        </table>
    );
}