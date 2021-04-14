require('dotenv').config();

const { inquirerMenu, pausa, leerInput, listarOpciones } = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');

const main = async() => {
  const busquedas = new Busquedas();
  let opt;

  do {
    opt = await inquirerMenu();

    if (opt === 1) {
      // Mostrar mensaje
      const termino = await leerInput('Ciudad:');

      // Buscar los lugares
      console.log('\n\n');
      const lugares = await busquedas.buscarLugar(termino);

      // Seleccionar el lugar
      const id = await listarOpciones(lugares);
      if (id === '0') { continue };

      const lugarSeleccionado = lugares.find(lugar => lugar.id === id);

      // Guardar en BD
      busquedas.agregarHistorial(lugarSeleccionado.nombre);
      busquedas.guardarDB();

      // Clima
      const clima = await busquedas.obtenerClimaDeLugar(lugarSeleccionado.lat, lugarSeleccionado.lng);

      // Mostrar resultados
      console.log('\n\nInformación de la ciudad\n'.green);
      console.log('Ciudad:', lugarSeleccionado.nombre);
      console.log('Lat:', lugarSeleccionado.lat);
      console.log('Lng:', lugarSeleccionado.lng);
      console.log('Temperatura:', clima.temp, clima.descripcion);
      console.log('Mínima:', clima.temp_min);
      console.log('Máxima:', clima.temp_max);
    }

    if (opt === 2) {
      busquedas.historial.forEach( (lugar, i) => {
        const idx = `${i+1}.`.green
        console.log(`${idx} ${lugar}`)
      });
    }

    await pausa();

  } while (opt > 0);


}

main();