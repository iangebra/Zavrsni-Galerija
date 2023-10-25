import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import Izbornik from './components/izbornik.component';
import Pocetna from './components/pocetna.component';
import Nadzornaploca from './components/nadzornaploca.component';
import Albumi from './components/album/albumi.component';
import Albumip from './components/album/albumip.component';
import DodajAlbum from './components/album/dodajAlbum.component';
import PromjeniAlbum from './components/album/promjeniAlbum.component';
import Listaalbum from './components/album/listaalbum.component';
import Tags from './components/tag/tags.component';
import DodajTag from './components/tag/dodajTag.component';
import PromjeniTag from './components/tag/promjeniTag.component';
import PromjeniLokaciju from './components/lokacija/promjeniLokaciju';
import DodajLokaciju from './components/lokacija/dodajLokaciju.component';
import Lokacija from './components/lokacija/lokacija.component';
import Slike from './components/slika/slike.component';
import DodajSlika from './components/slika/dodajSlika.component';
import PromjeniSlika from './components/slika/promjeniSlika.component';
import Komentar from './components/komentar/komentar.component';
import DodajKomentar from './components/komentar/dodajKomentar.component';
import Login from './components/login.component';
import Odjava from './components/odjava.component';




export default function App() {
  return (
    <Router>
      <Izbornik />
      <Routes>
      <Route path='/' element={<Nadzornaploca />} />
        <Route path='/pocetna' element={<Pocetna />} />        
        <Route path='/albumi' element={<Albumi />} />  
        <Route path='/albumip' element={<Albumip />} />          
        <Route path="albumi/dodaj" element={<DodajAlbum />} />        
        <Route path="/albumi/:sifra" element={<PromjeniAlbum />} />
        <Route path="/albumip/:sifra" element={<Listaalbum />} />
        <Route path="/tags" element={<Tags />} />
          <Route path="/tags/dodaj" element={<DodajTag />} />
          <Route path="/tags/:sifra" element={<PromjeniTag />} />          
          <Route path='/lokacija' element={<Lokacija />} />
        <Route path="lokacija/dodaj" element={<DodajLokaciju />} />        
        <Route path="/lokacija/:sifra" element={<PromjeniLokaciju />} />
        <Route path="/slike" element={<Slike />} />
        <Route path="/slike/dodaj" element={<DodajSlika />} />
        <Route path="/slike/:sifra" element={<PromjeniSlika />} />    
        <Route path="/komentar" element={<Komentar />} />
          <Route path="/komentar/dodaj" element={<DodajKomentar />} />
          <Route path="/login" element={<Login />} />
        <Route path="/odjava" element={<Odjava />} />
      </Routes>
     
    </Router>
  );
}
