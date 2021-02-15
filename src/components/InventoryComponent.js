import React, { Component } from "react";
import { Jumbotron, Container, Button, Row } from 'reactstrap';
import AddReagent from './AddReagentComponent';

class InventoryJumbotron extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        return(
            <Jumbotron fluid>
                <Container fluid>
                    <div className="row">
                        <div className="col-12 mr-2">
                            <Button className="add-button float-right mr-2" color="primary"
                                onClick={this.props.onSidebarToggle}>Add</Button>
                        </div>
                    </div>                                
                </Container>
            </Jumbotron>
        );
    }
}


class Inventory extends Component {
    constructor(props) {
        super(props);        

        this.state = {
            isSidebarOpen: false
        }
        
        this.toggleSidebar = this.toggleSidebar.bind(this);
    }

    toggleSidebar() {
        this.setState({isSidebarOpen: !this.state.isSidebarOpen})
    }

    render() {
        return(
            <div className="container-fluid">
                <InventoryJumbotron onSidebarToggle={this.toggleSidebar}/>
                <AddReagent isSidebarOpen={this.state.isSidebarOpen} onSidebarToggle={this.toggleSidebar}/>
            </div>            
        );
    }

}

export default Inventory;

