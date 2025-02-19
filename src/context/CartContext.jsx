import React, { createContext, useEffect, useState } from 'react';
import { getCartItems } from '../helpers/getRequests';
import { addToCart } from '../helpers/postRequests';
import { removeFromCart } from '../helpers/deleteRequests';

export const CartContext = createContext();

export default function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const products = await getCartItems();
            if (products) {
                setCartItems(products);
            }
        };
        fetchProducts();
    }, []);

    const handleCart = async (product, action) => {
        if (action === 'add') {
            const addedProduct = await addToCart(product);
            if (addedProduct) {
                setCartItems((prevItems) => [...prevItems, addedProduct]);
            }
        } else if (action === 'remove') {
            const isRemoved = await removeFromCart(product.id);
            if (isRemoved) {
                setCartItems((prevItems) => prevItems.filter((item) => item.id !== product.id));
            }
        }
    };

    return (
        <CartContext.Provider value={{ cartItems, handleCart }}>
            {children}
        </CartContext.Provider>
    );
}
