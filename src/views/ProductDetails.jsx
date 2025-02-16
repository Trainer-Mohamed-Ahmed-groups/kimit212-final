import { useState, useEffect } from "react";
import axios from "axios";
import { StarFilled, StarOutlined, LoadingOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Spin } from "antd";

const FeaturedProducts = () => {
    const [products, setProducts] = useState([]);

    const [visibleCount, setVisibleCount] = useState(4);
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        // fetch('https://fakestoreapi.com/products')
        // .then(res => res.json())
        // .then(res=> setProducts(res))

        axios.get("https://fakestoreapi.com/products")
            .then(response => setProducts(response.data))
            .catch(error => console.error("Error fetching products:", error));
    }, []);

    const handleShowMore = () => {
        setLoading(true);
        setTimeout(() => {
            setVisibleCount(prevCount => prevCount + 4);
            setLoading(false);
        }, 1000);
    };

    return (
        <section className="container mx-auto mt-20 p-4">
            <h2 className="text-2xl font-bold text-center mb-6">{t("featured_products")}</h2>
            {
                products.length > 0
                    ?
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.slice(0, visibleCount).map((product) => (
                            <div key={product.id} className="bg-white shadow-lg rounded-lg p-4 text-center">
                                <img src={product.image} alt={product.title} className="w-full h-40 rounded-md" />
                                <h3 className="text-sky-800 text-lg font-semibold mt-2 truncate  whitespace-nowrap">{product.title}</h3>
                                <div className="flex items-center mt-1 text-yellow-500">
                                    {[...Array(Math.round(product.rating?.rate || 0))].map((_, index) => (
                                        <StarFilled key={index} />
                                    ))}
                                    {[...Array(5 - Math.round(product.rating?.rate || 0))].map((_, index) => (
                                        <StarOutlined key={index} className="text-gray-400" />
                                    ))}
                                </div>
                                <p className="text-lg font-bold text-blue-600 my-2 text-start">${product.price}</p>
                                <Link
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2 hover:bg-blue-700 "
                                    to={`/products/${product.id}`}
                                >
                                    {t("view_details")}
                                </Link>
                            </div>
                        ))}
                    </div>
                    : <Spin indicator={<LoadingOutlined spin />} size="large" />

            }

            {visibleCount < products.length && (
                <div className="text-center mt-6">
                    <button
                        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                        onClick={handleShowMore}
                        disabled={loading}
                    >
                        {loading ? `${t('loading')}` : t('show_more')}
                    </button>
                </div>
            )}
        </section>
    );
};

export default FeaturedProducts;
