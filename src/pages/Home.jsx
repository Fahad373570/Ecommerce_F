import { useState, useEffect } from "react";
import api from "../api/axios";
import { Link } from "react-router";

export default function Home() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");

    const loadProducts = async () => {
        const res = await api.get(`/products?search=${search}&category=${category}`);
        setProducts(res.data);
    };

    useEffect(() => {
        loadProducts();
    }, [search, category]);

    const addToCart = async (productId) => {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            alert("Please log in to add items to your cart");
            return;
        }
        try {
            const res = await api.post(`/cart/add`,{userId, productId});
            const total = res.data.cart.items.reduce(
                (sum, item) => sum + item.quantity, 0
            );
            localStorage.setItem("cartCount", total);
            window.dispatchEvent(new Event("cartUpdated"));
            alert("Product added to cart!");
        } catch (err) {
            alert(err.response?.data?.message || "Error adding to cart");
        }
    };

    return (
        <div className="p-6">
            <div className="mb-4 flex gap-3">
                <input
                    placeholder="Search Products.."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border px-3 py-2 rounded w-1/2"
                />
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="border px-3 py-2 rounded">
                    <option value="">All Categories</option>
                    <option value="Electronic">Electronics</option>
                    <option value="Mobile">Mobiles</option>
                    <option value="Tablet">Tablets</option>
                </select>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {products.map((product) => (
                    <div key={product._id} className="border p-3 rounded shadow">
                        <Link to={`/product/${product._id}`}>
                            <img src={product.image} className="w-full h-40 object-contain" />
                            <h2 className="mt-2 font-semibold">{product.title}</h2>
                            <p>${product.price}</p>
                        </Link>
                        <button
                            onClick={() => addToCart(product._id)}
                            className="mt-2 w-full bg-blue-500 text-white px-3 py-2 rounded">
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}