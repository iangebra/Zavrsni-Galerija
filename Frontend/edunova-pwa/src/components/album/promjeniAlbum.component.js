import React, { Component } from "react";
import AlbumDataService from "../../services/album.service";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";



export default class PromjeniAlbum extends Component {

  constructor(props) {
    super(props);

   
    this.album = this.dohvatiAlbum();
    this.PromjeniAlbum = this.PromjeniAlbum.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    

    this.state = {
      album: {}
    };

  }



  async dohvatiAlbum() {
    let href = window.location.href;
    let niz = href.split('/'); 
    await AlbumDataService.getBySifra(niz[niz.length-1])
      .then(response => {
        this.setState({
          album: response.data
        });
       // console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    
   
  }

  async PromjeniAlbum(album) {
    // ovo mora bolje
    let href = window.location.href;
    let niz = href.split('/'); 
    const odgovor = await AlbumDataService.put(niz[niz.length-1],album);
    if(odgovor.ok){
      // routing na albumi
      window.location.href='/albumi';
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

    this.PromjeniAlbum({
      naslov: podaci.get('naslov'),      
      opis: podaci.get('opis')
     
    });
    
  }


  render() {
    
   const { album} = this.state;


    return (
    <Container>
        <Form onSubmit={this.handleSubmit}>


          <Form.Group className="mb-3" controlId="naslov">
            <Form.Label>Naslov</Form.Label>
            <Form.Control type="text" name="naslov" placeholder="Naslov albuma"
            maxLength={255} defaultValue={album.naslov} required />
          </Form.Group>


          <Form.Group className="mb-3" controlId="opis">
            <Form.Label>Opis</Form.Label>
            <Form.Control type="text" name="opis" defaultValue={album.opis}  placeholder="Opis albuma" />
          </Form.Group>                
         
          <Row>
            <Col>
              <Link className="btn btn-danger gumb" to={`/albumi`}>Odustani</Link>
            </Col>
            <Col>
            <Button variant="primary" className="gumb" type="submit">
              Promjeni album
            </Button>
            </Col>
          </Row>
        </Form>


      
    </Container>
    );
  }
}

