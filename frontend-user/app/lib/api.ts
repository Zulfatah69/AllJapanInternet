import axios from 'axios';

const api = axios.create({

    baseURL:
        process.env
            .NEXT_PUBLIC_API_URL,

});

export default api;
export async function getSimpleProducts() {

    const response =
        await api.get(
            '/simple-products'
        );

    return response.data;
}