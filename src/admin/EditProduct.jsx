// import { useState,useEffect } from "react";
// import api from "../api/axios";
// import { useNavigate, useParams } from "react-router";

// export default function EditProduct() {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [form, setForm] = useState({
//         title: "",
//         description: "",
//         category: "",
//         price: "",
//         image: "",
//         stock: "",
//     });
//     const allowFields = ["title", "description", "category", "price", "image", "stock"];

//     const loadProduct = async () => {
//         const res = await api.get(`/products`);
//         const product = res.data.find((p) => p.id === id=== parseInt(id));
//         setForm(product);
//     }


//     useEffect(() =>{
//         loadProduct();
//     },[]);


//     const handleChange = (e) => {
//         setForm({
//             ...form,
//             [e.target.name]: e.target.value,
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         await api.put(`/products/update/${id}`, form);
//         alert("Product updated successfully");
//         navigate("/admin/products");
//     };

//     return (
//         <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow rounded" >
//             <h2 className="text-2xl font-bold mb-6">Edit Product</h2>
//             <form onSubmit={handleSubmit} className="space-y-3">
//                 {allowFields.map((key)=> (
//                     allowFields.includes(key) &&
//                         <input
//                             key={key}
//                             name={key}
//                             value={form[key]}
//                             onChange={handleChange}
//                             placeholder={key}
//                             className="border border-gray-300 p-2 rounded w-full"
//                         />
//                 ))};
//                 <button type="submit" className=" w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
//                     Update Product
//                 </button>
//             </form>
//         </div>
//     );
// };


import { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate, useParams } from "react-router";

export default function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: "",
        description: "",
        category: "",
        price: "",
        image: "",
        stock: "",
    });

    const allowFields = ["title", "description", "category", "price", "image", "stock"];

    const loadProduct = async () => {
        try {
            const res = await api.get("/products");
            const product = res.data.find((p) => p._id === id);
            if (product) {
                setForm({
                    title: product.title || "",
                    description: product.description || "",
                    category: product.category || "",
                    price: product.price || "",
                    image: product.image || "",
                    stock: product.stock || "",
                });
            }
        } catch (err) {
            console.error("Error loading product:", err);
        }
    };

    useEffect(() => {
        loadProduct();
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/products/update/${id}`, form);
            alert("Product updated successfully");
            navigate("/admin/products");
        } catch (err) {
            console.error("Error updating product:", err);
            alert("Failed to update product.");
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow rounded">
            <h2 className="text-2xl font-bold mb-6">Edit Product</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
                {allowFields.map((key) => (
                    <input
                        key={key}
                        name={key}
                        value={form[key]}
                        onChange={handleChange}
                        placeholder={key}
                        className="border border-gray-300 p-2 rounded w-full"
                    />
                ))}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Update Product
                </button>
            </form>
        </div>
    );
}