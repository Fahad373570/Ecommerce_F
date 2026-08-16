import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router";

export default function Cart() {
    const userId = localStorage.getItem("userId");
    const [cart, setCart] = useState(null);
    const navigate = useNavigate();

    const loadCart = async () => {
        if (!userId) return;
        const res = await api.get(`/cart/${userId}`);
        setCart(res.data);
    };
    useEffect(() => {
        loadCart();
    }, []);
    const removeItem = async (productId) => {
        await api.post(`/cart/remove`, { userId, productId });
        loadCart();
        window.dispatchEvent(new Event("cartUpdated"));
    };
    const updateQty = async (productId, quantity) => {
        if (quantity === 0) {
            await removeItem(productId);
            return;
        }
        await api.post(`/cart/update`, { userId, productId, quantity });
        loadCart();
        window.dispatchEvent(new Event("cartUpdated"));
    };
    if (!cart) return <div className="p-6">Loading...</div>;
    if (!cart.items || cart.items.length === 0) return <div className="p-6">Your cart is empty</div>;
    const total = cart.items.reduce(
        (sum, item) => sum + item.productId.price * item.quantity, 0
    );

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
            <div className="space-y-4">
                {cart.items.map((item) => (
                    <div key={item.productId._id} className="flex items-center justify-between p-4 border rounded">
                        <div className="flex items-center gap-4">
                            <img
                                src={item.productId.image}
                                alt={item.productId.title}
                                className="w-16 h-16 object-cover rounded"
                            />
                            <div>
                                <h2 className="text-lg font-semibold">{item.productId.title}</h2>
                                <p className="text-gray-600">${item.productId.price.toFixed(2)}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => updateQty(item.productId._id, item.quantity - 1)}
                                className="px-2 py-1 bg-gray-200 rounded">
                                -
                            </button>
                            <span>{item.quantity}</span>
                            <button
                                onClick={() => updateQty(item.productId._id, item.quantity + 1)}
                                className="px-2 py-1 bg-gray-200 rounded">
                                +
                            </button>
                        </div>
                        <p className="font-semibold">
                            ${(item.productId.price * item.quantity).toFixed(2)}
                        </p>
                        <button
                            onClick={() => removeItem(item.productId._id)}
                            className="text-red-500">
                            Remove
                        </button>
                    </div>
                ))}
                <div className="text-right mt-4">
                    <h2 className="text-xl font-bold">Total: ${total.toFixed(2)}</h2>
                </div>
                <button onClick={() => navigate("/checkout/address")} className="w-full bg-blue-500 text-white py-2 rounded" >
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
}