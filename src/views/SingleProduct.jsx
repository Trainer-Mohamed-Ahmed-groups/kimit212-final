import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import { CartContext } from "../context/CartContext";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();
    const { cartItems, handleCart } = useContext(CartContext);

    // Check if the product is in the cart
    const isInCart = cartItems.some(item => item.id === parseInt(id));

    useEffect(() => {
        axios.get(`https://fakestoreapi.com/products/${id}`)
            .then(response => {
                setProduct(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching product details:", error);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div className="text-center mt-20 text-xl">
            <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
        </div>;
    }

    if (!product) {
        return <div className="text-center mt-20 text-xl text-red-500">{t("product_not_found")}</div>;
    }

    return (
        <section className="container mx-auto mt-20 p-4">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <img src={product.image} alt={product.title} className="w-full h-80 object-contain rounded-md" />
                <h1 className="text-2xl font-bold mt-4">{product.title}</h1>
                <div className="flex items-center mt-2 text-yellow-500">
                    {[...Array(Math.round(product.rating?.rate || 0))].map((_, index) => (
                        <StarFilled key={index} />
                    ))}
                    {[...Array(5 - Math.round(product.rating?.rate || 0))].map((_, index) => (
                        <StarOutlined key={index} className="text-gray-400" />
                    ))}
                    <span className="ml-2 text-gray-600">({product.rating?.count} {t("reviews")})</span>
                </div>
                <p className="text-xl font-bold text-blue-600 mt-2">${product.price}</p>
                <p className="mt-4 text-gray-700">{product.description}</p>

                {/* Change button based on cart status */}
                <button
                    className={`mt-6 px-6 py-2 rounded-lg w-full transition ${isInCart ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700"
                        } text-white`}
                    onClick={() => !isInCart && handleCart(product, "add")}
                    disabled={isInCart}
                >
                    {isInCart ? t("added_to_cart") : t("add_to_cart")}
                </button>
            </div>
        </section>
    );
};

export default ProductDetails;
