import React, { Component } from "react";
import TagDataService from "../../services/tag.service";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";




export default class PromjeniTag extends Component {

  constructor(props) {
    super(props);
    const token = localStorage.getItem('Bearer');
    if(token==null || token===''){
      window.location.href='/';
    }

    this.tag = this.dohvatiTag();
    this.promjeniTag = this.promjeniTag.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
    


    this.state = {
      tag: {}
    };
  }


  async dohvatiTag() {
  
    let href = window.location.href;
    let niz = href.split('/'); 
    await TagDataService.getBySifra(niz[niz.length-1])
      .then(response => {
        this.setState({
          tag: response.data
        });
       // console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  async promjeniTag(tag) {
    
    let href = window.location.href;
    let niz = href.split('/'); 
    const odgovor = await TagDataService.put(niz[niz.length-1],tag);
    if(odgovor.ok){
      window.location.href='/tags';
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
    
    
    // You can pass formData as a service body directly:

    this.promjeniTag({
      naziv: podaci.get('naziv')
      
    });
    
  }


  render() {
    
    const { tag} = this.state;

    return (
    <Container>
        <Form onSubmit={this.handleSubmit}>


        <Form.Group className="mb-3" controlId="naziv">
            <Form.Label>Naziv</Form.Label>
            <Form.Control type="text" name="naziv" placeholder="naziv" maxLength={255} defaultValue={tag.naziv} required/>
          </Form.Group>

          <Row>
            <Col>
              <Link className="btn btn-danger gumb" to={`/tags`}>Odustani</Link>
            </Col>
            <Col>
            <Button variant="primary" className="gumb" type="submit">
              Promjeni tag
            </Button>
            </Col>
          </Row>
        </Form>


      
    </Container>
    );
  }
}

