import React, { Component } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import logo from '../logo.svg';


export default class Izbornik extends Component{


    render(){
        return (

            <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
              <Navbar.Brand href="/"> <img className="App-logo" src={logo} alt="" /> Edunova App</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="/nadzornaploca">Nadzorna ploča</Nav.Link>
                  <NavDropdown title="Programi" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/smjerovi">Smjerovi</NavDropdown.Item>
                    <NavDropdown.Item href="/polaznici">
                      Polaznici
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/grupe">Grupe</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item target="_blank" href="/swagger/index.html">
                      Swagger
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>



        );
    }
}