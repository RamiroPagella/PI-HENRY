import axios from 'axios';

async function getCountryByIdFromServer(id) {
    try {
        const { data } = await axios(`http://localhost:3001/countries/${id.slice(1)}`);
        
        // data.name = data.name.toUpperCase();
        // data.capital = data.capital.toUpperCase();
        // data.subregion = data.subregion.toUpperCase();
        // data.continent = data.continent.toUpperCase();

        return data;
    } catch (error) {
        console.log("Error al obtener la informacion del pais", error.message);
    }
}

export default getCountryByIdFromServer;