import axios from 'axios';

const BASE_URL = 'http://localhost:3001/api/notes';

export const getAll = async () => {
    const request = axios.get(BASE_URL);
    const response = await request;
    return response.data;
}