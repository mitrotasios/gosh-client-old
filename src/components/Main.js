import React, { Component } from 'react';
import Assays from './Assays'
import AccountDetails from './AccountDetails'
import Sidebar from './Sidebar.js';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { TestHistory } from './TestHistory';
import TestHistoryNEW from './TestHistoryNEW';
import { Inventory } from './Inventory';
import InventoryNEW from './InventoryNEW';
import InvSecReagentsOverview from './InvSecReagentsOverview';
import { connect } from 'react-redux';
import { putReagent, deleteReagent, postReagent, fetchReagents, fetchDeletedReagents,
    fetchSecReagents, fetchDeletedSecReagents, putSecReagent, deleteSecReagent, 
    deleteTest, fetchTests, fetchTestTypes,
    postTestType} from '../redux/ActionCreators.js'


const mapStateToProps = state => {
    return {
        reagents: state.reagents,
        deletedReagents: state.deleteReagents,
        secReagents: state.secReagents,
        deletedSecReagents: state.deletedSecReagents,
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
    fetchDeletedReagents: () => {dispatch(fetchDeletedReagents())},
    fetchSecReagents: () => {dispatch(fetchSecReagents())},
    fetchDeletedSecReagents: () => {dispatch(fetchDeletedSecReagents())},
    putSecReagent: (secReagent) => {dispatch(putSecReagent(secReagent))},
    deleteSecReagent: (secReagent_id) => {dispatch(deleteSecReagent(secReagent_id))},
    fetchTests: () => {dispatch(fetchTests())},
    deleteTest: (test_id) => {dispatch(deleteTest(test_id))},
    fetchTestTypes: () => {dispatch(fetchTestTypes())},
    postTestType: (newTestType) => {dispatch(postTestType(newTestType))}   
});

class Main extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchReagents();
        this.props.fetchDeletedReagents();
        this.props.fetchSecReagents();
        this.props.fetchDeletedSecReagents();
        this.props.fetchTests();
        this.props.fetchTestTypes();
    }

    render() {
        const InventoryPage = () => {
            return(
                <InventoryNEW 
                    // Primary Reagents
                    reagents={this.props.reagents.reagents}
                    deletedReagents={this.props.reagents.deletedReagents}
                    fetchReagents={this.props.fetchReagents} 
                    reagentsErrMess={this.props.reagents.errMess}
                    postReagent={this.props.postReagent}
                    deleteReagent={this.props.deleteReagent} 
                    putReagent={this.props.putReagent}
                    // Secondary Reagents
                    secReagents={this.props.secReagents.secReagents} 
                    deletedSecReagents={this.props.secReagents.deletedSecReagents}
                    fetchSecReagents={this.props.fetchSecReagents}
                    secReagentsErrMess={this.props.secReagents.errMess}
                    deleteSecReagent={this.props.deleteSecReagent} 
                    putSecReagent={this.props.putSecReagent}
                    />
            );
        }

        const InvSecReagentsOverviewPage = () => {
            return(
                <InvSecReagentsOverview secReagents={this.props.secReagents.secReagents} 
                    secReagentsErrMess={this.props.secReagents.errMess}
                    deleteSecReagent={this.props.deleteSecReagent} 
                    putSecReagent={this.props.putSecReagent}
                    />
            );
        }

        const TestHistoryPage = () => {
            return(
                <TestHistoryNEW tests={this.props.tests.tests} 
                    testsErrMess={this.props.tests.errMess} 
                    //switchTests={this.props.switchTests}
                    fetchTests={this.props.fetchTests}
                    deleteTest={this.props.deleteTest} />
            );
        }

        const AssayPage = () => {
            return(
                <Assays testTypes={this.props.testTypes.testTypes} 
                    testTypesErrMess={this.props.testTypes.errMess} 
                    postTestType={this.props.postTestType}/>
            );
        }

        return(
                <>
                <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />                        
                <Switch>
                    {/*<Route path="/inventory" component={InventoryPage}/>*/}
                    <Route path="/inventory/primary-reagents/overview" component={InventoryPage}/>
                    <Route path="/inventory/primary-reagents/recent" component={InventoryPage}/>
                    <Route path="/inventory/primary-reagents/bin" component={InventoryPage}/>
                    <Route path="/inventory/secondary-reagents/overview" component={InventoryPage}/>
                    <Route path="/inventory/secondary-reagents/recent" component={InventoryPage}/>
                    <Route path="/inventory/secondary-reagents/bin" component={InventoryPage}/>
                    <Route exact path="/testhistory/all-tests/overview" component={TestHistoryPage}/>
                    <Route exact path="/assays" component={AssayPage}/>
                    <Route exact path="/account" component={AccountDetails}/> 
                    <Route exact path="/account" component={AccountDetails}/> 
                    <Redirect to="/inventory/primary-reagents/overview"/>
                </Switch>
                </>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));