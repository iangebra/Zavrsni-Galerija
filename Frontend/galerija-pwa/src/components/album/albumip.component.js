import React, { Component } from "react";
import { Button, Container, Table } from "react-bootstrap";
import AlbumDataService from "../../services/album.service";
import { NumericFormat } from "react-number-format";
import { Link } from "react-router-dom";
import {FaEdit, FaEye, FaTrash} from "react-icons/fa"


export default class listaalbum extends Component{

    constructor(props){
        super(props);

        this.state = {
            listaalbum: []
        };

    }

    componentDidMount(){
        this.dohvatiAlbumi();
    }

    async dohvatiAlbumi(){

        await AlbumDataService.get()
        .then(response => {
            this.setState({
                listaalbum: response.data
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

        const { listaalbum } = this.state;

        return (
            <Container>
              
                
               <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Naslov</th>
                        <th>Opis</th>
                        <th>Pogledaj album</th>
                        
                    </tr>
                </thead>
                <tbody>
                   { listaalbum && listaalbum.map((album,index) => (

                    <tr key={index}>
                        <td>{album.naslov}</td>
                        <td>{album.opis}</td>
                        
                        <td>
                            <Link className="btn btn-primary gumb"
                            to={`/albumip/${album.sifra}`}>
                                <FaEye/>
                            </Link>
                            
                        </td>
                    </tr>

                   ))}
                </tbody>
               </Table>



            </Container>


        );
    }
}