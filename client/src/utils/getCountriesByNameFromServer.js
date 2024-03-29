import axios from 'axios';
//


const getCountriesByNameFromServer = async (name) => {
    try {
        const { data } = await axios(`http://localhost:3001/countries/query?name=${name}`);
        return data;
    } catch (error) {
        return [];
    }
}

export default getCountriesByNameFromServer;