import React, { Component } from 'react';
import TestHistory from './TestHistory'
import Assays from './Assays'
import AccountDetails from './AccountDetails'
import Sidebar from './Sidebar.js';
import { Inventory } from './FilteringTable'
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import { TableTest } from './SimpleGroupTable';
import { AdvTable } from './GroupTableAdv';

class Main extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div id="outer-container">
                <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
                <Switch>
                    <Route path="/inventory" component={AdvTable}/>
                    <Route exact path="/testhistory" component={TestHistory}/>
                    <Route exact path="/assays" component={Assays}/>
                    <Route exact path="/account" component={AccountDetails}/> 
                    <Redirect to="/inventory"/>
                </Switch>
            </div>
            
        );
    }
}

export default Main;