import React, { Component } from "react";
import { Container, Table } from "react-bootstrap";


export default class Smjerovi extends Component{


    render(){
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
                    {/* Ovdje će doći podaci s backend-a */}
                </tbody>
               </Table>



            </Container>


        );
    }
}