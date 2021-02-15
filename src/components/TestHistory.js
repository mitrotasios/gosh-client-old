import React, { Component } from 'react';
import { Button, ButtonGroup, Form, FormGroup, Label, Input, Col} from 'reactstrap';
import {FaSearch} from 'react-icons/fa'

class TestHistory extends Component {
    constructor(props) {
        super(props);
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
                            <ButtonGroup>
                                <Button active>My Tests</Button>
                                <Button>All Tests</Button>
                            </ButtonGroup>
                        </div>   
                    </div>                
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col ml-2">
                            <h1>Test History</h1>                        
                        </div>
                    </div>                
                </div>
            </div>
            </>
        );
    }
}

export default TestHistory;