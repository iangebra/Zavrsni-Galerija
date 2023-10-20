import React, { Component } from "react";
import KomentarDataService from "../../services/komentar.service";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";
import SlikaDataService from "../../services/slika.service";


export default class DodajKomentar extends Component {

  constructor(props) {
    super(props);
    this.dodajKomentar = this.dodajKomentar.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dohvatiSlike = this.dohvatiSlike.bind(this);
    this.state = {
      slike: [],
      sifraSlika:0    
      
    }
    
  }
  componentDidMount() {
    //console.log("Dohvaćam slike");
    this.dohvatiSlike();
  }
  async dodajKomentar(slika) {
    const odgovor = await KomentarDataService.post(slika);
    if(odgovor.ok){
      // routing na smjerovi
      window.location.href='/komentar';
    }else{
      // pokaži grešku
      console.log(odgovor);
    }
  }

  async dohvatiSlike() {

    await SlikaDataService.get()
      .then(response => {
        this.setState({
          slike: response.data,
          sifraSlika: response.data[0].sifra
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

    this.dodajKomentar({
      sadrzaj: podaci.get('sadrzaj'),
      date: podaci.get('date'),
      sifraSlika: this.state.sifraSlika, 
    });
    
  }


  render() { 
    const { slike} = this.state;
    return (
    <Container>
        <Form onSubmit={this.handleSubmit}>


          <Form.Group className="mb-3" controlId="sadrzaj">
            <Form.Label>Sadrzaj</Form.Label>
            <Form.Control type="text" name="sadrzaj" placeholder="Unesi komentar" maxLength={255} required/>
          </Form.Group>


        
          <Form.Group className="mb-3" controlId="date">
            <Form.Label>Datum</Form.Label>
            <Form.Control type="date" name="date" placeholder="" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="slika">
            <Form.Label>Slika</Form.Label>
            <Form.Select onChange={e => {
              this.setState({ sifraSlika: e.target.value});
            }}>
            {slike && slike.map((slika,index) => (
                  <option key={index} value={slika.sifra}>{slika.naslov}</option>

            ))}
            </Form.Select>
          </Form.Group>
          <Row>
            <Col>
              <Link className="btn btn-danger gumb" to={`/komentar`}>Odustani</Link>
            </Col>
            <Col>
            <Button variant="primary" className="gumb" type="submit">
              Dodaj komentar
            </Button>
            </Col>
          </Row>
         
          
        </Form>


      
    </Container>
    );
  }
}

