import React, { Component } from "react";
import TagDataService from "../../services/tag.service";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { FaEdit } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import { Modal } from 'react-bootstrap';


export default class Tags extends Component {
  constructor(props) {
    super(props);
    this.dohvatiTags = this.dohvatiTags.bind(this);

    this.state = {
      tags: [],
      prikaziModal: false
    };
  }



  otvoriModal = () => this.setState({ prikaziModal: true });
  zatvoriModal = () => this.setState({ prikaziModal: false });

  componentDidMount() {
    this.dohvatiTags();
  }
  dohvatiTags() {
    TagDataService.getAll()
      .then(response => {
        this.setState({
          tags: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  async obrisiTag(sifra){
    
    const odgovor = await TagDataService.delete(sifra);
    if(odgovor.ok){
     this.dohvatiTags();
    }else{
     // alert(odgovor.poruka);
      this.otvoriModal();
    }
    
   }

  render() {
    const { tags} = this.state;
    return (

    <Container>
      <a href="/tags/dodaj" className="btn btn-success gumb">Dodaj novi tag</a>
    <Row>
      { tags && tags.map((p) => (
           
           <Col key={p.sifra} sm={12} lg={3} md={3}>

              <Card style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title>{p.naziv}</Card.Title>                  
                  <Row>
                      <Col>
                      <Link className="btn btn-primary gumb" to={`/tags/${p.sifra}`}><FaEdit /></Link>
                      </Col>
                      <Col>
                      <Button variant="danger" className="gumb"  onClick={() => this.obrisiTag(p.sifra)}><FaTrash /></Button>
                      </Col>
                    </Row>
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
              <Modal.Body>Tag se nalazi na jednoj ili više slika i ne može se obrisati.</Modal.Body>
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
