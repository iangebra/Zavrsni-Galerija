import React, { Component } from "react";
import SlikaDataService from "../../services/slika.service";
import AlbumDataService from "../../services/album.service";
import LokacijaDataService from "../../services/lokacija.service";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";
import moment from 'moment';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Image } from "react-bootstrap";



export default class DodajSlika extends Component {

  constructor(props) {
    super(props);
   const token = localStorage.getItem('Bearer');
    if(token==null || token===''){
      window.location.href='/'; 
    }
    this.dodajSlika = this.dodajSlika.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dohvatiAlbumi = this.dohvatiAlbumi.bind(this);
    this.dohvatiLokacija = this.dohvatiLokacija.bind(this);

    this.state = {
      albumi: [],
      sifraAlbum:0,
      lokacija: [],
      sifraLokacija:0
    }

    
  }

  componentDidMount() {
    
    this.dohvatiAlbumi();
    this.dohvatiLokacija();
  }

  

  async dodajSlika(slika) {
    
    const odgovor = await SlikaDataService.post(slika);
    if(odgovor.ok){
     
     window.location.href='/slike';
    }else{
    
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

  async dohvatiLokacija() {

    await LokacijaDataService.get()
      .then(response => {
        this.setState({
          lokacija: response.data,
          sifraLokacija: response.data[0].sifra
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
    let datum = moment.utc(podaci.get('datum'));
    let slika = this.state.slikaZaServer;
    slika=slika.replace('data:image/png;base64,', '');

    this.dodajSlika({
      naslov: podaci.get('naslov'),
      datum: datum,
      sifraAlbum: this.state.sifraAlbum,
      sifraLokacija: this.state.sifraLokacija,
      base64: slika
      
      
    });
    
  }

  _crop() {
    // image in dataUrl
   // console.log(this.cropper.getCroppedCanvas().toDataURL());
   this.setState({
    slikaZaServer: this.cropper.getCroppedCanvas().toDataURL()
    
  });
  
}

  onCropperInit(cropper) {
    this.cropper = cropper;
}

onChange = (e) => {
  e.preventDefault();
  let files;
  if (e.dataTransfer) {
    files = e.dataTransfer.files;
  } else if (e.target) {
    files = e.target.files;
  }
  const reader = new FileReader();
  reader.onload = () => {
    this.setState({
      image: reader.result
    });
  };
  try {
    reader.readAsDataURL(files[0]);
  } catch (error) {
    
  }
  
}




  render() { 
    const { albumi} = this.state;
    const { lokacija} = this.state;
    const { image} = this.state;   
    const { slikaZaServer} = this.state;
    const { trenutnaSlika} = this.state;
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

          <Form.Group className="mb-3" controlId="lokacija">
            <Form.Label>Lokacija</Form.Label>
            <Form.Select onChange={e => {
              this.setState({ sifraLokacija: e.target.value});
            }}>
            {lokacija && lokacija.map((lokacija,index) => (
                  <option key={index} value={lokacija.sifra}>{lokacija.naziv}</option>

            ))}
            </Form.Select>
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
            <Col key="1" sm={12} lg={6} md={6}>
                Trenutna slika<br />
                <Image src={trenutnaSlika} className="slika"/>
                </Col>          
                <Col key="2" sm={12} lg={6} md={6}>
                  Nova slika<br />
                <Image src={slikaZaServer} className="slika"/>
                </Col>
              

            
            <Col key="3" sm={12} lg={6} md={6}>
            <input type="file" onChange={this.onChange} />

           
                <Cropper
                    src={image}
                    style={{ height: 400, width: "100%" }}
                    initialAspectRatio={1.5}
                    guides={true}
                    viewMode={1}
                    minCropBoxWidth={50}
                    minCropBoxHeight={50}
                    cropBoxResizable={false}
                    background={false}
                    responsive={true}
                    checkOrientation={false} 
                    crop={this._crop.bind(this)}
                    onInitialized={this.onCropperInit.bind(this)}
                />
        </Col>
            
          </Row>
          
         
          
        </Form>


      
    </Container>
    );
  }
}