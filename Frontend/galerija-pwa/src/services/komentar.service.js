import http from '../http-common';

class KomentarDataService {
  async getAll() {
    return await http.get('/komentar');
  }



  async getBySifra(sifra) {
    return await http.get('/komentar/' + sifra);
  }

  async post(komentar){
    //console.log(smjer);
    const odgovor = await http.post('/komentar',komentar)
       .then(response => {
         return {ok:true, poruka: 'Unio komentar'}; // return u odgovor
       })
       .catch(error => {
        console.log(error.response);
         return {ok:false, poruka: error.response.data}; // return u odgovor
       });
 
       return odgovor;
  }

 
  async delete(sifra){
    
    const odgovor = await http.delete('/komentar/' + sifra)
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

export default new KomentarDataService();