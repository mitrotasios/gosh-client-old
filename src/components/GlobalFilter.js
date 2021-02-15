import React from 'react';
import { FaSearch } from 'react-icons/fa'
import { Button, Form, FormGroup, Label, Input, Col} from 'reactstrap';

export const GlobalFilter = ({ filter, setFilter }) => {
    return(
        <Form>
            <FormGroup row>
                <Label sm={1} for="searchBar"><FaSearch/></Label>
                <Col sm={10}>
                    <Input value={filter || ''} onChange={e => setFilter(e.target.value)} id="searchBar" type="search" name="search" placeholder="search anything..."/>
                </Col>
            </FormGroup>
        </Form>        
    )
}