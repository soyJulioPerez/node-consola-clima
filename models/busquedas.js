const axios = require('axios');

class Busquedas {
  historial = ['Caracas', 'Madrid', 'Buenos Aires'];

  get paramsMapBox() {
    return {
      access_token: process.env.MAPBOX_KEY,
      limit: 5,
      language: 'es'
    };
  }

  constructor() {
    // TODO: leer BD si existe
  }

  async buscarLugar(lugar = '') {
    try {
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
        params: this.paramsMapBox
      });
      const resp = await instance.get();
      console.log('🚀 ~ buscarCiudad ~ resp', resp.data);
      return [];
      // TODO: retornar las ciudades encontradas
    } catch (error) {
      throw error;
      return [];
    }





  }
}

module.exports = Busquedas;