import axios from "axios";

export const getProducts = async () => {
    try {
        const response = await axios.get('http://localhost:3000/products');
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
};


export const getCartItems = async () => {
    try {
        const response = await axios.get('http://localhost:3000/cart');
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
};
