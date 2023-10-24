"use client"
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditProduct({ productId }) {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  // Function to fetch product data by ID
  const fetchProductData = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/products/2`);
      if (response.ok) {
        const productData = await response.json();
        setFormData(productData);
        setLoading(false);
      } else {
        console.error("Failed to fetch product data");
        toast.error("Failed to fetch product data");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to fetch product data");
    }
  };

  // Update product information
  const handleUpdateProduct = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/products/${productId}`, {
        method: "PUT",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("Product updated successfully");
        toast.success("Product updated successfully");
      } else {
        console.error("Failed to update product");
        toast.error("Failed to update product");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to update product");
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Edit Product
          </h2>
          <form onSubmit={handleUpdateProduct}>
            {/* Render input fields with existing product data */}
            {/* You can reuse the same structure as in your CreateProduct component */}
            {/* Example: */}
            <div className="sm:col-span-2">
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Product Name
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type product name"
                required=""
              />
            </div>
            {/* Render other input fields for product attributes */}
            {/* ... */}
            <button
              type="submit"
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            >
              Update Product
            </button>
          </form>
        </div>
      </section>
      <ToastContainer autoClose={3000} />
    </>
  );
}
