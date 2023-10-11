import axios from 'axios';

export default async function getAllActivitiesFromServer() {
    try {
        const { data } = await axios('http://localhost:3001/activities');
        return data;
    } catch (error) {
        throw new Error (error.message)
    }
}