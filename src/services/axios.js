import axios from "axios";

export const api = axios.create({
    baseURL: 'https://dhodonto.ctd.academy', headers: {
        Accept: 'application/json',
        "Content-Type": 'application/json'
    }
})