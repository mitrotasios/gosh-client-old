import React, { useMemo, useState } from 'react';
import { useTable, useSortBy, useGlobalFilter, useRowSelect, useExpanded } from 'react-table';
import MOCK_DATA from './MOCK_DATA.json';
import './table.css';
import {AiOutlineArrowDown, AiOutlineArrowUp} from 'react-icons/ai'
import { GlobalFilter } from './GlobalFilter';
import AddReagent from './AddReagent';
import { Button} from 'reactstrap';
import { Checkbox } from './CheckBox';
import { COLUMNS } from './columns'


export const Inventory = (props) => {
    
    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => MOCK_DATA, [])
    
    const tableInstance = useTable({
            columns,
            data
        },         
        useGlobalFilter,
        useSortBy,
        useExpanded,
        useRowSelect,        
        (hooks) => {
            hooks.visibleColumns.push((columns) => {
                return [                    
                    ...columns,
                    {
                        id: 'selection',
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
        state: { expanded },
    } = tableInstance

    const { globalFilter } = state

    const [isSidebarOpen, setToggleState] = useState(false)
    const [selectedRow, setSelectRows] = useState('')

    const toggleSidebar = () => {
        setToggleState(!isSidebarOpen);
        /*
        alert(JSON.stringify(
            {
                selectedFlatRows: selectedFlatRows.map((row) => row.original),
            },
            null,
            2))
        */
    }    
    /*
    setSelectRows(
        {
            selectedFlatRows: selectedFlatRows.map((row) => row.original),
        }
    )
    */

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
                        <Button className="btn-styled" 
                            onClick={toggleSidebar}>Add New</Button>
                    </div>   
                </div>                
            </div>
            <div className="table-container container-fluid">                    
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
                        {rows.map((row) => {
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