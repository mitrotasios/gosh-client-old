import React, { Component } from "react";
import Header from './HeaderComponent';
import Inventory from './InventoryComponent';
import TestHistory from './TestHistoryComponent';
import Assays from './AssaysComponent';   
import Account from './AccountComponent';
import {BrowserRouter as Router, Switch, Route, Redirect, withRouter} from 'react-router-dom';
import Sidebar from "./Sidebar";
import Content from './Content';

class Main extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
            <Sidebar/>
            <Content/>
            <Router>                
                <Switch>
                    <Route path="/home" component={Inventory}/>
                    <Route path="/inventory" component={Inventory}/>
                    <Route path="/testhistory" component={TestHistory}/>
                    <Route path="/assays" component={Assays}/>
                    <Route path="/account" component={Account}/>
                    <Redirect to="/home"/>
                </Switch>                
            </Router>                    
            </div>
        );
    }
}

export default Main;