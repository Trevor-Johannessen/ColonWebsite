import axios from 'axios'
const api = axios.create({
    baseURL: 'http://localhost:4000/api',
})

export const postText = (text) => api.post(`/parser`, {'code': text}); // submit text

const apis = {
    postText
}

export default apis