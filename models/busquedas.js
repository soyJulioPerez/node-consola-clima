const fs = require('fs');
const axios = require('axios');

class Busquedas {
  historial = [];
  dbPath = './db/historial.json';

  get paramsMapBox() {
    return {
      access_token: process.env.MAPBOX_KEY,
      limit: 5,
      language: 'es'
    };
  }

  get paramsOpenWeather() {
    return {
      appid: process.env.OPENWEATHER_KEY,
      units: 'metric'
    };
  }

  // TODO: capitalizar historial
  get historialCapitalizado() {

  }

  constructor() {
    this.leerDB();
  }

  async buscarLugar(lugar = '') {
    try {
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
        params: this.paramsMapBox
      });
      const resp = await instance.get();
      return resp.data.features.map( lugar => ({
          id: lugar.id,
          nombre: lugar.place_name,
          lng: lugar.center[0],
          lat: lugar.center[1]
        })
      );

    } catch (error) {
      return [];
    }
  }

  async obtenerClimaDeLugar( lat, lon)  {
    try {
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: { ...this.paramsOpenWeather, lat, lon }
      });
      const resp = await instance.get();
      const { weather, main } = resp.data;
      return {
        descripcion: weather[0].description,
        temp: main.temp,
        feels_like: main.feels_like,
        temp_min: main.temp_min,
        temp_max: main.temp_max,
      };
    } catch (error) {
      console.log(error);

    }
  }

  agregarHistorial(lugar='') {
    if (this.historial.includes(lugar.toLocaleLowerCase()))  { return; }

    this.historial.unshift(lugar.toLocaleLowerCase());
  }

  guardarDB() {
    const payload = {
      historial: this.historial
    }
    fs.writeFileSync(this.dbPath, JSON.stringify(payload));

  }

  leerDB() {
    if (!fs.existsSync(this.dbPath))  { return null; }
    const historialData = fs.readFileSync(this.dbPath, {encoding: 'utf-8'});
    this.historial = JSON.parse(historialData).historial;
    this.historial = this.historial.splice(0, 5);
  }

}

module.exports = Busquedas;