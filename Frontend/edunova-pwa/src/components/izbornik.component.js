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
              <Navbar.Brand href="/"> <img className="App-logo" src={logo} alt="" /> Galerija App</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="/nadzornaploca">Nadzorna ploča</Nav.Link>
                  <NavDropdown title="Padajuci" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/slike">
                      Slike
                    </NavDropdown.Item>                    
                    <NavDropdown.Item href="/albumi">Albumi</NavDropdown.Item>
                    <NavDropdown.Item href="/tags">
                      Tagovi
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/lokacija">
                      Lokacije
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/komentar">
                      Komentari
                    </NavDropdown.Item>
                   
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