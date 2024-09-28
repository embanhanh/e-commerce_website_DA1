import axios from 'axios'

const API_URL = 'http://localhost:5000/product/'

export const createProduct = async (productData) => {
    try {
        const response = await axios.post(API_URL + 'create', productData)
        return response.data
    } catch (error) {
        throw error.response.data
    }
}