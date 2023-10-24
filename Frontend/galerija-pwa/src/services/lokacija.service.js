import http from "../http-common";


class LokacijaDataService{

    async get(){
        return await http.get('/lokacija');
    }

    async getBySifra(sifra) {
        return await http.get('/lokacija/' + sifra);
      }

    async delete(sifra){
        const odgovor = await http.delete('/lokacija/' + sifra)
        .then(response => {
            return {ok: true, poruka: 'Obrisao uspješno'};
        })
        .catch(e=>{
            return {ok: false, poruka: e.response.data};
        });

        return odgovor;
    }


    async post(lokacija){
        //console.log(lokacija);
        const odgovor = await http.post('/lokacija',lokacija)
           .then(response => {
             return {ok:true, poruka: 'Unio lokacija'}; // return u odgovor
           })
           .catch(error => {
            //console.log(error.response);
             return {ok:false, poruka: error.response.data}; // return u odgovor
           });
     
           return odgovor;
    }

    async put(sifra,lokacija){
        //console.log(lokacija);
        const odgovor = await http.put('/lokacija/' + sifra,lokacija)
           .then(response => {
             return {ok:true, poruka: 'Promjenio lokaciju'}; // return u odgovor
           })
           .catch(error => {
            //console.log(error.response);
             return {ok:false, poruka: error.response.data}; // return u odgovor
           });
     
           return odgovor;
         }

}

export default new LokacijaDataService();