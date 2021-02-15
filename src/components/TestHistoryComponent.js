import React, { Component } from "react";
import { Jumbotron, Container } from 'reactstrap';

const TestJumbotron = (props) => {
    return(
        <Jumbotron fluid>
            <Container fluid>
            </Container>
        </Jumbotron>
    );
}

class TestHistory extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <TestJumbotron/>
        );
    }

}

export default TestHistory;