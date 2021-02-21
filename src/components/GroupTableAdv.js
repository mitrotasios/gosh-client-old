import React, { useMemo, useState } from 'react';
import { useTable, useSortBy, useGlobalFilter, useRowSelect, useExpanded, useGroupBy } from 'react-table';
import MOCK_DATA from './MOCK_DATA.json';
import { COLUMNS } from './columns'
import './table.css';
import { GlobalFilter } from './GlobalFilter';
import AddReagent from './AddReagent';
import { Button} from 'reactstrap';
import { Checkbox } from './CheckBox';
import {AiOutlineArrowDown, AiOutlineArrowUp, AiOutlineGroup, AiOutlineUngroup} from 'react-icons/ai';
import {BiRightArrow, BiDownArrow} from 'react-icons/bi'

export const AdvTable = (props) => {
    
    const columns = useMemo(() => COLUMNS, [])
    //const data = useMemo(() => MOCK_DATA, [])

    const [data, setData] = useState(MOCK_DATA, []);
    
    const tableInstance = useTable({
            columns,
            data,
            initialState: {
                sortBy: [
                    {
                        id: 'date_rc',
                        desc: true
                    }
                ]
            }
        },         
        useGlobalFilter,
        useGroupBy,
        useSortBy,
        useExpanded,
        useRowSelect,        
        (hooks) => {
            hooks.visibleColumns.push((columns) => {
                return [                    
                    ...columns,
                    {
                        id: 'selection',
                        groupByBoundary: true,
                        Header: ({ getToggleAllRowsSelectedProps }) => (
                            <Checkbox {...getToggleAllRowsSelectedProps()} />
                        ),
                        Cell: ({ row }) => (
                            <Checkbox {...row.getToggleRowSelectedProps()}/>
                        )
                    }
                    
                ]
            })
        })

    const { 
        getTableProps, 
        getTableBodyProps, 
        headerGroups, 
        rows, 
        prepareRow,
        state,
        setGlobalFilter,
        selectedFlatRows,
        visibleColumns,
        state: { groupBy, expanded },
    } = tableInstance

    const { globalFilter } = state

    const [isSidebarOpen, setToggleState] = useState(false)
    const [selectedRow, setSelectRows] = useState('')

    const toggleSidebar = () => {
        setToggleState(!isSidebarOpen);
    }    

    const deleteRows = () => {
        selectedFlatRows.forEach(row => {
            const dataCopy = [...data];
            dataCopy.splice(row.index, 1);
            setData(dataCopy)
        });
    }

    return(
        <>        
        <div id="page-wrap" className="container-fluid">
            <div className="container-fluid">
                <div className="row text-center">
                    <img id="logo" src="/assets/images/GOSH.png" height="40px" width="200px"/>                    
                    <div className="col-sm-4 ml-auto">
                        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>
                    </div>                 
                    <div className="ml-auto">
                        <Button className="btn-styled">Print QR</Button>{'  '}                        
                        {selectedFlatRows[0] ? (<span><Button className="btn" color="danger"
                            onClick={deleteRows}>Delete</Button> </span>) : ''}
                        <Button className="btn-styled" 
                            onClick={toggleSidebar}>Add New</Button>
                    </div>   
                </div>                
            </div>
            <div className="table-container container-fluid">                    
                <table {...getTableProps()}>
                    <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps(column.getSortByToggleProps())} {...column.getHeaderProps()}>
                            {column.canGroupBy ? (
                                // If the column can be grouped, let's add a toggle
                                <span {...column.getGroupByToggleProps()}>
                                {column.isGrouped ? <AiOutlineUngroup/> : <AiOutlineGroup/>}
                                </span>                                                                
                            ) : null}         
                            {column.render('Header')}                            
                            <span>
                            {column.canSort ? (
                                column.isSorted ? (column.isSortedDesc ? <AiOutlineArrowDown/> : <AiOutlineArrowUp/>) : ''
                            ) : null}
                            </span>
                            </th>          
                                      
                        ))}                        
                        </tr>
                    ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row)
                        return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                            return (
                                <td
                                // For educational purposes, let's color the
                                // cell depending on what type it is given
                                // from the useGroupBy hook
                                {...cell.getCellProps()}                                
                                >
                                {cell.isGrouped ? (
                                    // If it's a grouped cell, add an expander and row count
                                    <>
                                    <span {...row.getToggleRowExpandedProps()}>
                                        {row.isExpanded ? <BiDownArrow/> : <BiRightArrow/>}
                                    </span>{' '}
                                    {cell.render('Cell')} ({row.subRows.length})
                                    </>
                                ) : cell.isAggregated ? (
                                    // If the cell is aggregated, use the Aggregated
                                    // renderer for cell
                                    cell.render('Aggregated')
                                ) : cell.isPlaceholder ? null : ( // For cells with repeated values, render null
                                    // Otherwise, just render the regular cell
                                    cell.render('Cell')
                                )}
                                </td>
                            )
                            })}
                        </tr>
                        )
                    })}
                    </tbody>
                </table>  
                <AddReagent isSidebarOpen={isSidebarOpen} onSidebarToggle={toggleSidebar} 
                    selectedRow={
                        { 
                            selectedFlatRows: selectedFlatRows.map((row) => row.original)[0]
                        }}/>                                                            
            </div>
        </div>
        </>
    );
}