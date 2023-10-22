import http from '../http-common';

class TagDataService {
  async getAll() {
    return await http.get('/tag');
  }



  async getBySifra(sifra) {
    return await http.get('/tag/' + sifra);
  }

  async traziTag(uvjet) {
    console.log('Tražim s: ' + uvjet);
    return await http.get('/tag/trazi/'+uvjet);
  }

  async post(tag){
    //console.log(smjer);
    const odgovor = await http.post('/tag',tag)
       .then(response => {
         return {ok:true, poruka: 'Unio tag'}; // return u odgovor
       })
       .catch(error => {
        console.log(error.response);
         return {ok:false, poruka: error.response.data}; // return u odgovor
       });
 
       return odgovor;
  }

  async put(sifra,tag){
    const odgovor = await http.put('/tag/' + sifra,tag)
       .then(response => {
         return {ok:true, poruka: 'Promjenio tag'}; // return u odgovor
       })
       .catch(error => {
        console.log(error.response);
         return {ok:false, poruka: error.response.data}; // return u odgovor
       });
 
       return odgovor;
     }


  async delete(sifra){
    
    const odgovor = await http.delete('/tag/' + sifra)
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

export default new TagDataService();