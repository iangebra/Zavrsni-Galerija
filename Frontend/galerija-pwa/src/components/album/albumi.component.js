import React, { Component } from "react";
import { Button, Container, Table } from "react-bootstrap";
import AlbumDataService from "../../services/album.service";
import { NumericFormat } from "react-number-format";
import { Link } from "react-router-dom";
import {FaEdit, FaTrash} from "react-icons/fa"


export default class Albumi extends Component{

    constructor(props){
        super(props);
        const token = localStorage.getItem('Bearer');
    if(token==null || token===''){
      window.location.href='/';
    }

        this.state = {
            Albumi: []
        };

    }

    componentDidMount(){
        this.dohvatiAlbumi();
    }

    async dohvatiAlbumi(){

        await AlbumDataService.get()
        .then(response => {
            this.setState({
                Albumi: response.data
            });
            console.log(response.data);
        })
        .catch(e =>{
            console.log(e);
        });
    }

    async obrisialbum(sifra){
        const odgovor = await AlbumDataService.delete(sifra);
        if(odgovor.ok){
            this.dohvatiAlbumi();
        }else{
            alert(odgovor.poruka);
        }
    }


    render(){

        const { Albumi } = this.state;

        return (
            <Container>
               <a href="/Albumi/dodaj" className="btn btn-success gumb">
                Dodaj novi album
               </a>
                
               <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Naslov</th>
                        <th>Opis</th>
                        
                    </tr>
                </thead>
                <tbody>
                   { Albumi && Albumi.map((album,index) => (

                    <tr key={index}>
                        <td>{album.naslov}</td>
                        <td>{album.opis}</td>
                        
                        <td>
                            <Link className="btn btn-primary gumb"
                            to={`/Albumi/${album.sifra}`}>
                                <FaEdit />
                            </Link>

                            <Button variant="danger" className="gumb"
                            onClick={()=>this.obrisialbum(album.sifra)}>
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