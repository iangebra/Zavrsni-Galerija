import React, { Component } from "react";
import SlikaDataService from "../../services/slika.service";
import AlbumDataService from "../../services/album.service";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";
import moment from 'moment';



export default class DodajSlika extends Component {

  constructor(props) {
    super(props);
    this.dodajSlika = this.dodajSlika.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dohvatiAlbumi = this.dohvatiAlbumi.bind(this);

    this.state = {
      albumi: [],
      sifraAlbum:0
    };
  }

  componentDidMount() {
    //console.log("Dohvaćam smjerove");
    this.dohvatiAlbumi();
  }

  async dodajSlika(slika) {
    const odgovor = await SlikaDataService.post(slika);
    if(odgovor.ok){
      // routing na smjerovi
      window.location.href='/slike';
    }else{
      // pokaži grešku
      console.log(odgovor);
    }
  }


  async dohvatiAlbumi() {

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


  handleSubmit(e) {
    e.preventDefault();
    const podaci = new FormData(e.target);
    console.log(podaci.get('datum'));    
    let datum = moment.utc(podaci.get('datum'));
    console.log(datum);

    this.dodajSlika({
      naslov: podaci.get('naslov'),
      datum: datum,
      sifraAlbum: this.state.sifraAlbum
    });
    
  }


  render() { 
    const { albumi} = this.state;
    return (
    <Container>
        <Form onSubmit={this.handleSubmit}>


          <Form.Group className="mb-3" controlId="naslov">
            <Form.Label>Naslov</Form.Label>
            <Form.Control type="text" name="naslov" placeholder="" maxLength={255} required/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="album">
            <Form.Label>Album</Form.Label>
            <Form.Select onChange={e => {
              this.setState({ sifraAlbum: e.target.value});
            }}>
            {albumi && albumi.map((album,index) => (
                  <option key={index} value={album.sifra}>{album.naslov}</option>

            ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="datum">
            <Form.Label>Datum početka</Form.Label>
            <Form.Control type="date" name="datum" placeholder=""  />
          </Form.Group>     

                   <Row>
            <Col>
              <Link className="btn btn-danger gumb" to={`/slike`}>Odustani</Link>
            </Col>
            <Col>
            <Button variant="primary" className="gumb" type="submit">
              Dodaj sliku
            </Button>
            </Col>
          </Row>
         
          
        </Form>


      
    </Container>
    );
  }
}

