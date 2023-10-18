import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import Izbornik from './components/izbornik.component';
import Pocetna from './components/pocetna.component';
import NadzornaPloca from './components/nadzornaploca.component';
import Albumi from './components/album/albumi.component';
import DodajAlbum from './components/album/dodajAlbum.component';
import PromjeniAlbum from './components/album/promjeniAlbum.component';
import Tagovi from './components/tag/tag.component';
import DodajTag from './components/tag/dodajTag.component';
import PromjeniTag from './components/tag/promjeniTag.component';
import PromjeniLokaciju from './components/lokacija/promjeniLokaciju';
import DodajLokaciju from './components/lokacija/dodajLokaciju.component';
import Lokacija from './components/lokacija/lokacija.component';
import Slike from './components/slika/slike.component';
import DodajSlika from './components/slika/dodajSlika.component';
import PromjeniSlika from './components/slika/promjeniSlika.component';



export default function App() {
  return (
    <Router>
      <Izbornik />
      <Routes>
        <Route path='/' element={<Pocetna />} />
        <Route path='/nadzornaploca' element={<NadzornaPloca />} />
        <Route path='/albumi' element={<Albumi />} />
        <Route path="albumi/dodaj" element={<DodajAlbum />} />        
        <Route path="/albumi/:sifra" element={<PromjeniAlbum />} />
        <Route path="/tag" element={<Tagovi />} />
          <Route path="/tag/dodaj" element={<DodajTag />} />
          <Route path="/tag/:sifra" element={<PromjeniTag />} />
          <Route path='/lokacija' element={<Lokacija />} />
        <Route path="lokacija/dodaj" element={<DodajLokaciju />} />        
        <Route path="/lokacija/:sifra" element={<PromjeniLokaciju />} />
        <Route path="/slike" element={<Slike />} />
        <Route path="/slike/dodaj" element={<DodajSlika />} />
        <Route path="/slike/:sifra" element={<PromjeniSlika />} />
      </Routes>
     
    </Router>
  );
}
