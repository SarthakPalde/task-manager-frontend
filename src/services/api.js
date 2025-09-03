import axios from 'axios';
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const getTasks = () => axios.get(`${BASE_URL}/tasks`);
export const addTask = (task) => axios.post(`${BASE_URL}/tasks`, task);
export const editTask = (id, task) => axios.put(`${BASE_URL}/tasks/${id}`, task);
export const deleteTask = (id) => axios.delete(`${BASE_URL}/tasks/${id}`);
