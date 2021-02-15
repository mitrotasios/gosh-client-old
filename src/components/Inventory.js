import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Col} from 'reactstrap';
import {FaSearch} from 'react-icons/fa'
import AddReagent from './AddReagent';

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

    render() {
        return(
            <>
            <div id="page-wrap" className="container-fluid">
                <div className="container">
                    <div className="row text-center">
                        <div className="ml-auto">
                            <Form>
                                <FormGroup row>
                                    <Label sm={1} for="searchBar"><FaSearch/></Label>
                                    <Col sm={10}>
                                        <Input id="searchBar" type="search" name="search" placeholder="search anything..."/>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </div>                 
                        <div className="ml-auto">
                            <Button className="btn-styled">Select</Button>{'  '}                        
                            <Button className="btn-styled" 
                                onClick={this.toggleSidebar}>Add New</Button>
                        </div>   
                    </div>                
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col ml-2">
                            <h1>Inventory</h1>
                            <AddReagent isSidebarOpen={this.state.isSidebarOpen} onSidebarToggle={this.toggleSidebar}/>                        
                        </div>
                    </div>                
                </div>
            </div>
            </>
        );
    }
}

export default Inventory;