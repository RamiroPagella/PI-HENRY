import axios from 'axios';

//
async function getAllCountriesFromServer () {
  try {
    const { data } = await axios.get(`http://localhost:3001/countries`);
    
    return data

  } catch (error) {
    console.log("Error al enviar los datos al estado de redux", error.message);
  }
}
//


export default getAllCountriesFromServer;
