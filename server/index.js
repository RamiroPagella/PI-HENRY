const axios = require("axios");
const server = require("./src/server");
const { conn } = require('./src/db.js');
const { Country, Activity } = require('./src/db')

const PORT = 3001;


//Extraer los paises de la api:
const fetchDataFromApi = async () => {
  try {
    const { data } = await axios('http://localhost:5000/countries');
    
    const countries =  data.map(country => ({
      id: country.cca3,
      name: country.name.common,
      flagImage: country.flags.png,
      flagEmoji: country.flag,
      continent: country.continents ? (country.continents.length ? country.continents[0] : 'Desconocido') : 'Desconocido',
      capital: country.capital ? country.capital[0] : "Desconocido",
      subregion: country.subregion ? country.subregion : "Desconocido",
      area: country.area,
      population: country.population
    })).sort((a, b) => a.name < b.name ? -1 : 1)
   
    return countries;

  } catch (error) {
    throw new Error(error.message);
  }
} 

//enviar los datos de la api a la base de datos
const sendDataToDB = async () => {
  try {
    const countries = await fetchDataFromApi();

    await Country.bulkCreate(countries);
  } catch (error) {
    console.log("Error al enviar los paises a la base de datos:", error.message);
  }
}

//////////////////////////

conn.sync({ force: true }).then(() => {
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  
  sendDataToDB();

})
}).catch(error => console.error(error));





