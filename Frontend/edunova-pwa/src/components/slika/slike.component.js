import React, { Component } from "react";
import SlikaDataService from "../../services/slika.service";
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
      <a href="/slike/dodaj" className="btn btn-success gumb">Dodaj novu sliku</a>
      <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Naslov</th>
                  <th>Datum</th>
                  <th>Album</th>
                  <th>Lokacija</th>
                  <th>Tag</th>
                </tr>
              </thead>
              <tbody>
              {slike && slike.map((slika,index) => (
                
                <tr key={index}>
                  <td> 
                  <td>{slika.naslov}</td>
                  <td>{slika.datum}</td>
                  <td>{slika.album}</td>
                  <td>{slika.lokacija}</td>
                  <td>{slika.tag}</td>
                    
                  </td>
                  <td>
                    <Row>
                      <Col>
                        <Link className="btn btn-primary gumb" to={`/slike/${slika.sifra}`}><FaEdit /></Link>
                      </Col>
                      <Col>
                        { 
                             <Button variant="danger"  className="gumb" onClick={() => this.obrisiSlika(slika.sifra)}><FaTrash /></Button>
                        }
                      </Col>
                    </Row>
                    
                  </td>
                </tr>
                ))
              }
              </tbody>
            </Table>     

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


