import React, { Component } from 'react';

class AccountDetails extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <>
            <div id="page-wrap" className="container">
                <div className="row">
                <div className="col">
                    <h1>Account Details</h1>
                    <h2>Check out our offerings in the sidebar!</h2>
                </div>
                <div className="col">
                    <h1>Cool Restaurant</h1>
                    <h2>Check out our offerings in the sidebar!</h2>
                </div>
                </div>                
            </div>
            <div id="page-wrap" className="container-fluid">
                <div className="row">
                <div className="col">
                    <h1>Cool Restaurant</h1>
                    <h2>Check out our offerings in the sidebar!</h2>
                </div>
                <div className="col">
                    <h1>Cool Restaurant</h1>
                    <h2>Check out our offerings in the sidebar!</h2>
                </div>
                </div>                
            </div>
            </>
        );
    }
}

export default AccountDetails;