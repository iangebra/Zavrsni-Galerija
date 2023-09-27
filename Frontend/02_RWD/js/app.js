$(document).foundation();

let podaci=[];
let trenutniSmjer=0;

function ucitajPodatke(){
    $.ajax('https://localhost:7184/api/v1/Smjer',   // request url
    {
        success: function (data, status, xhr) {// success callback function
           // console.log(data);
           podaci = data;
           $('#podaci').html('');
           for(let i=0;i<data.length;i++){
            $('#podaci').append('<li>' + data[i].naziv + 
            ' <a class="brisi" href="#" id="s_' + data[i].sifra + '">X</a>' + 
            ' <a class="promjena" href="#" id="p_' + data[i].sifra + '">P</a>' + 
            '</li>');
           }
           definirajDogadaje();
    }
});
}

ucitajPodatke();


function definirajDogadaje(){
    $('.brisi').off('click');
    $('.brisi').click(function(){

        const element = $(this);
       // console.log(element);
        const sifra = element.attr('id').split('_')[1];
        console.log('Brišem: ' + sifra);

        $.ajax('https://localhost:7184/api/v1/Smjer/' + sifra, {
        type: 'DELETE',  // http method
        success: function (data, status, xhr) {
           element.parent().remove();
        },
        error: function (e) {
                console.log(e);
                alert(e.responseJSON);
        }
    });
        return false;
    });


    $('.promjena').off('click');
    $('.promjena').click(function(){
        const element = $(this);
        // console.log(element);
         const sifra = element.attr('id').split('_')[1];
        //console.log(sifra);
        trenutniSmjer = sifra;
        for(let i=0;i<podaci.length;i++){
            const s = podaci[i];
            if(s.sifra==sifra){
                $('#naziv').val(s.naziv);
                $('#cijena').val(s.cijena);
                $('#upisnina').val(s.upisnina);
                $('#trajanje').val(s.trajanje);
                if(s.verificiran){
                    $('#verificiran').attr('checked','checked');
                }else{
                    $('#verificiran').removeAttr('checked');
                }
                break;
            }
        }

        return false;
    });
}


$('#dodaj').click(function(){

    const trajanje = $('#trajanje').val();
    if(trajanje.trim().length==0){
        trajanje=0;
    }

    const cijena = $('#cijena').val();
    if(cijena.trim().length==0){
        cijena=0;
    }

    const upisnina = $('#upisnina').val();
    if(upisnina.trim().length==0){
        upisnina=0;
    }

    const verificiran = $('#verificiran').is(":checked")

    const smjer = { 
        naziv: $('#naziv').val(), 
        trajanje: trajanje,
        cijena:  cijena,
        upisnina: upisnina,
        verificiran: verificiran};

    $.ajax('https://localhost:7184/api/v1/Smjer', {
        type: 'POST',  // http method
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(smjer),  // data to submit
        success: function (smjer, status, xhr) {
            console.log(podaci);
            podaci.push(smjer);
            $('#podaci').append('<li>' + $('#naziv').val() + 
            ' <a class="brisi" href="#" id="s_' + smjer.sifra + '">X</a>' + 
            ' <a class="promjena" href="#" id="p_' + smjer.sifra + '">P</a>' + 
            '</li>');
            definirajDogadaje();
        },
        error: function (e) {
                //alert(errorMessage);
                //console.log(e.responseJSON.errors);
                const greske = e.responseJSON.errors;
                let poruka='';
                for(svojstvo in greske){
                    //console.log(varijabla);
                    //console.log(`${g[varijabla]}`);
                    poruka += `${greske[svojstvo]}` + '\n';
                }
                alert(poruka);

        }
    });

    return false;
});



$('#promjeni').click(function(){

    if(trenutniSmjer==0){
        alert('Prvo odaberite smjer za promjenu');
        return;
    }


    const trajanje = $('#trajanje').val();
    if(trajanje.trim().length==0){
        trajanje=0;
    }

    const cijena = $('#cijena').val();
    if(cijena.trim().length==0){
        cijena=0;
    }

    const upisnina = $('#upisnina').val();
    if(upisnina.trim().length==0){
        upisnina=0;
    }

    const verificiran = $('#verificiran').is(":checked")

    const smjer = { 
        naziv: $('#naziv').val(), 
        trajanje: trajanje,
        cijena:  cijena,
        upisnina: upisnina,
        verificiran: verificiran};

    $.ajax('https://localhost:7184/api/v1/Smjer/' + trenutniSmjer, {
        type: 'PUT',  // http method
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(smjer),  // data to submit
        success: function (smjer, status, xhr) {
           // trebalo bi podvaliti na postojeći zapis.
           ucitajPodatke();
        },
        error: function (e) {
                //alert(errorMessage);
                //console.log(e.responseJSON.errors);
                const greske = e.responseJSON.errors;
                let poruka='';
                for(svojstvo in greske){
                    //console.log(varijabla);
                    //console.log(`${g[varijabla]}`);
                    poruka += `${greske[svojstvo]}` + '\n';
                }
                alert(poruka);

        }
    });

    return false;
});
