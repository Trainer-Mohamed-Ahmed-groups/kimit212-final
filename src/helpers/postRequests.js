import axios from "axios";

export const addToCart = async (item) => {
    try {
        const response = await axios.post('http://localhost:3000/cart', item, {
            headers: { 'Content-Type': 'application/json' }
        });
        return response.data;
    } catch (error) {
        console.error('Error adding item to cart:', error);
        return null;
    }
};
