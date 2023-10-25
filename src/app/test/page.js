"use client";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CreateProduct() {
  const initialValues = {
    title: "",
    code: "",
    price: "",
    category: "",
    brand: "",
    quantityInStock: "",
    sold: "",
    thumbnail: "",
    description: "",
    gallery: [],
    tag: [],
  };
  const [formData, setFormData] = useState(initialValues);
  const [image, setImage] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/v1/products", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Handle successful response, e.g., show a success message or redirect to another page.
        console.log("Product created successfully");
        toast.success("Product created successfully");
        setFormData(initialValues);
        console.log(formData);
      } else {
        // Handle error response, e.g., show an error message.
        console.error("Failed to create product");
        toast.error("Failed to create product");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to create product");
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;

    // Special handling for lists (gallery and tag)
    if (id === "gallery" || id === "tag") {
      const listValue = value.split(","); // Assuming values are comma-separated
      setFormData({
        ...formData,
        [id]: listValue,
      });
    } else {
      setFormData({
        ...formData,
        [id]: value,
      });
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
  
    // Check if a file was selected
    if (file) {
      const data = new FormData();
      data.append("file", file); // Use the 'file' variable instead of 'image'
      data.append("upload_preset", "afwvbunc");
      data.append("cloud_name", "dliuda5ni");
      data.append("folder", "Cloudinary-React");
  
      try {
        // Upload the file to Cloudinary
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/dliuda5ni/image/upload`,
          {
            method: "POST",
            body: data,
          }
        );
        const res = await response.json();
        const imageUrl = res.secure_url;
        setFormData({ ...formData, thumbnail: imageUrl });
        console.log("Image uploaded successfully:", imageUrl);
  
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  
  // const handleImageUpload = async (e) => {
  //   const file = e.target.files[0];

  //   // Check if a file was selected
  //   if (file) {
  //     setImage(file);
  //     const data = new FormData();
  //     data.append("file", image);
  //     data.append("upload_preset", "afwvbunc");
  //     data.append("cloud_name", "dliuda5ni");
  //     data.append("folder", "Cloudinary-React");

  //     try {
  //       // Upload the file to Cloudinary
  //     const response = await fetch(
  //       `https://api.cloudinary.com/v1_1/dliuda5ni/image/upload`,
  //       {
  //         method: "POST",
  //         body: data,
  //       }
  //     );
  //     const res = await response.json();
  //     const imageUrl = res.secure_url;
  //     setFormData({ ...formData, thumbnail: imageUrl });
  //     console.log("Image uploaded successfully:", imageUrl);

  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   }
  // };

  return (
    <>
      <section class="bg-white dark:bg-gray-900">
        <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Add a new product
          </h2>
          <form onSubmit={handleSubmit}>
            <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div class="sm:col-span-2">
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={handleChange}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type product name"
                  required=""
                />
              </div>
              <div class="w-full">
                <label
                  for="quantityInStock"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  QuantityInStock
                </label>
                <input
                  type="text"
                  name="quantityInStock"
                  id="quantityInStock"
                  onChange={handleChange}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Quantity in Stock"
                  required=""
                />
              </div>
              <div class="w-full">
                <label
                  for="price"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  value={formData.price}
                  onChange={handleChange}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="$2999"
                  required=""
                />
              </div>
              <div>
                <label
                  for="category"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Category
                </label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={handleChange}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option selected="">Select category</option>
                  <option value="TV">TV/Monitors</option>
                  <option value="PC">PC</option>
                  <option value="GA">Gaming/Console</option>
                  <option value="PH">Phones</option>
                </select>
              </div>
              <div>
                <label
                  for="brand"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Brand
                </label>
                <select
                  id="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option selected="">Select Brand</option>
                  <option value="TV">TV/Monitors</option>
                  <option value="PC">PC</option>
                  <option value="GA">Gaming/Console</option>
                  <option value="PH">Phones</option>
                </select>
              </div>
              <div class="w-full">
                <label
                  for="thumbnail"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Thumbnail
                </label>
                <input
                  type="file"
                  id="thumbnail"
                  accept="image/*"
                  onChange={handleImageUpload}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div class="sm:col-span-2">
                <label
                  for="description"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  onChange={handleChange}
                  value={formData.description}
                  rows="8"
                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Your description here"
                ></textarea>
              </div>
            </div>
            <button
              type="submit"
              class="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            >
              Add product
            </button>
          </form>
        </div>
      </section>
      <ToastContainer autoClose={3000} />
    </>
  );
}
