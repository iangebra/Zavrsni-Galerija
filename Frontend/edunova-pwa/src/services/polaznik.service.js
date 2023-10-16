import http from '../http-common';

class PolaznikDataService {
  async getAll() {
    return await http.get('/polaznik');
  }



  async getBySifra(sifra) {
    return await http.get('/polaznik/' + sifra);
  }

  async post(polaznik){
    //console.log(smjer);
    const odgovor = await http.post('/polaznik',polaznik)
       .then(response => {
         return {ok:true, poruka: 'Unio polaznika'}; // return u odgovor
       })
       .catch(error => {
        console.log(error.response);
         return {ok:false, poruka: error.response.data}; // return u odgovor
       });
 
       return odgovor;
  }

  async put(sifra,polaznik){
    const odgovor = await http.put('/polaznik/' + sifra,polaznik)
       .then(response => {
         return {ok:true, poruka: 'Promjenio polaznika'}; // return u odgovor
       })
       .catch(error => {
        console.log(error.response);
         return {ok:false, poruka: error.response.data}; // return u odgovor
       });
 
       return odgovor;
     }


  async delete(sifra){
    
    const odgovor = await http.delete('/polaznik/' + sifra)
       .then(response => {
         return {ok:true, poruka: 'Obrisao uspješno'};
       })
       .catch(error => {
         console.log(error);
         return {ok:false, poruka: error.response.data};
       });
 
       return odgovor;
     }
     
 
}

export default new PolaznikDataService();