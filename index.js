require('dotenv').config();


const {leerInput, inquirerMenu, pausa, listarLugares} = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');


const main = async()=>{

    const busquedas = new Busquedas();

    let opt;


    do {
        opt = await inquirerMenu();
        switch (opt) {
            case 1:
            // Mostrar mensaje
            const termino = await leerInput('Ciudad: ');

            // Buscar los lugares
            const lugares = await busquedas.ciudad(termino);

            // Seleccionar el lugar
            const id = await listarLugares(lugares);

            if( id === '0' ) continue;


            const lugarSel = lugares.find(l =>l.id === id);

            const {nombre, lng, lat} = lugarSel;

            // Guardar en BD
            busquedas.agregarHistorial( nombre );
            //console.log(lugarSel);

            // Datos del clima
            const clima = await busquedas.climaLugar( lat, lng )//
            //destructuración del clima
            const {desc, min, max, temp} = clima;

            // Mostrar resuñtados
            console.clear()
            console.log('\n Información de la ciudad \n'.green);
            console.log('Ciudad: ', nombre.green);
            console.log('Lat: ', lat);
            console.log('Lng: ', lng);
            console.log('Temperatura: ', temp);
            console.log('Mínima: ', min);
            console.log('Máxima: ', max);
            console.log('Como está el clima: ', desc.green);
                break;
            case 2:
            //
            busquedas.historialCapitalizado.forEach( (lugar, i) => {
            //busquedas.historial.forEach( (lugar, i) => {
                const idx = `${i+1}.`.green;
                console.log(`${idx} ${lugar}`);
            });
                break;
            default:

        }
        console.log({opt});

        if (opt !== 0) await pausa();
    } while (opt !== 0);
}

main();
