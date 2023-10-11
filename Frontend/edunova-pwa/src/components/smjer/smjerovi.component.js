import React, { Component } from "react";
import { Button, Container, Table } from "react-bootstrap";
import SmjerDataService from "../../services/smjer.service";
import { NumericFormat } from "react-number-format";
import { Link } from "react-router-dom";
import {FaEdit, FaTrash} from "react-icons/fa"


export default class Smjerovi extends Component{

    constructor(props){
        super(props);
        this.dohvatiSmjerovi = this.dohvatiSmjerovi.bind(this);
        this.obrisiSmjer = this.obrisiSmjer.bind(this);

        this.state = {
            smjerovi: []
        };

    }

    componentDidMount(){
        this.dohvatiSmjerovi();
    }

    async dohvatiSmjerovi(){

        await SmjerDataService.get()
        .then(response => {
            this.setState({
                smjerovi: response.data
            });
            console.log(response.data);
        })
        .catch(e =>{
            console.log(e);
        });
    }

    async obrisiSmjer(sifra){
        const odgovor = await SmjerDataService.delete(sifra);
        if(odgovor.ok){
            this.dohvatiSmjerovi();
        }else{
            alert(odgovor.poruka);
        }
    }


    render(){

        const { smjerovi } = this.state;

        return (
            <Container>
               <a href="/smjerovi/dodaj" className="btn btn-success gumb">
                Dodaj novi smjer
               </a>
                
               <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Naziv</th>
                        <th>Trajanje</th>
                        <th>Cijena</th>
                        <th>Verificiran</th>
                        <th>Akcija</th>
                    </tr>
                </thead>
                <tbody>
                   { smjerovi && smjerovi.map((smjer,index) => (

                    <tr key={index}>
                        <td>{smjer.naziv}</td>
                        <td className="broj">{smjer.trajanje}</td>
                        <td className="broj">
                            <NumericFormat
                                value={smjer.cijena}
                                displayType={'text'}
                                thousandSeparator='.'
                                decimalSeparator=','
                                prefix={'€'}
                                decimalScale={2} 
                                fixedDecimalScale/>
                        </td>
                        <td className="sredina">{smjer.verificiran ? 'DA' : 'NE'}</td>
                        <td>
                            <Link className="btn btn-primary gumb"
                            to={`/smjerovi/${smjer.sifra}`}>
                                <FaEdit />
                            </Link>

                            <Button variant="danger" className="gumb"
                            onClick={()=>this.obrisiSmjer(smjer.sifra)}>
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