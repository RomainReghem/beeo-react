import axios from 'axios'
// const BASE_URL = 'http://127.0.0.1:3000/api';
const BASE_URL = 'https://beeo.herokuapp.com/api';

export default axios.create({
    baseURL : BASE_URL
});