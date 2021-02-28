import React, { Component } from 'react';
import Assays from './Assays'
import AccountDetails from './AccountDetails'
import Sidebar from './Sidebar.js';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import { TestHistory } from './TestHistory';
import { Inventory } from './Inventory';
import {connect} from 'react-redux';
//import {addComment, dishesLoading, fetchDishes} from '../redux/ActionCreators'
import {actions} from 'react-redux-form';


// const mapStateToProps = state => {
//     return {
//         dishes: state.dishes,
//         comments: state.comments,
//         promotions: state.promotions,
//         leaders: state.leaders
//     }     
// }

// const mapDispatchToProps = (dispatch) => ({    
//     addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
//     fetchDishes: () => {dispatch(fetchDishes())},
//     resetFeedbackForm: () => {dispatch(actions.reset('feedback'))}
//});

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