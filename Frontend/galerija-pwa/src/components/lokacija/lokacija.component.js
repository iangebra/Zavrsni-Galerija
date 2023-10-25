import React, { Component } from "react";
import { Button, Container, Table } from "react-bootstrap";
import LokacijaDataService from "../../services/lokacija.service";
import { NumericFormat } from "react-number-format";
import { Link } from "react-router-dom";
import {FaEdit, FaTrash} from "react-icons/fa"


export default class Lokacija extends Component{

    constructor(props){
        super(props);
        const token = localStorage.getItem('Bearer');
        if(token==null || token===''){
          window.location.href='/';
        }
        this.state = {
            Lokacija: []
        };

    }

    componentDidMount(){
        this.dohvatiLokacija();
    }

    async dohvatiLokacija(){

        await LokacijaDataService.get()
        .then(response => {
            this.setState({
                Lokacija: response.data
            });
            console.log(response.data);
        })
        .catch(e =>{
            console.log(e);
        });
    }

    async obrisilokacija(sifra){
        const odgovor = await LokacijaDataService.delete(sifra);
        if(odgovor.ok){
            this.dohvatiLokacija();
        }else{
            alert(odgovor.poruka);
        }
    }


    render(){

        const { Lokacija } = this.state;

        return (
            <Container>
               <a href="/Lokacija/dodaj" className="btn btn-success gumb">
                Dodaj novu lokaciju
               </a>
                
               <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Naziv</th>
                        <th>Koordinate</th>
                        
                    </tr>
                </thead>
                <tbody>
                   { Lokacija && Lokacija.map((lokacija,index) => (

                    <tr key={index}>
                        <td>{lokacija.naziv}</td>
                        <td>{lokacija.koordinate}</td>
                        
                        <td>
                            <Link className="btn btn-primary gumb"
                            to={`/Lokacija/${lokacija.sifra}`}>
                                <FaEdit />
                            </Link>

                            <Button variant="danger" className="gumb"
                            onClick={()=>this.obrisilokacija(lokacija.sifra)}>
                                <FaTrash />
                            </Button>
                        </td>
                    </tr>

                   ))}
                </tbody>
               </Table>



            </Container>


        );
    }
}