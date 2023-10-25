import React, { Component } from "react";
import TagDataService from "../../services/tag.service";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";


export default class DodajTag extends Component {

  constructor(props) {
    super(props);
    const token = localStorage.getItem('Bearer');
    if(token==null || token===''){
      window.location.href='/';
    }
    this.dodajTag = this.dodajTag.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async dodajTag(slika) {
    const odgovor = await TagDataService.post(slika);
    if(odgovor.ok){
      // routing na tagove
      window.location.href='/tags';
    }else{
      // pokaži grešku
      console.log(odgovor);
    }
  }



  handleSubmit(e) {
    e.preventDefault();
    const podaci = new FormData(e.target);

    this.dodajTag({
      naziv: podaci.get('naziv'),
      
    });
    
  }


  render() { 
    return (
    <Container>
        <Form onSubmit={this.handleSubmit}>


          <Form.Group className="mb-3" controlId="naziv">
            <Form.Label>Naziv</Form.Label>
            <Form.Control type="text" name="naziv" placeholder="naziv" maxLength={255} required/>
          </Form.Group>

          <Row>
            <Col>
              <Link className="btn btn-danger gumb" to={`/tags`}>Odustani</Link>
            </Col>
            <Col>
            <Button variant="primary" className="gumb" type="submit">
              Dodaj tag
            </Button>
            </Col>
          </Row>
         
          
        </Form>


      
    </Container>
    );
  }
}

