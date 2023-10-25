import React, { Component } from "react";
import SlikaDataService from "../services/slika.service";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { FaEdit } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import moment from 'moment';
import { Modal } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';




export default class Slike extends Component {
  constructor(props) {
    super(props);
    this.dohvatiSlike = this.dohvatiSlike.bind(this);

    this.state = {
      slike: [],
      prikaziModal: false
    };
  }

  otvoriModal = () => this.setState({ prikaziModal: true });
  zatvoriModal = () => this.setState({ prikaziModal: false });


  componentDidMount() {
    this.dohvatiSlike();
  }
  dohvatiSlike() {
    SlikaDataService.getAll()
      .then(response => {
        this.setState({
          slike: response.data
        });
        console.log(response);
      })
      .catch(e => {
        console.log(e);
      });
  }

  async obrisiSlika(sifra){
    
    const odgovor = await SlikaDataService.delete(sifra);
    if(odgovor.ok){
     this.dohvatiSlike();
    }else{
     this.otvoriModal();
    }
    
   }

  render() {
    const { slike} = this.state;
    return (

    <Container>
     

     <Row>
      { slike && slike.map((p) => (
           
           <Col key={p.sifra} sm={12} lg={4} md={4}>

              <Card style={{ width: '25rem' }}>
              <Card.Img variant="top" src={p.slika} />
                <Card.Body>
                  <Card.Title>{p.naslov} </Card.Title>
                  <Card.Text>
                    {p.album}
                  </Card.Text>
                  <Card.Text>Lokacija:&nbsp;
                    {p.lokacija}
                  </Card.Text>
                 
                </Card.Body>
              </Card>
            </Col>
          ))
      }
      </Row>    

             <Modal show={this.state.prikaziModal} onHide={this.zatvoriModal}>
              <Modal.Header closeButton>
                <Modal.Title>Greška prilikom brisanja</Modal.Title>
              </Modal.Header>
              <Modal.Body>Slika ima tagove.</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.zatvoriModal}>
                  Zatvori
                </Button>
              </Modal.Footer>
            </Modal>

    </Container>


    );
    
        }
}


