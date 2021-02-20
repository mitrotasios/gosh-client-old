import React, { useMemo, useState } from 'react';
import { useTable, useSortBy, useGlobalFilter, useRowSelect, useExpanded } from 'react-table';
import MOCK_DATA from './MOCK_DATA.json';
import { COLUMNS } from './columns'
import './table.css';
import {AiOutlineArrowDown, AiOutlineArrowUp} from 'react-icons/ai'
import { GlobalFilter } from './GlobalFilter';
import AddReagent from './AddReagent';
import { Button} from 'reactstrap';
import { Checkbox } from './CheckBox';

export const TableTest = (props) => {
    
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
        visibleColumns,
        //state: { expanded },
    } = tableInstance

    const { globalFilter } = state

    const [isSidebarOpen, setToggleState] = useState(false)
    const [selectedRow, setSelectRows] = useState('')

    const toggleSidebar = () => {
        setToggleState(!isSidebarOpen);
    }    

    const renderRowSubComponent = React.useCallback(
        ({ row }) => (
          <pre
            style={{
              fontSize: '10px',
            }}
          >
            <code>{JSON.stringify({ values: row.original }, null, 2)}</code>
          </pre>
        ),
        []
      )

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
                    {rows.map((row, i) => {
                        prepareRow(row)
                        return (
                        // Use a React.Fragment here so the table markup is still valid
                        <React.Fragment {...row.getRowProps()}>
                            <tr>
                            {row.cells.map(cell => {
                                return (
                                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                )
                            })}
                            </tr>
                            {/*
                                If the row is in an expanded state, render a row with a
                                column that fills the entire length of the table.
                            */}
                            {row.isExpanded ? (
                            <tr>
                                <td colSpan={visibleColumns.length}>
                                {/*
                                    Inside it, call our renderRowSubComponent function. In reality,
                                    you could pass whatever you want as props to
                                    a component like this, including the entire
                                    table instance. But for this example, we'll just
                                    pass the row
                                    */}
                                {renderRowSubComponent({ row })}
                                </td>
                            </tr>
                            ) : null}
                        </React.Fragment>
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