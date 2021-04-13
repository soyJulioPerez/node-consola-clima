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
      const lugarSeleccionado = lugares.find(lugar => lugar.id === id);

      // Clima

      // Mostrar resultados
      console.log('\n\nInformación de la ciudad\n'.green);
      console.log('Ciudad:', lugarSeleccionado.nombre);
      console.log('Lat:', lugarSeleccionado.lat);
      console.log('Lng:', lugarSeleccionado.lng);
      console.log('Temperatura:');
      console.log('Mínima:');
      console.log('Máxima:');
    }

    await pausa();

  } while (opt > 0);


}

main();