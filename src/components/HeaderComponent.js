import React, { Component } from 'react';
import { Jumbotron, Navbar, Nav, NavbarToggler, Collapse, NavItem, NavbarBrand, 
    Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import logo from '../logo.svg';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isNavOpen: false
        }
    }

    toggleNav = () => {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    render() {
        return(
            <React.Fragment>
                <Navbar color="light" light expand="md">
                    <div className="container-fluid">
                        <NavbarToggler id="navbar-toggler" className="mr-2" onClick={this.toggleNav} />
                        <NavbarBrand className="mr-auto" href="/">
                            <img src={logo} height="60" width="60" alt="GOSH Drive"/>
                        </NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar className="ml-4">
                                <NavItem>
                                    <NavLink className="nav-link" to="/inventory">
                                        <span>Inventory</span>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/testhistory">
                                        <span>Test History</span>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/assays">
                                        <span>Assays</span>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/account">
                                        <span>Account</span>
                                    </NavLink>
                                </NavItem>
                            </Nav>                            
                        </Collapse>
                    </div>
                </Navbar>
            </React.Fragment>
        );
    }
}

export default Header;

