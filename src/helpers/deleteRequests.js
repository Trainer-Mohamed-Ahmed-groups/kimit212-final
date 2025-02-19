import axios from "axios";

export const removeFromCart = async (id) => {
    try {
        await axios.delete(`http://localhost:3000/cart/${id}`);
        return true;
    } catch (error) {
        console.error('Error removing item from cart:', error);
        return false;
    }
};
