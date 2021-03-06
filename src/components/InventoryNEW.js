import React, { Component, useEffect, useMemo, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { RiDeleteBin7Fill, RiTimeFill } from 'react-icons/ri'
import { FaLayerGroup } from 'react-icons/fa';
import Sidebar from './Sidebar';
import { HiOutlineSwitchHorizontal } from 'react-icons/hi';
import { PrimaryReagents } from './PrimaryReagentsOverview';
import { PrimaryReagentsRecent } from './PrimaryReagentsRecent';
import { PrimaryReagentsBin } from './PrimaryReagentsBin';
import { SecReagentsOverview } from './SecReagentsOverview';
import { SecReagentsRecent } from './SecReagentsRecent';
import { SecReagentsBin } from './SecReagentsBin';

class InventoryNEW extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPath: ''
        }
    }   

    componentDidMount() {
        const currentPath = window.location.pathname.split('/').splice(2,).join('/');
        this.setState({
            currentPath: currentPath
        });
    }

    renderTable(path) {
        switch(path) {
            case 'primary-reagents/overview':
                return(
                    <PrimaryReagents reagents={this.props.reagents} 
                        reagentsErrMess={this.props.reagentsErrMess}
                        postReagent={this.props.postReagent}
                        deleteReagent={this.props.deleteReagent} 
                        putReagent={this.props.putReagent} />
                );
            case 'primary-reagents/recent':
                return(
                    <PrimaryReagentsRecent reagents={this.props.reagents} 
                        reagentsErrMess={this.props.reagentsErrMess}
                        postReagent={this.props.postReagent}
                        deleteReagent={this.props.deleteReagent} 
                        putReagent={this.props.putReagent} />
                );
            case 'primary-reagents/bin':
                return(
                    <PrimaryReagentsBin reagents={this.props.reagents}
                        deletedReagents={this.props.deletedReagents}
                        fetchReagents={this.props.fetchReagents} 
                        reagentsErrMess={this.props.reagentsErrMess}
                        postReagent={this.props.postReagent}
                        deleteReagent={this.props.deleteReagent} 
                        putReagent={this.props.putReagent} />
                );
            case 'secondary-reagents/overview':
                return(
                    <SecReagentsOverview secReagents={this.props.secReagents} 
                        secReagentsErrMess={this.props.errMess}
                        deleteSecReagent={this.props.deleteSecReagent} 
                        putSecReagent={this.props.putSecReagent} />  
                );
            case 'secondary-reagents/recent':
                return(
                    <SecReagentsRecent secReagents={this.props.secReagents} 
                        secReagentsErrMess={this.props.errMess}
                        deleteSecReagent={this.props.deleteSecReagent} 
                        putSecReagent={this.props.putSecReagent} />  
                );
            
            case 'secondary-reagents/bin':
                return(
                    <SecReagentsBin secReagents={this.props.secReagents} 
                        deletedSecReagents={this.props.deletedSecReagents}
                        secReagentsErrMess={this.props.errMess}
                        deleteSecReagent={this.props.deleteSecReagent} 
                        putSecReagent={this.props.putSecReagent} />  
                );
        }
    }

    render() {
        return(
            <div id="page-wrap" className="container-fluid">                
                <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} logoutUser={this.props.logoutUser} />                        
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
                                                    "background-color": "rgba(47, 73, 209, 0.15)",
                                                    "height": "70px",
                                                    "padding-top":"20px",
                                                    "box-shadow": "0px 0px 5px 0px lightgrey"}} 
                                        className="col text-center section-selection">
                                        <a className="switch" 
                                            href={this.state.currentPath.split('/')[0]=='primary-reagents' ? '/inventory/secondary-reagents/overview' : '/inventory/primary-reagents/overview'}>
                                            <span className="dot" style={{"height": "30px",
                                                                        "border": "0.5px solid rgba(229, 229, 229, 1)",
                                                                        "width": "30px",
                                                                        "background-color": "#ffffff",
                                                                        "border-radius": "50%",
                                                                        "display": "inline-block",
                                                                        "box-shadow": "0px 0px 1px 0px #888888"}}>
                                            <HiOutlineSwitchHorizontal/>
                                        </span></a>
                                        <span style={{"font-weight":"700", "font-size":"large", 
                                            "color": "rgba(237, 139, 0, 0.95)", "padding-left": "10px",
                                            "vertical-align":"middle"}}> 
                                                {this.state.currentPath.split('/')[0]=='primary-reagents' ? 'Primary Reagents' : 'Secondary Reagents'}
                                            </span>
                                        <span style={{"padding-left": "5px"}}> </span>
                                    </div>
                                </div>
                                <div style={{"margin-top":"30px"}} className="row section-choices">
                                    <div className="col" style={{"padding":"0px"}}>
                                        <ul className="list-unstyled">
                                            <li><a type="button"
                                                    href={this.state.currentPath.split('/')[0]=='primary-reagents' ? '/inventory/primary-reagents/overview' : '/inventory/secondary-reagents/overview'}  
                                                    className={this.state.currentPath.split('/')[1]=='overview' ? 'selected' : ''}><span><FaLayerGroup /></span> Overview</a></li>
                                            <li><a type="button" 
                                                    href={this.state.currentPath.split('/')[0]=='primary-reagents' ? '/inventory/primary-reagents/recent' : '/inventory/secondary-reagents/recent'} 
                                                    className={this.state.currentPath.split('/')[1]=='recent' ? 'selected' : ''}><span><RiTimeFill /></span> Last Used</a></li>
                                            <li><a type="button" 
                                                    href={this.state.currentPath.split('/')[0]=='primary-reagents' ? '/inventory/primary-reagents/bin' : '/inventory/secondary-reagents/bin'} 
                                                    className={this.state.currentPath.split('/')[1]=='bin' ? 'selected' : ''}><span><RiDeleteBin7Fill /></span> Bin</a></li>
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
                        {this.renderTable(this.state.currentPath)}                                                                 
                    </div>
                </div>
            </div>
        );
    }
}

export default InventoryNEW;