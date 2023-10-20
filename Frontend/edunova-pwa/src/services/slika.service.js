import http from "../http-common";

class SlikaDataService {
  getAll() {
    return http.get("/slika");
  }

  async getBySifra(sifra) {
   // console.log(sifra);
    return await http.get('/slika/' + sifra);
  }

  async getTagovi(sifra) {
    // console.log(sifra);
     return await http.get('/slika/' + sifra + '/tagovi');
   }
 


  async post(slika){
    //console.log(smjer);
    const odgovor = await http.post('/slika',slika)
       .then(response => {
         return {ok:true, poruka: 'Unio sliku'}; // return u odgovor
       })
       .catch(error => {
        console.log(error.response);
         return {ok:false, poruka: error.response.data}; // return u odgovor
       });
 
       return odgovor;
}


  async delete(sifra){
    
    const odgovor = await http.delete('/slika/' + sifra)
       .then(response => {
         return {ok:true, poruka: 'Obrisao uspješno'};
       })
       .catch(error => {
         console.log(error);
         return {ok:false, poruka: error.response.data};
       });
 
       return odgovor;
     }

     async obrisiTag(slika, tag){
    
      const odgovor = await http.delete('/slika/obrisiTag/' + slika + '/' + tag)
         .then(response => {
           return {ok:true, poruka: 'Obrisao uspješno'};
         })
         .catch(error => {
           console.log(error);
           return {ok:false, poruka: error.response.data};
         });
   
         return odgovor;
       }

       async dodajTag(slika, tag){
    
        const odgovor = await http.post('/slika/dodajTag/' + slika + '/' + tag)
           .then(response => {
             return {ok:true, poruka: 'Dodao uspješno'};
           })
           .catch(error => {
             console.log(error);
             return {ok:false, poruka: error.response.data};
           });
     
           return odgovor;
         }

         async dodajKomentar(slika, komentar){
    
          const odgovor = await http.post('/slika/dodajKomentar/' + slika + '/' + komentar)
             .then(response => {
               return {ok:true, poruka: 'Dodao uspješno'};
             })
             .catch(error => {
               console.log(error);
               return {ok:false, poruka: error.response.data};
             });
       
             return odgovor;
           }

         async postaviSliku(sifra,slika){
    
          const odgovor = await http.put('/slika/postaviSliku/' + sifra,slika)
             .then(response => {
               return {ok:true, poruka: 'Postavio sliku'};
             })
             .catch(error => {
               console.log(error);
               return {ok:false, poruka: error.response.data};
             });
       
             return odgovor;
           }

}

export default new SlikaDataService();

