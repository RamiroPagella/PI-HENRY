import axios from 'axios';

async function getCountryByIdFromServer(id) {
    try {
        const { data } = await axios(`http://localhost:3001/countries/${id.slice(1)}`);
        return data;
    } catch (error) {
        console.log("Error al obtener la informacion del pais", error.message);
    }
}

export default getCountryByIdFromServer;