import React, { Component } from 'react';
import Assays from './Assays'
import AccountDetails from './AccountDetails'
import Sidebar from './Sidebar.js';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import { TestHistory } from './TestHistory';
import { Inventory } from './Inventory';
import { connect } from 'react-redux';
import { putReagent, deleteReagent, postReagent, fetchReagents, deleteTest, fetchTests, /*switchTests,*/ fetchTestTypes} from '../redux/ActionCreators.js'


const mapStateToProps = state => {
    return {
        reagents: state.reagents,
        tests: state.tests,
        testTypes: state.testTypes,
    }     
}

const mapDispatchToProps = (dispatch) => ({    
    putReagent: (reagent) => {dispatch(putReagent(reagent))},
    deleteReagent: (reagent_id) => {dispatch(deleteReagent(reagent_id))},
    postReagent: (
        unit,
        reagentName,
        supplier,
        lotNr,
        catNr,
        expiryDate,
        dateReceived,
        storageLocation
        ) => dispatch(postReagent(unit, reagentName, supplier, lotNr, catNr, expiryDate, dateReceived, storageLocation)),    
    fetchReagents: () => {dispatch(fetchReagents())},
    fetchTests: () => {dispatch(fetchTests())},
    //switchTests: (tests) => {dispatch(switchTests(tests))},
    deleteTest: (test_id) => {dispatch(deleteTest(test_id))},
    fetchTestTypes: () => {dispatch(fetchTestTypes())},   
});

class Main extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchReagents();
        this.props.fetchTests();
        this.props.fetchTestTypes();
    }

    render() {
        const InventoryPage = () => {
            return(
                <Inventory reagents={this.props.reagents.reagents} 
                    reagentsErrMess={this.props.reagents.errMess}
                    postReagent={this.props.postReagent}
                    deleteReagent={this.props.deleteReagent} 
                    putReagent={this.props.putReagent}
                    />
            );
        }

        const TestHistoryPage = () => {
            return(
                <TestHistory tests={this.props.tests.tests} 
                    testsErrMess={this.props.tests.errMess} 
                    //switchTests={this.props.switchTests}
                    fetchTests={this.props.fetchTests}
                    deleteTest={this.props.deleteTest} />
            );
        }

        const AssayPage = () => {
            return(
                <Assays testTypes={this.props.testTypes.testTypes} 
                    testTypesErrMess={this.props.testTypes.errMess} />
            );
        }

        return(
            <div id="outer-container">
                <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
                <Switch>
                    <Route path="/inventory" component={InventoryPage}/>
                    <Route exact path="/testhistory" component={TestHistoryPage}/>
                    <Route exact path="/assays" component={AssayPage}/>
                    <Route exact path="/account" component={AccountDetails}/> 
                    <Redirect to="/inventory"/>
                </Switch>
            </div>
            
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));