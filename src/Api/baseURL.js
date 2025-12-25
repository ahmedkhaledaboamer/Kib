import axios from 'axios'


const baseUrl = axios.create({ baseURL: "https://shazmlc.cloud/webhook/" })

export default baseUrl