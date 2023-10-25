import React, { Component } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../logo.png';


export default class Izbornik extends Component{


    render(){
      const token = localStorage.getItem('Bearer');
    //console.log(token);
    const autoriziran =  token!==null && token!=='';

  //  console.log(autoriziran);
        return (

            <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
              <Navbar.Brand href="/"> <img className="App-logo" src={logo} alt="" /> Galerija App</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              { autoriziran && 
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">  
                <Nav.Link href="/pocetna">Pocetna</Nav.Link>                      
                  <Nav.Link href="/albumip">Albumi</Nav.Link>                            
                  
                  <NavDropdown title="Dodaj" id="basic-nav-dropdown">
                  <Nav.Link href="/albumi">Albumi</Nav.Link>  
                  <Nav.Link href="/slike">Slike</Nav.Link>
                  <Nav.Link href="/komentar">Komentari</Nav.Link>                  
                  <Nav.Link href="/lokacija">Lokacija</Nav.Link>
                  <Nav.Link href="/tags">Tagovi</Nav.Link>  
                            
       
                          
            </NavDropdown>  
            <Nav.Link href="/odjava">Odjava</Nav.Link>
            <Nav.Link href="/swagger/index.html">Swagger</Nav.Link>  
             
            
                </Nav>
              </Navbar.Collapse>
            }

{ !autoriziran && 
<Nav.Link href="/login">Prijava</Nav.Link>
 }
            </Container>
          </Navbar>



        );
    }
}