import React, { Component } from "react";
import AlbumDataService from "../../services/album.service";
import SlikaDataService from "../../services/slika.service";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import { Image } from "react-bootstrap";
import Card from 'react-bootstrap/Card';





export default class Listaalbum extends Component {

  constructor(props) {
    super(props);
    const token = localStorage.getItem('Bearer');
    if(token==null || token===''){
      window.location.href='/';
    }
    
   
   
    this.album = this.dohvatiAlbum();
    this.listaalbum = this.listaalbum.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.slike = this.dohvatiSlike();
    

    this.state = {
      album: {},
      slike: []
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

  async listaalbum(album) {
    // ovo mora bolje
    let href = window.location.href;
    let niz = href.split('/'); 
    const odgovor = await AlbumDataService.put(niz[niz.length-1],album);
    if(odgovor.ok){
     
      window.location.href='/albumip';
    }else{
      // pokaži grešku
      console.log(odgovor);
    }
  }

  async dohvatiSlike() {
    let href = window.location.href;
    let niz = href.split('/'); 
    await AlbumDataService.getSlike(niz[niz.length-1])
       .then(response => {
         this.setState({
           slike: response.data
         });
 
        // console.log(response.data);
       })
       .catch(e => {
         console.log(e);
       });
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

    this.listaalbum({
      naslov: podaci.get('naslov'),      
      opis: podaci.get('opis')
     
    });
    
  }


  render() {
    
   const { album} = this.state;
   const { slike} = this.state;


    return (
    <Container>
       

     
          
          <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Slike u ovom albumu</th>
                  
                </tr>
              </thead>             
            </Table>    
            <Row>
            {slike && slike.map((slika,index) => (
           
           <Col key={slika} sm={12} lg={4} md={4}>
            

              <Card style={{ width: '25rem' }}>
              <Card.Img variant="top" Image src={slika.slika}/>
              <Card.Body>
              <Card.Title>{slika.naslov} </Card.Title>
               <Card.Text>Lokacija:&nbsp;
                    {slika.lokacija}
                  </Card.Text>
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

