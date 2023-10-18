import React, { Component } from "react";
import SlikaDataService from "../../services/slika.service";
import AlbumDataService from "../../services/album.service";
import TagDataService from "../../services/tag.service";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";
import moment from 'moment';
import Table from 'react-bootstrap/Table';
import { FaTrash } from 'react-icons/fa';

import { AsyncTypeahead } from 'react-bootstrap-typeahead';


export default class PromjeniSlika extends Component {

  constructor(props) {
    super(props);

    

  //  console.log('Konstruktor promjeniSlika');

    

    this.slika = this.dohvatiSlika();
    this.promjeniSlika = this.promjeniSlika.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.albumi = this.dohvatiAlbumi();
    this.tagovi = this.dohvatiTagovi();
    this.obrisiTag = this.obrisiTag.bind(this);
    this.traziTag = this.traziTag.bind(this);
    this.dodajTag = this.dodajTag.bind(this);


    this.state = {
      slika: {},
      albumi: [],
      tagovi: [],
      sifraAlbum:0,
      pronadeniTagovi: []
    };
  }




  async dohvatiSlika() {
    // ovo mora bolje
    //console.log('Dohvaćam grupu');
    let href = window.location.href;
    let niz = href.split('/'); 
    await SlikaDataService.getBySifra(niz[niz.length-1])
      .then(response => {
        let g = response.data;        
        g.datum = moment.utc(g.datum).format("yyyy-MM-DD");
        
        //console.log(g.vrijemePocetka);
        this.setState({
          slika: g
        });
       // console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  

  async promjeniSlika(slika) {
    const odgovor = await SlikaDataService.post(slika);
    if(odgovor.ok){
      // routing na albumovi
      window.location.href='/slike';
    }else{
      // pokaži grešku
      console.log(odgovor);
    }
  }


  async dohvatiAlbumi() {
   // console.log('Dohvaćm albumove');
    await AlbumDataService.get()
      .then(response => {
        this.setState({
          albumi: response.data,
          sifraAlbum: response.data[0].sifra
        });

       // console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  async dohvatiTagovi() {
    let href = window.location.href;
    let niz = href.split('/'); 
    await SlikaDataService.getTagovi(niz[niz.length-1])
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

   

   async traziTag( uvjet) {

    await TagDataService.traziTag( uvjet)
       .then(response => {
         this.setState({
          pronadeniTagovi: response.data
         });
 
        // console.log(response.data);
       })
       .catch(e => {
         console.log(e);
       });
   }

   async obrisiTag(slika, tag){
    const odgovor = await SlikaDataService.obrisiTag(slika, tag);
    if(odgovor.ok){
     this.dohvatiTagovi();
    }else{
     //this.otvoriModal();
    }
   }

   async dodajTag(slika, tag){
    const odgovor = await SlikaDataService.dodajTag(slika, tag);
    if(odgovor.ok){
     this.dohvatiTagovi();
    }else{
    //this.otvoriModal();
    }
   }
 

  handleSubmit(e) {
    e.preventDefault();
    const podaci = new FormData(e.target);
    console.log(podaci.get('datum'));    
    let datum = moment.utc(podaci.get('datum'));
    console.log(datum);

    this.promjeniSlika({
      naslov: podaci.get('naslov'),
      datum: datum,
      sifraAlbum: this.state.sifraAlbum
    });
    
  }


  render() { 
    const { albumi} = this.state;
    const { slika} = this.state;
    const { tagovi} = this.state;
    const { pronadeniTagovi} = this.state;


    const obradiTrazenje = (uvjet) => {
      this.traziTag( uvjet);
    };

    const odabraniTag = (tag) => {
      //console.log(grupa.sifra + ' - ' + polaznik[0].sifra);
      if(tag.length>0){
        this.dodajTag(slika.sifra, tag[0].sifra);
      }
     
    };

    return (
    <Container>
       
        <Form onSubmit={this.handleSubmit}>
          <Row>
          <Col key="1" sm={12} lg={6} md={6}>
              <Form.Group className="mb-3" controlId="naslov">
                <Form.Label>Naslov</Form.Label>
                <Form.Control type="text" name="naslov" placeholder="" maxLength={255} defaultValue={slika.naslov}  required/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="album">
                <Form.Label>Album</Form.Label>
                <Form.Select defaultValue={slika.sifraAlbum}  onChange={e => {
                  this.setState({ sifraAlbum: e.target.value});
                }}>
                {albumi && albumi.map((album,index) => (
                      <option key={index} value={album.sifra}>{album.naslov}</option>

                ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="datum">
                <Form.Label>Datum</Form.Label>
                <Form.Control type="date" name="datum" placeholder="" defaultValue={slika.datum}  />
              </Form.Group>                    



              <Row>
                <Col>
                  <Link className="btn btn-danger gumb" to={`/slike`}>Odustani</Link>
                </Col>
                <Col>
                <Button variant="primary" className="gumb" type="submit">
                  Promjeni sliku
                </Button>
                </Col>
              </Row>
          </Col>
          <Col key="2" sm={12} lg={6} md={6} className="tagoviSlika">
          <Form.Group className="mb-3" controlId="uvjet">
                <Form.Label>Traži tag</Form.Label>
                
          <AsyncTypeahead
            className="autocomplete"
            id="uvjet"
            emptyLabel="Nema rezultata"
            searchText="Tražim..."
            labelKey={(tag) => `${tag.naziv}`}
            minLength={3}
            options={pronadeniTagovi}
            onSearch={obradiTrazenje}
            placeholder="dio naziva"
            renderMenuItemChildren={(tag) => (
              <>
                <span>{tag.naziv}</span>
              </>
            )}
            onChange={odabraniTag}
          />
          </Form.Group>
          <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Tag</th>
                  <th>Akcija</th>
                </tr>
              </thead>
              <tbody>
              {tagovi && tagovi.map((tag,index) => (
                
                <tr key={index}>
                  <td > {tag.naziv}</td>
                  <td>
                  <Button variant="danger"   onClick={() => this.obrisiTag(slika.sifra, tag.sifra)}><FaTrash /></Button>
                    
                  </td>
                </tr>
                ))
              }
              </tbody>
            </Table>    
          </Col>
          </Row>

          
         
          
        </Form>


      
    </Container>
    );
  }
}

