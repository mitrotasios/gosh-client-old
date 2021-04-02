import React, { Component, useEffect, useMemo, useState } from 'react';
import { useTable, useSortBy, useGlobalFilter, useRowSelect, useExpanded, useGroupBy } from 'react-table';
import { COLUMNS } from './ColumnsInventory'
import './table.css';
import { GlobalFilter } from './GlobalFilter';
import AddReagent from './AddReagent';
import { Button }  from "react-bootstrap";
import { Checkbox } from './CheckBox';
import {AiFillCaretDown, AiFillCaretUp, AiOutlineRight, AiOutlineDown, AiOutlineUp} from 'react-icons/ai';
import { RiBubbleChartFill, RiDeleteBin7Fill, RiTimeFill } from 'react-icons/ri'
import { FaLayerGroup } from 'react-icons/fa'
import { HiOutlineSwitchHorizontal } from 'react-icons/hi'
import QRCode  from 'qrcode.react';
import html2canvas from 'html2canvas';
import EditReagent from './EditReagent';
import Sidebar from './Sidebar';
import { PrimaryReagents } from './PrimaryReagentsOverview';

class InventoryNEW extends Component {
    constructor(props) {
        super(props);
    }   

    render() {
        return(
            <div id="page-wrap" className="container-fluid">                
                <div className="row flex-fill h-100 d-flex">
                    <div style={{"position":"fixed"}} className="col-2">
                        <div style={{"border-bottom":"1px solid #E2E2E4", "background-color": "white", "margin-top": "0px", "padding": "10px"}} className="row header">
                            <div className="col ml-5">
                                <span className="menu-header"> Inventory </span>
                            </div>
                        </div>
                        <div style={{"border-right":"1px solid #E2E2E4"}} className="row side-info">
                            <div style={{"margin-top":"15px"}} className="container-fluid side-info-container">
                                <div className="row">
                                    <div style={{"margin-right":"15px", 
                                                    "border-radius": "7px",
                                                    "background-color": "rgba(47, 73, 209, 0.09)",
                                                    "height": "70px",
                                                    "padding-top":"20px"}} 
                                        className="col text-center section-selection">
                                        <a className="switch" href="/account"><span className="dot" style={{"height": "30px",
                                                                        "border": "0.5px solid rgba(229, 229, 229, 1)",
                                                                        "width": "30px",
                                                                        "background-color": "#ffffff",
                                                                        "border-radius": "50%",
                                                                        "display": "inline-block",
                                                                        "box-shadow": "0px 0px 1px 0px #888888"}}>
                                            <HiOutlineSwitchHorizontal/>
                                        </span></a>
                                        <span style={{"font-weight":"500", "font-size":"large", 
                                            "color": "rgba(237, 139, 0)", "padding-left": "15px",
                                            "vertical-align":"middle"}}>Primary Reagents </span>
                                        <span style={{"padding-left": "5px"}}> </span>
                                    </div>
                                </div>
                                <div style={{"margin-top":"30px"}} className="row section-choices">
                                    <div className="col" style={{"padding":"0px"}}>
                                        <ul className="list-unstyled">
                                            <li><a href="/" type="button"><span><FaLayerGroup /></span> Overview</a></li>
                                            <li><a href="/" type="button"><span><RiTimeFill /></span> Last Used</a></li>
                                            <li><a href="/" type="button"><span><RiDeleteBin7Fill /></span> Bin</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div style={{"position":"fixed", "bottom": "0px"}} className="row">
                                    <div style={{"height": "80px", "margin-right":"15px", "border-top":"1px solid rgba(229, 229, 229, 1)", "padding-top":"13px"}} 
                                        className="col text-center">
                                            <div className="row">
                                                <div className="col-3">
                                                    <a className="account-icon" href="/account"><span className="dot" style={{"height": "50px",
                                                                            "width": "50px",
                                                                            "border": "0.5px solid rgba(229, 229, 229, 1)",
                                                                            "background-color": "#ffffff",
                                                                            "border-radius": "50%",
                                                                            "display": "inline-block",
                                                                            "box-shadow": "0px 0px 1px 0px #888888",
                                                                            "padding":"12px",
                                                                            "margin-right":"10px",
                                                                            "color":"#432F87",
                                                                            "font-weight":"600"
                                                                            }}>
                                                        AM
                                                    </span></a>
                                                </div>
                                                <div style={{"margin-left":"10px"}} className="col">
                                                    <div className="row">
                                                        <a style={{"color":"black"}} href="/account"><span style={{"display":"block"}}>Achilleas Mitrotasios</span></a>
                                                    </div>
                                                    <div style={{"color":"gray"}} className="row">
                                                        Lab Staff
                                                    </div>
                                                </div>
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-10 offset-2">
                        <PrimaryReagents reagents={this.props.reagents} 
                            reagentsErrMess={this.props.reagentsErrMess}
                            postReagent={this.props.postReagent}
                            deleteReagent={this.props.deleteReagent} 
                            putReagent={this.props.putReagent} />                                                                  
                    </div>
                </div>
            </div>
        );
    }
}

export default InventoryNEW;