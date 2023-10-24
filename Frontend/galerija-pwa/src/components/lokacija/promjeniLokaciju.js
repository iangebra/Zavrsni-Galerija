import React, { Component } from "react";
import LokacijaDataService from "../../services/lokacija.service";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";



export default class promjeniLokaciju extends Component {

  constructor(props) {
    super(props);

   
    this.lokacija = this.dohvatiLokacija();
    this.promjeniLokaciju = this.promjeniLokaciju.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    

    this.state = {
      lokacija: {}
    };

  }



  async dohvatiLokacija() {
    let href = window.location.href;
    let niz = href.split('/'); 
    await LokacijaDataService.getBySifra(niz[niz.length-1])
      .then(response => {
        this.setState({
          lokacija: response.data
        });
       // console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    
   
  }

  async promjeniLokaciju(lokacija) {
   
    let href = window.location.href;
    let niz = href.split('/'); 
    const odgovor = await LokacijaDataService.put(niz[niz.length-1],lokacija);
    if(odgovor.ok){
      
      window.location.href='/lokacija';
    }else{
      // pokaži grešku
      console.log(odgovor);
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

    this.promjeniLokaciju({
      naziv: podaci.get('naziv'),      
      koordinate: podaci.get('koordinate')
     
    });
    
  }


  render() {
    
   const { lokacija} = this.state;


    return (
    <Container>
        <Form onSubmit={this.handleSubmit}>


          <Form.Group className="mb-3" controlId="naziv">
            <Form.Label>Naziv</Form.Label>
            <Form.Control type="text" name="naziv" placeholder="Naziv lokacije"
            maxLength={255} defaultValue={lokacija.naziv} required />
          </Form.Group>


          <Form.Group className="mb-3" controlId="koordinate">
            <Form.Label>Koordinate</Form.Label>
            <Form.Control type="text" name="koordinate" defaultValue={lokacija.koordinate}  placeholder="koordinate lokacije" />
          </Form.Group>                
         
          <Row>
            <Col>
              <Link className="btn btn-danger gumb" to={`/lokacija`}>Odustani</Link>
            </Col>
            <Col>
            <Button variant="primary" className="gumb" type="submit">
              Promjeni lokaciju
            </Button>
            </Col>
          </Row>
        </Form>


      
    </Container>
    );
  }
}

