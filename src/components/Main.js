import React, { Component } from 'react';
import Assays from './Assays'
import AccountDetails from './AccountDetails'
import Sidebar from './Sidebar.js';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import { TestHistory } from './TestHistory';
import { Inventory } from './Inventory';
import { connect } from 'react-redux';
import { postReagents, fetchReagents, fetchTests} from '../redux/ActionCreators'
import { actions } from 'react-redux-form';


const mapStateToProps = state => {
    return {
        reagents: state.reagents,
        tests: state.tests        
    }     
}

const mapDispatchToProps = (dispatch) => ({    
    postReagents: (
        reagent_name,
        supplier,
        lot_number,
        cat_number,
        expiry_date,
        date_received,
        condition,
        storage_location,
        comment) => dispatch(postReagents(reagent_name, supplier, lot_number, cat_number, expiry_date, date_received, condition, storage_location, comment)),    
    fetchReagents: () => {dispatch(fetchReagents())},
    fetchTests: () => {dispatch(fetchTests())},
    resetFeedbackForm: () => {dispatch(actions.reset('feedback'))}
});

class Main extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchReagents();
        this.props.fetchTests();
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));