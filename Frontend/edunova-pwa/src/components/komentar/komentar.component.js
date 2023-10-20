import React, { Component } from "react";
import KomentarDataService from "../../services/komentar.service";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { FaEdit } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import { Modal } from 'react-bootstrap';


export default class Komentar extends Component {
  constructor(props) {
    super(props);
    this.dohvatiKomentar = this.dohvatiKomentar.bind(this);

    this.state = {
      komentar: [],
      prikaziModal: false
    };
  }



  otvoriModal = () => this.setState({ prikaziModal: true });
  zatvoriModal = () => this.setState({ prikaziModal: false });

  componentDidMount() {
    this.dohvatiKomentar();
  }
  dohvatiKomentar() {
    KomentarDataService.getAll()
      .then(response => {
        this.setState({
          komentar: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  async obrisiKomentar(sifra){
    
    const odgovor = await KomentarDataService.delete(sifra);
    if(odgovor.ok){
     this.dohvatiKomentar();
    }else{
     // alert(odgovor.poruka);
      this.otvoriModal();
    }
    
   }

  render() {
    const { komentar} = this.state;
    return (

    <Container>
      <a href="/komentar/dodaj" className="btn btn-success gumb">Dodaj novi komentar</a>
    <Row>
      { komentar && komentar.map((p) => (
           
           <Col key={p.sifra} sm={12} lg={3} md={3}>

              <Card style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title>{p.sadrzaj}</Card.Title>      
                  <Card.Text>
                    {p.slika}
                  </Card.Text>            
                  <Row>
                      
                      <Col>
                      <Button variant="danger" className="gumb"  onClick={() => this.obrisiKomentar(p.sifra)}><FaTrash /></Button>
                      </Col>
                    </Row>
                </Card.Body>
              </Card>
            </Col>
          ))
      }
      </Row>


     

    </Container>


    );
    
        }
}
