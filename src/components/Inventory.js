import React, { useEffect, useMemo, useState } from 'react';
import { useTable, useSortBy, useGlobalFilter, useRowSelect, useExpanded, useGroupBy } from 'react-table';
import MOCK_DATA from './REAGENTS.json';
import { COLUMNS } from './columns_inventory'
import './table.css';
import { GlobalFilter } from './GlobalFilter';
import AddReagent from './AddReagent';
import { Button} from 'reactstrap';
import { Checkbox } from './CheckBox';
import {AiFillCaretDown, AiFillCaretUp, AiOutlineGroup, AiOutlineUngroup, AiOutlineRight, AiOutlineDown} from 'react-icons/ai';
import QRCode  from 'qrcode.react';
import { Portal } from 'react-portal';
import html2canvas from 'html2canvas';

export const Inventory = (props) => {
    
    const columns = useMemo(() => COLUMNS, [])
    //const data = useMemo(() => props.reagents, [])

    const [data, setData] = useState(props.reagents, []);

    const tableInstance = useTable({
            columns,
            data,
            initialState: {
                sortBy: [
                    {
                        id: 'date_rc',
                        desc: true
                    }
                ],
                groupBy: ['lot_nr'],
            },
            autoResetExpanded: false,
            autoResetSelectedRows: false,
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
        toggleAllRowsExpanded,
        isAllRowsExpanded,   
        toggleRowExpanded
        //state: { groupBy, expanded },
    } = tableInstance

    //useMemo(() => toggleAllRowsExpanded(true), [toggleAllRowsExpanded]);


    const { globalFilter } = state

    const [isSidebarOpen, setToggleState] = useState(false)
    //const [selectedRow, setSelectRows] = useState('')

    const toggleSidebar = () => {     
        setToggleState(!isSidebarOpen);           
    }    

    const deleteRows = () => { 
        selectedFlatRows.forEach(row => {
            // const dataCopy = [...data];
            // dataCopy.splice(row.index, 1);            
            //setData(dataCopy)
            //alert(row.original.id)       
            props.deleteReagents(row.original.id)
        });
    }

    const downloadQR = () => {
        // const renderQR = () => {
        //     return(
        //         <div style={{display: "none"}}>
        //             <QRCode
        //                 id="123456"
        //                 value="123456"
        //                 size={290}
        //                 level={"H"}
        //                 includeMargin={true}
        //             />
        //         </div>    

        //     );  
        // }

        // const startDownload = () => {
        
        document.getElementById("hidden-qr").style.display = "block";
        document.getElementById("hidden-qr").style.marginTop = "1500px";

        selectedFlatRows.forEach(row => {
            if (row.original != null) {
                var elemId = String(row.original.id)+"-ext" 
                var elem = document.getElementById(`${elemId}`)
                elem.style.display = "block";           
                html2canvas(elem).then(function(canvas) {
                    elem.style.display = "none";  
                    const pngUrl = canvas
                        .toDataURL("image/png")
                        .replace("image/png", "image/octet-stream");  
                    let downloadLink = document.createElement("a");
                    downloadLink.href = pngUrl;
                    downloadLink.download = elemId+".png";
                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                    document.body.removeChild(downloadLink);                                   
                })    
            }            
        });

        document.getElementById("hidden-qr").style.display = "none";
        document.getElementById("hidden-qr").style.marginTop = "0px";
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
                        {selectedFlatRows[0] ? (<span><Button onClick={downloadQR} className="btn-styled">Print QR</Button> </span>) : <span><Button className="btn btn-white" disabled>Print QR</Button> </span>}
                        {selectedFlatRows[0] ? (<span><Button className="btn" color="danger"
                            onClick={deleteRows}>Delete</Button> </span>) : <span><Button className="btn btn-white" disabled>Delete</Button> </span>}
                        <span><Button className="btn-styled" 
                            onClick={toggleSidebar}>Add New</Button></span>
                    </div>   
                </div>                
            </div>
            <div className="table-container container-fluid" >                    
                <table {...getTableProps()}>
                    <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps(column.getSortByToggleProps())} {...column.getHeaderProps()}>
                            {column.canGroupBy ? (
                                // If the column can be grouped, let's add a toggle
                                <span {...column.getGroupByToggleProps()}>
                                {column.isGrouped ? <span><AiOutlineUngroup/> </span> : <span><AiOutlineGroup/> </span>}
                                </span>                                                                
                            ) : null}         
                            {column.render('Header')}                            
                            <span>
                            {column.canSort ? (
                                column.isSorted ? (column.isSortedDesc ? <AiFillCaretDown/> : <AiFillCaretUp/>) : ''
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
                        <React.Fragment {...row.getRowProps()}>                        
                        <tr>
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
                                        {row.isExpanded ? <AiOutlineDown/> : <AiOutlineRight/>}
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
                        {row.isExpanded && !row.subRows.length ? (
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
                {/* <pre>
                    <code>
                        {JSON.stringify({
                            selectedFlatRows: selectedFlatRows.map((row) => row.original),
                        },
                        null,
                        2
                        )}
                    </code>
                </pre> */}
                <div id="hidden-qr">                    
                    {
                        selectedFlatRows.map(row => {
                            if (row.original == null) {
                                return <div></div>
                            } 
                            else {
                                return( 
                                    <div style={{display: "none"}} key={row.original.id} id={String(row.original.id)+"-ext"} className="container">
                                        <div className="row">                                            
                                            <h5><b>LOT Number</b>: {row.original.lot_number} {"\n"}</h5>                                                                                                                                                                                            
                                        </div>               
                                        <div className="row">                                    
                                            <QRCode
                                                id={String(row.original.id)}
                                                value={String(row.original.id)}
                                                size={290}
                                                level={"H"}
                                                includeMargin={false}
                                            />
                                        </div>              
                                        <div className="row">
                                            <p><b>Unique ID</b>: {row.original.id}</p>{' '}    
                                        </div>                        
                                        <div className="row">
                                            <p><b>Pack No</b>: 1/5</p>                                                                                                    
                                        </div>                                                                                           
                                    </div>
                                );
                            }                                        
                        })
                    }
                </div>
                <AddReagent isSidebarOpen={isSidebarOpen} onSidebarToggle={toggleSidebar} 
                    selectedRow={{selectedFlatRows: selectedFlatRows.map((row) => row.original)[0]}}
                    resetAddReagentForm={props.resetAddReagentForm}
                    changeAddReagentForm={props.changeAddReagentForm} 
                    postReagents={props.postReagents} />                                                           
            </div>
        </div>
        </>
    );
}