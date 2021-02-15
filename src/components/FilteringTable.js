import React, { useMemo, useState } from 'react';
import { useTable, useSortBy, useGlobalFilter } from 'react-table';
import MOCK_DATA from './MOCK_DATA.json';
import { COLUMNS } from './columns'
import './table.css';
import {AiOutlineArrowDown, AiOutlineArrowUp} from 'react-icons/ai'
import { GlobalFilter } from './GlobalFilter';
import AddReagent from './AddReagent';
import { Button} from 'reactstrap';

export const Inventory = (props) => {
    
    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => MOCK_DATA, [])
    
    const tableInstance = useTable({
            columns,
            data
        },         
        useGlobalFilter,
        useSortBy)

    const { 
        getTableProps, 
        getTableBodyProps, 
        headerGroups, 
        rows, 
        prepareRow,
        state,
        setGlobalFilter
    } = tableInstance

    const { globalFilter } = state

    const [isSidebarOpen, setToggleState] = useState(false)

    const toggleSidebar = () => {
        setToggleState(!isSidebarOpen)
    }    

    return(
        <>        
        <div id="page-wrap" className="container-fluid">
            <div className="container-fluid">
                <div className="row text-center">
                    <div className="col-sm-4 ml-auto">
                        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>
                    </div>                 
                    <div className="ml-auto">
                        <Button className="btn-styled">Select</Button>{'  '}                        
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
                <AddReagent isSidebarOpen={isSidebarOpen} onSidebarToggle={toggleSidebar}/>                                                            
            </div>
        </div>
        </>
    );
}