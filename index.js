const { inquirerMenu, pausa, leerInput } = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');

const main = async() => {
  const busquedas = new Busquedas();
  let opt;

  do {
    opt = await inquirerMenu();

    if (opt === 1) {
      // Mostrar mensaje
      const lugar = await leerInput('Ciudad:');
      console.log('🚀 ~ main ~ lugar', lugar);

      // Buscar los lugares

      // Seleccionar el lugar

      // Clima

      // Mostrar resultados
      console.log('\nInformación de la ciudad\n'.green);
      console.log('Ciudad:');
      console.log('Lat:');
      console.log('Lng:');
      console.log('Temperatura:');
      console.log('Mínima:');
      console.log('Máxima:');
    }

    await pausa();

  } while (opt > 0);


}

main();