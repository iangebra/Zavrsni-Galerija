import React, { Component } from "react";
import LokacijaDataService from "../../services/lokacija.service";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";




export default class dodajLokaciju extends Component {

  constructor(props) {
    super(props);
    this.dodajLokaciju = this.dodajLokaciju.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async dodajLokaciju(lokacija) {
    const odgovor = await LokacijaDataService.post(lokacija);
    if(odgovor.ok){
      // routing na smjerovi
      window.location.href='/lokacija';
    }else{
      // pokaži grešku
     // console.log(odgovor.poruka.errors);
      let poruke = '';
      for (const key in odgovor.poruka.errors) {
        if (odgovor.poruka.errors.hasOwnProperty(key)) {
          poruke += `${odgovor.poruka.errors[key]}` + '\n';
         // console.log(`${key}: ${odgovor.poruka.errors[key]}`);
        }
      }

      alert(poruke);
    }
  }



  handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    const podaci = new FormData(e.target);
    //Object.keys(formData).forEach(fieldName => {
    // console.log(fieldName, formData[fieldName]);
    //})
    
    //console.log(podaci.get('verificiran'));
    // You can pass formData as a service body directly:

    
    this.dodajLokaciju({
      naziv: podaci.get('naziv'),
      koordinate: podaci.get('koordinate'),
         });
    
  }


  render() { 
    return (
    <Container>
        <Form onSubmit={this.handleSubmit}>


          <Form.Group className="mb-3" controlId="naziv">
            <Form.Label>Naziv</Form.Label>
            <Form.Control type="text" name="naziv" placeholder="Naziv lokacije" maxLength={255} required/>
          </Form.Group>


          <Form.Group className="mb-3" controlId="koordinate">
            <Form.Label>Koordinate</Form.Label>
            <Form.Control type="text" name="koordinate" placeholder="Koordinate lokacije" />
          </Form.Group>


          
          <Row> 
            <Col>
              <Link className="btn btn-danger gumb" to={`/lokacija`}>Odustani</Link>
            </Col>
            <Col>
            <Button variant="primary" className="gumb" type="submit">
              Dodaj lokaciju
            </Button>
            </Col>
          </Row>
         
          
        </Form>


      
    </Container>
    );
  }
}

