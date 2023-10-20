//import {Link} from 'react-router-dom';


//export default function App() {
 // return (
   // <div class="pocetna"> 

    
     // {/* 👇️ react router link */}
      //<Link to="/portreti">
      //<img src='/portreti.jpg'  />
      
      //</Link>

      //{/* 👇️ react router link */}
      
      //<Link to="/svemir">
      //<img src='/svemir.jpg'  />
      
      //</Link>
      //<br />
       //{/* 👇️ react router link */}
       //<Link to="/landscape">
      // <img src='/landscape.jpg'  />
      //</Link>
       // {/* 👇️ react router link */}
       // <Link to="/street">
       // <img src='/street.jpg'  />
      //</Link>

      //<br />
     // <br />

      
    //</div>
 // );
//}

import React, { Component } from "react";
import { Container } from "react-bootstrap";


export default class Pocetna extends Component{


    render(){
        return (
            <Container>
                <p>Dobrodošli na Galerija aplikaciju!</p>
            </Container>


        );
    }
}