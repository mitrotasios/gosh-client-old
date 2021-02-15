import React, { Component } from 'react';
import Inventory from './Inventory'
import TestHistory from './TestHistory'
import Assays from './Assays'
import AccountDetails from './AccountDetails'
import Sidebar from './Sidebar.js';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';

class Main extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div id="outer-container">
                <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
                <Switch>
                    <Route path="/inventory" component={Inventory}/>
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