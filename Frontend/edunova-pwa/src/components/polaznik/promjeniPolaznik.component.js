import React, { Component } from "react";
import PolaznikDataService from "../../services/polaznik.service";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";




export default class PromjeniPolaznik extends Component {

  constructor(props) {
    super(props);

    this.polaznik = this.dohvatiPolaznik();
    this.promjeniPolaznik = this.promjeniPolaznik.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
    


    this.state = {
      polaznik: {}
    };
  }


  async dohvatiPolaznik() {
    // ovo mora bolje
    let href = window.location.href;
    let niz = href.split('/'); 
    await PolaznikDataService.getBySifra(niz[niz.length-1])
      .then(response => {
        this.setState({
          polaznik: response.data
        });
       // console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  async promjeniPolaznik(polaznik) {
    // ovo mora bolje
    let href = window.location.href;
    let niz = href.split('/'); 
    const odgovor = await PolaznikDataService.put(niz[niz.length-1],polaznik);
    if(odgovor.ok){
      window.location.href='/polaznici';
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

    this.promjeniPolaznik({
      ime: podaci.get('ime'),
      prezime: podaci.get('prezime'),
      oib: podaci.get('oib'),
      email: podaci.get('email')
    });
    
  }


  render() {
    
    const { polaznik} = this.state;

    return (
    <Container>
        <Form onSubmit={this.handleSubmit}>


        <Form.Group className="mb-3" controlId="ime">
            <Form.Label>Ime</Form.Label>
            <Form.Control type="text" name="ime" placeholder="Josip" maxLength={255} defaultValue={polaznik.ime} required/>
          </Form.Group>


          <Form.Group className="mb-3" controlId="prezime">
            <Form.Label>Prezime</Form.Label>
            <Form.Control type="text" name="prezime" placeholder="Horvat" defaultValue={polaznik.prezime}  required />
          </Form.Group>


          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" name="email" placeholder="jhorvat@edunova.hr" defaultValue={polaznik.email}  />
          </Form.Group>

          <Form.Group className="mb-3" controlId="oib">
            <Form.Label>OIB</Form.Label>
            <Form.Control type="text" name="oib" placeholder="" defaultValue={polaznik.oib}  />
          </Form.Group>

        
         
          <Row>
            <Col>
              <Link className="btn btn-danger gumb" to={`/polaznici`}>Odustani</Link>
            </Col>
            <Col>
            <Button variant="primary" className="gumb" type="submit">
              Promjeni polaznika
            </Button>
            </Col>
          </Row>
        </Form>


      
    </Container>
    );
  }
}

