import axios from 'axios';

const API = axios.create({
  baseURL: 'https://restful-api.dev/',
});

export const fetchEmployeeList = () => API.get('/'); // Adjust endpoint if needed
