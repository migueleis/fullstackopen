import axios from 'axios';
const BASE_URL = 'http://localhost:3001/persons';

export const getAll = async () => {
    const request = axios.get(BASE_URL);
    const response = await request;
    return response.data;
}

export const create = async (newObject) => {
    const request = axios.post(BASE_URL, newObject);
    const response = await request;
    return response.data;
}

export const remove = async (removedObject) => {
    const url = BASE_URL + '/' + removedObject.id;
    console.log(url);
    const request = axios.delete(url, removedObject);
    const response = await request;
    return response.data;
}

export const update = async (updatedObject) => {
    const url = BASE_URL + '/' + updatedObject.id;
    const request = axios.put(url, updatedObject);
    const response = await request;
    return response.data;
}
