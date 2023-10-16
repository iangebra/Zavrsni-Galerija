import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import Izbornik from './components/izbornik.component';
import Pocetna from './components/pocetna.component';
import NadzornaPloca from './components/nadzornaploca.component';
import Albumi from './components/album/albumi.component';
import DodajAlbum from './components/album/dodajAlbum.component';
import PromjeniAlbum from './components/album/promjeniAlbum.component';
import Polaznici from './components/polaznik/polaznici.component';
import DodajPolaznik from './components/polaznik/dodajPolaznik.component';
import PromjeniPolaznik from './components/polaznik/promjeniPolaznik.component';

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
        <Route path="/polaznici" element={<Polaznici />} />
          <Route path="/polaznici/dodaj" element={<DodajPolaznik />} />
          <Route path="/polaznici/:sifra" element={<PromjeniPolaznik />} />
      </Routes>
     
    </Router>
  );
}
