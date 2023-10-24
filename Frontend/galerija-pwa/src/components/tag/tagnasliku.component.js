import React, { Component } from "react";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";
import SlikaDataService from "../../services/slika.service";
import TagDataService from "../../services/tag.service";
import Table from 'react-bootstrap/Table';


export default class Tagnasliku extends Component {

  constructor(props) {
    super(props);

    this.tagnasliku = this.tagnasliku.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.slike = this.dohvatiSlike();
    this.tags = this.dohvatiTags();
        this.state = {
      slike: [],
      sifraSlika:0,      
      tags: [],
     tagSifra:0
    
    }
    
  }

  componentDidMount() {
   
    this.dohvatiTags();
    this.dohvatiSlike();
  

}


async tagnasliku(slika) {
 
  const odgovor = await TagDataService.post(slika);
  if(odgovor.ok){
    
   // window.location.href='/komentar';
  }else{
    // pokaži grešku
    console.log(odgovor);
  }
}


  async dohvatiSlike() {
    let href = window.location.href;
    let niz = href.split('/'); 
    await SlikaDataService.getAll(niz[niz.length-1])
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

   async dohvatiTags() {
    let href = window.location.href;
    let niz = href.split('/'); 
    await TagDataService.getAll(niz[niz.length-1])
       .then(response => {
         this.setState({
           tags: response.data,
           tagSifra: response.data[0].sifra
         });
 
        // console.log(response.data);
       })
       .catch(e => {
         console.log(e);
       });
   }
   
  

  handleSubmit(e) {
    e.preventDefault();
    

    this.tagnasliku({
      tagSifra: this.state.tagSifra,    
      sifraSlika: this.state.sifraSlika
      
    });


    
    
  }
  render() { 
    const { slike} = this.state;
    const { tags} = this.state;
    return (
    <Container>
        
        <Form onSubmit={this.handleSubmit}>


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

          <Form.Group className="mb-3" controlId="tag">
            <Form.Label>Tag</Form.Label>
            <Form.Select onChange={e => {
              this.setState({ tagSifra: e.target.value});
            }}>
            {tags && tags.map((tag,index) => (
                  <option key={index} value={tag.sifra}>{tag.naziv}</option>

            ))}
            </Form.Select>
          </Form.Group>
          <Row>
            <Col>
              <Link className="btn btn-danger gumb" to={`/tags`}>Odustani</Link>
            </Col>
            <Col>
            <Button variant="primary" className="gumb" type="submit">
              Dodaj Tag
            </Button>
            </Col>
          </Row>
         
          
        </Form>
        


      
    </Container>
    );
  }
}
