import axios from "axios";

const api = axios.create({
    baseURL: 'https://portugaljobs.diogomarques.dev/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;