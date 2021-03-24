import React, { useEffect, useMemo, useState } from 'react';
import { useTable, useSortBy, useGlobalFilter, useRowSelect, useExpanded, useGroupBy } from 'react-table';
import MOCK_DATA from './REAGENTS.json';
import { COLUMNS } from './columns_inventory'
import './table.css';
import { GlobalFilter } from './GlobalFilter';
import AddReagent from './AddReagent';
import { Button, Modal, ModalHeader, ModalBody, Label, Row, Col } from 'reactstrap';
import {Control, Form, Errors, actions} from 'react-redux-form';
import { Checkbox } from './CheckBox';
import {AiFillCaretDown, AiFillCaretUp, AiOutlineGroup, AiOutlineUngroup, AiOutlineRight, AiOutlineDown} from 'react-icons/ai';
import QRCode  from 'qrcode.react';
import { Portal } from 'react-portal';
import html2canvas from 'html2canvas';
import { updateReagents } from '../redux/ActionCreators';

const required = (val) => val && val.length;

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
                        id: 'dateReceived',
                        desc: true
                    }
                ],
                groupBy: ['lotNr'],
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
                        // Header: ({ getToggleAllRowsSelectedProps }) => (
                        //     <Checkbox {...getToggleAllRowsSelectedProps()} />
                        // ),
                        Cell: ({ row }) => (
                            row.subRows.length ? (null) : <Checkbox {...row.getToggleRowSelectedProps()}/>                            
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

    const [isSidebarOpen, setSidebarState] = useState(false)
    const [isModalOpen, setModalState] = useState(false)

    const toggleSidebar = () => {     
        setSidebarState(!isSidebarOpen);           
    }    

    const toggleModal = () => {             
        setModalState(!isModalOpen);
        props.resetEditReagentForm();   
        const data = {
            reagentName: selectedFlatRows[0] ? selectedFlatRows[0].original.reagentName : '', 
            supplier: selectedFlatRows[0] ? selectedFlatRows[0].original.supplier : '', 
            lotNr: selectedFlatRows[0] ? selectedFlatRows[0].original.lotNr : '', 
            catNr: selectedFlatRows[0] ? selectedFlatRows[0].original.catNr : '', 
            expiryDate: selectedFlatRows[0] ? selectedFlatRows[0].original.exppiryDate.substring(0, 10) : '',
            dateReceived: selectedFlatRows[0] ? selectedFlatRows[0].original.dateReceived.substring(0, 10) : '',             
            storageLocation: selectedFlatRows[0] ? selectedFlatRows[0].original.storageLocation : '',
            condition: selectedFlatRows[0] ? selectedFlatRows[0].original.condition : '', 
            comment: selectedFlatRows[0] ? selectedFlatRows[0].original.comment : '',
            action: selectedFlatRows[0] ? selectedFlatRows[0].original.action : ''  
        }
        console.log(selectedFlatRows[0].original.storageLocation);
        props.changeEditReagentForm(data);        
    }

    const deleteRows = () => { 
        selectedFlatRows.forEach(row => {
            // const dataCopy = [...data];
            // dataCopy.splice(row.index, 1);            
            //setData(dataCopy)
            //alert(row.original._id)       
            update = {
                _id = row.original._id,
                status = "DELETED"
            }
            props.putReagent(update);
        });
    }

    const handleSubmit = (values) => {
        var updatedReagent = {
            _id: selectedFlatRows[0].original._id,
            reagentName: values.reagentName,
            lotNr: values.lotNr,
            catNr: values.catNr,
            expiryDate: "2021-08-24T21:11:32Z",
            dateReceived: "2021-02-07T07:11:13Z",
            storageLocation: values.storageLocation,
            condition: values.condition,
            comment: values.comment,
            action: values.action,
            supplier: values.supplier
        }

        const action = "editDetails"
        props.putReagent(updatedReagent, action);

        toggleModal();

    }

    const downloadQR = () => {

        document.getElementById("hidden-qr").style.display = "block";
        //document.getElementById("hidden-qr").style.marginTop = "1500px";

        selectedFlatRows.forEach(row => {
            if (row.original != null) {
                var elemId = String(row.original._id)+"-ext" 
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
        //document.getElementById("hidden-qr").style.marginTop = "0px";
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
                        {selectedFlatRows[0] ? (<span><Button onClick={toggleModal} className="btn-styled">Edit</Button> </span>) : <span><Button className="btn btn-white" disabled>Edit</Button> </span>}
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
                            {/*column.canGroupBy ? (
                                // If the column can be grouped, let's add a toggle
                                <span {...column.getGroupByToggleProps()}>
                                {column.isGrouped ? <span><AiOutlineUngroup/> </span> : <span><AiOutlineGroup/> </span>}
                                </span>                                                                
                            ) : null*/}         
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
                <pre>
                    <code>
                        {/*JSON.stringify({
                            selectedFlatRows: selectedFlatRows.map((row) => row.original),
                        },
                        null,
                        2
                    )*/}
                    </code>
                </pre>
                <div id="hidden-qr">                    
                    {
                        selectedFlatRows.map(row => {
                            if (row.original == null) {
                                return <div></div>
                            } 
                            else {
                                return( 
                                    <div style={{display: "none"}} key={row.original._id} id={String(row.original._id)+"-ext"} className="container">
                                        <div className="row">                                            
                                            <h5><b>LOT Number</b>: {row.original.lotNr} {"\n"}</h5>                                                                                                                                                                                            
                                        </div>               
                                        <div className="row">                                    
                                            <QRCode
                                                id={String(row.original._id)}
                                                value={String(row.original._id)}
                                                size={290}
                                                level={"H"}
                                                includeMargin={false}
                                            />
                                        </div>              
                                        <div className="row">
                                            <p><b>Unique ID</b>: {row.original._id}</p>{' '}    
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
                    postReagent={props.postReagent} />                                                           

                <Modal isOpen={isModalOpen} toggle={toggleModal}>
                    <ModalHeader>
                        <h4>Edit Reagent</h4>
                    </ModalHeader>
                    <ModalBody>
                        <div className="col-12">
                            <Form model="editReagent" onSubmit={(values) => handleSubmit(values)}>
                                <Row className="form-group">
                                    <Col>
                                        <Label forHTML="reagentName">Reagent Name</Label>                        
                                        <Control.text model=".reagentName" id="reagentName" name="reagentName"
                                            placeholder="Reagent Name" 
                                            className="form-control" 
                                            validators={{
                                                required
                                            }} />  
                                        <Errors 
                                            className="text-danger"
                                            model=".supplier"
                                            show="touched"
                                            messages={{
                                                required: 'Required',                                            
                                            }}/>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col>
                                        <Label forHTML="supplier">Supplier</Label>                        
                                        <Control.text model=".supplier" id="supplier" name="supplier"
                                            placeholder="Supplier" 
                                            className="form-control" 
                                            validators={{
                                                required
                                            }} />  
                                        <Errors 
                                            className="text-danger"
                                            model=".supplier"
                                            show="touched"
                                            messages={{
                                                required: 'Required',                                            
                                            }}/>                                                                          
                                    </Col>
                                </Row>
                                <Row className="form-group">                                
                                    <Col>
                                        <Label forHTML="lotNr">Lot Number</Label>                        
                                        <Control.text model=".lotNr" id="lotNr" name="lotNr"
                                            placeholder="Lot Number" 
                                            className="form-control" 
                                            validators={{
                                                required
                                            }} />  
                                        <Errors 
                                            className="text-danger"
                                            model=".lotNr"
                                            show="touched"
                                            messages={{
                                                required: 'Required',                                            
                                            }}/> 
                                    </Col>                                                       
                                    <Col>
                                        <Label forHTML="catNr">Cat Number</Label>                        
                                        <Control.text model=".catNr" id="catNr" name="catNr"
                                            placeholder="Cat Number" 
                                            className="form-control" 
                                            validators={{
                                                required
                                            }} />  
                                        <Errors 
                                            className="text-danger"
                                            model=".catNr"
                                            show="touched"
                                            messages={{
                                                required: 'Required',                                            
                                            }}/>                                        
                                    </Col>                                                       
                                </Row>
                                <Row className="form-group">                                
                                    <Col>
                                        <Label forHTML="expiryDate">Expiry Date</Label>                        
                                        <Control type="date" model=".expiryDate" id="expiryDate" 
                                            name="expiryDate" className="form-control"
                                            validators={{
                                                required
                                            }}/>  
                                        <Errors 
                                            className="text-danger"
                                            model=".expiryDate"
                                            show="touched"
                                            messages={{
                                                required: 'Required',                                            
                                            }}/>                                        
                                    </Col>
                                    <Col>
                                        <Label forHTML="dateReceived">Date Received</Label>                        
                                        <Control type="date" model=".dateReceived" id="dateReceived" name="dateReceived" 
                                            className="form-control"
                                            validators={{
                                                required
                                            }}/>  
                                        <Errors 
                                            className="text-danger"
                                            model=".dateReceived"
                                            show="touched"
                                            messages={{
                                                required: 'Required',                                            
                                            }}/>                                        
                                    </Col>                                                       
                                </Row>
                                <Row className="form-group">
                                    <Col md={6}>    
                                        <Label forHTML="storageLocation">Storage Location</Label>
                                        <Control.select model=".storageLocation" name="storageLocation"                                 
                                            className="form-control"
                                            validators={{
                                                required
                                            }}>
                                            <option>–</option>
                                            <option>Room 1</option>
                                            <option>Room 2</option>
                                            <option>Room 3</option>
                                        </Control.select>
                                        <Errors 
                                            className="text-danger"
                                            model=".storageLocation"
                                            show="touched"
                                            messages={{
                                                required: 'Required',                                            
                                            }}/>                                    
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col md={6}>    
                                        <Label forHTML="condition">Storage Location</Label>
                                        <Control.select model=".condition" name="condition"                                 
                                            className="form-control"
                                            validators={{
                                                required
                                            }}>
                                            <option>–</option>
                                            <option>ACCEPTABLE</option>
                                            <option>INACCEPTABLE</option>
                                        </Control.select>
                                        <Errors 
                                            className="text-danger"
                                            model=".condition"
                                            show="touched"
                                            messages={{
                                                required: 'Required',                                            
                                            }}/>                                    
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col>
                                        <Label forHTML="comment">Supplier</Label>                        
                                        <Control.textarea rows="5" model=".comment" id="comment" name="comment"
                                            placeholder="Comment" 
                                            className="form-control" 
                                            />  
                                    </Col>
                                    <Col>
                                        <Label forHTML="action">Supplier</Label>                        
                                        <Control.textarea rows="5" model=".action" id="action" name="action"
                                            placeholder="Action" 
                                            className="form-control" 
                                            />  
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col md={{size:6}}>
                                        <Button type="submit">
                                            Save Changes
                                        </Button>
                                    </Col>
                                    <Col md={{size:6}}>
                                        <Button onClick={toggleModal}>
                                            Cancel
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </ModalBody>
                </Modal>  
            </div>
        </div>
        </>
    );
}

