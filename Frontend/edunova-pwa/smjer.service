import http from "../http-common";


class SmjerDataService{

    async get(){
        return await http.get('/Smjer');
    }

    async delete(sifra){
        const odgovor = await http.delete('/Smjer/' + sifra)
        .then(response => {
            return {ok: true, poruka: 'Obrisao uspješno'};
        })
        .catch(e=>{
            return {ok: false, poruka: e.response.data};
        });

        return odgovor;
    }

}

export default new SmjerDataService();