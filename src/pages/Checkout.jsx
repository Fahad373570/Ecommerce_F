import { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router";

export default function Checkout() {
    const userId = localStorage.getItem("userId");
    const [address, setAddress] = useState([]);
    const [selectAddress, setSelectAddress] = useState(null);
    const [cart, setCart] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!userId) {
            navigate("/login");
            return;
        }
        api.get(`/cart/${userId}`).then((res) => setCart(res.data));
        api.get(`/address/${userId}`).then((res) => {
            setAddress(res.data || []);
            if (res.data && res.data.length > 0) {
                setSelectAddress(res.data[0]);
            }
        });
    }, []);

    if (!cart || !cart.items) return <div className="p-6">Loading...</div>;

    const total = cart.items.reduce(
        (sum, item) => sum + item.productId.price * item.quantity, 0
    );

    const placeOrder = async () => {
        if (!selectAddress) {
            alert("Please select an address");
            return;
        }
        try {
            await api.post("/order/place", {
                userId,
                address: selectAddress,
            });
            alert("Order placed successfully!");
            navigate("/");
        } catch (err) {
            alert(err.response?.data?.message || "Error placing order");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Checkout</h1>
            <h2 className="font-semibold mb-2">Select Address</h2>
            {address.length === 0 ? (
                <p className="text-gray-500 mb-4">No address saved yet.</p>
            ) : (
                address.map((addr) => (
                    <label key={addr._id} className="block border p-3 rounded cursor-pointer mb-2">
                        <input
                            type="radio"
                            name="address"
                            checked={selectAddress?._id === addr._id}
                            onChange={() => setSelectAddress(addr)}
                            className="mr-2"
                        />
                        <strong>{addr.name}</strong>
                        <p className="text-sm">{addr.street}, {addr.city}, {addr.state} - {addr.zip}</p>
                        <p className="text-sm">{addr.phone}</p>
                    </label>
                ))
            )}
            <h2 className="font-semibold mb-2">Order Summary</h2>
            <p>Total Amount: ${total.toFixed(2)}</p>
            <button
                onClick={placeOrder}
                className="mt-4 w-full bg-green-500 text-white p-2 rounded">
                Place Order (COD)
            </button>
        </div>
    );
}