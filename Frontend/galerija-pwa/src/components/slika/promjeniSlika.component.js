import React, { Component } from "react";
import SlikaDataService from "../../services/slika.service";
import AlbumDataService from "../../services/album.service";
import LokacijaDataService from "../../services/lokacija.service";
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
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Image } from "react-bootstrap";



import { AsyncTypeahead } from 'react-bootstrap-typeahead';


export default class PromjeniSlika extends Component {

  constructor(props) {
    super(props);
    const token = localStorage.getItem('Bearer');
    if(token==null || token===''){
      window.location.href='/';
    }
    this.slika = this.dohvatiSlika();
    this.promjeniSlika = this.promjeniSlika.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.albumi = this.dohvatiAlbumi();
    this.tags = this.dohvatiTags();
    this.obrisiTag = this.obrisiTag.bind(this);
    this.traziTag = this.traziTag.bind(this);
    this.dodajTag = this.dodajTag.bind(this);
    this.komentari = this.dohvatiKomentar();
    this.lokacija = this.dohvatiLokacija();
    
    this.spremiSliku = this.spremiSliku.bind(this);


    this.state = {
      slika: {},
      albumi: [],
      tags: [],
      komentari: [],
      lokacija: [],
      sifraAlbum:0,
      sifraLokacija:0,
      pronadeniTags: [],
      trenutnaSlika: ""
    };
  }




  async dohvatiSlika() {
    
    let href = window.location.href;
    let niz = href.split('/'); 
    await SlikaDataService.getBySifra(niz[niz.length-1])
      .then(response => {
        let g = response.data;        
        g.datum = moment.utc(g.datum).format("yyyy-MM-DD");
        
        
        
        this.setState({
          slika: g,
          trenutnaSlika: g.slika
        });
       // console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  

  async promjeniSlika(slika) {
    // ovo mora bolje
    let href = window.location.href;
    let niz = href.split('/'); 
    const odgovor = await SlikaDataService.put(niz[niz.length-1],slika);
    if(odgovor.ok){
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

  async dohvatiTags() {
    let href = window.location.href;
    let niz = href.split('/'); 
    await SlikaDataService.getTags(niz[niz.length-1])
       .then(response => {
         this.setState({
           tags: response.data
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
          pronadeniTags: response.data
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
     this.dohvatiTags();
    }else{
     //this.otvoriModal();
    }
   }

   async dodajTag(slika, tag){
    const odgovor = await SlikaDataService.dodajTag(slika, tag);
    if(odgovor.ok){
     this.dohvatiTags();
    }else{
    //this.otvoriModal();
    }
   }
   async dohvatiKomentar() {
    let href = window.location.href;
    let niz = href.split('/'); 
    await SlikaDataService.getKomentari(niz[niz.length-1])
       .then(response => {
         this.setState({
           komentari: response.data
         });
 
        // console.log(response.data);
       })
       .catch(e => {
         console.log(e);
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


spremiSlikuAkcija = () =>{
  const { slikaZaServer} = this.state;
  const { slika} = this.state;
  
  

  this.spremiSliku(slika.sifra,slikaZaServer); 
};


async spremiSliku(sifra,slika){

  let base64 = slika;
  base64=base64.replace('data:image/png;base64,', '');
  const odgovor = await  SlikaDataService.postaviSliku(sifra,{
    base64: base64
  });
if(odgovor.ok){
  
  this.setState({
    trenutnaSlika: slika
  });
}else{
  // pokaži grešku
  console.log(odgovor);
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
    sifraAlbum: this.state.sifraAlbum,
    sifraLokacija: this.state.sifraLokacija
  });
  
}

  render() { 
    const { albumi} = this.state;
    const { lokacija} = this.state;
    const { slika} = this.state;
    const { tags} = this.state;
    const { pronadeniTags} = this.state;
    const { image} = this.state;
    
    const { trenutnaSlika} = this.state;  
    const { komentari} = this.state; 
    
    const obradiTrazenje = (uvjet) => {
      this.traziTag( uvjet);
    };

    const odabraniTag = (tag) => {
      //console.log(slika.sifra + ' - ' + tag[0].sifra);
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

              <Form.Group className="mb-3" controlId="lokacija">
                <Form.Label>Lokacija</Form.Label>
                <Form.Select defaultValue={slika.sifraLokacija}  onChange={e => {
                  this.setState({ sifraLokacija: e.target.value});
                }}>
                {lokacija && lokacija.map((lokacija,index) => (
                      <option key={index} value={lokacija.sifra}>{lokacija.naziv}</option>

                ))}
                </Form.Select>
              </Form.Group>

               <Row>
              <Col key="1" sm={12} lg={6} md={6}>
                Trenutna slika<br />
                <Image src={trenutnaSlika} className="slika"/>
                </Col>
                
              </Row>

            </Col>
            <Col key="2" sm={12} lg={6} md={6}>
            <input type="file" onChange={this.onChange} />

             <input type="button" onClick={this.spremiSlikuAkcija} value={"Spremi sliku"} />

                <Cropper
                    src={image}
                    style={{ height: 400, width: "100%" }}                    
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


                              

              <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Tagovi na slici</th>
                  
                </tr>
              </thead>
              <tbody>
              {tags && tags.map((tag,index) => (
                
                <tr key={index}>
                  <td > {tag.naziv}</td>
                 
                </tr>
                ))
              }
              </tbody>
            </Table>    
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Komentari na slici</th>
                  
                </tr>
              </thead>
              <tbody>
              {komentari && komentari.map((komentar,index) => (
                
                <tr key={index}>
                  <td > {komentar.sadrzaj}</td>
                 
                </tr>
                ))
              }
              </tbody>
            </Table>    

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
          
          
          
          
          </Form>

          <Col key="2" sm={12} lg={6} md={6} className="tagSlika">
          <Form.Group className="mb-3" controlId="uvjet">
                <Form.Label>Traži tag</Form.Label>
                
          <AsyncTypeahead
            className="autocomplete"
            id="uvjet"
            emptyLabel="Nema rezultata"
            searchText="Tražim..."
            labelKey={(tag) => `${tag.naziv}`}
            minLength={3}
            options={pronadeniTags}
            onSearch={obradiTrazenje}
            placeholder="dio naziva"
            renderMenuItemChildren={(tag) => (
              <>
                <span>{tag.naziv} </span>
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
              {tags && tags.map((tag,index) => (
                
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
      
    </Container>
    );
  }
}

