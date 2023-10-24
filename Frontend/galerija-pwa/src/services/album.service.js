import http from "../http-common";


class AlbumDataService{
  getAll() {
    return http.get("/album");
  }

    async get(){
        return await http.get('/album');
    }

    async getSlike(sifra) {
      // console.log(sifra);
       return await http.get('/album/' + sifra + '/slike');
     }

    async getBySifra(sifra) {
        return await http.get('/album/' + sifra);
      }

    async delete(sifra){
        const odgovor = await http.delete('/album/' + sifra)
        .then(response => {
            return {ok: true, poruka: 'Obrisao uspješno'};
        })
        .catch(e=>{
            return {ok: false, poruka: e.response.data};
        });

        return odgovor;
    }


    async post(album){
        //console.log(album);
        const odgovor = await http.post('/album',album)
           .then(response => {
             return {ok:true, poruka: 'Unio album'}; // return u odgovor
           })
           .catch(error => {
            //console.log(error.response);
             return {ok:false, poruka: error.response.data}; // return u odgovor
           });
     
           return odgovor;
    }

    async put(sifra,album){
        //console.log(album);
        const odgovor = await http.put('/album/' + sifra,album)
           .then(response => {
             return {ok:true, poruka: 'Promjenio album'}; // return u odgovor
           })
           .catch(error => {
            //console.log(error.response);
             return {ok:false, poruka: error.response.data}; // return u odgovor
           });
     
           return odgovor;
         }

}

export default new AlbumDataService();