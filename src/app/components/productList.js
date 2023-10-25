"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import EditModal from "../components/EditProductModal";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0); // Current page
  const [pageSize] = useState(8); // Number of items per page
  const [minPrice, setMinPrice] = useState(0.0);
  const [maxPrice, setMaxPrice] = useState(99999999999.0);
  const [editProduct, setEditProduct] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    // Make an HTTP GET request to fetch product data from the API with pagination and price filtering
    fetch(
      `http://localhost:8080/api/v1/products/filterByPrice?minPrice=${minPrice}&maxPrice=${maxPrice}&page=${page}&size=${pageSize}`
    )
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching data: " + error));
  }, [page, minPrice, maxPrice, products]);

  const handleEditClick = (product) => {
    setEditProduct(product);
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };

  const handleSaveEdit = (updatedProduct) => {
    // Update the product in the list
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    setIsEditModalOpen(false);
  };

  const handleDeleteProduct = (id) => {
    // Send a DELETE request to delete the product
    fetch(`http://localhost:8080/api/v1/products/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 200) {
          // If the delete request was successful, remove the product from the list
          setProducts((prevProducts) =>
            prevProducts.filter((product) => product.id !== id)
          );
        }
      })
      .catch((error) => console.error("Error deleting product: " + error));
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <div className="p-4 sm:ml-64">
      {isEditModalOpen && (
        <EditModal
          product={editProduct}
          onSave={handleSaveEdit}
          onCancel={handleEditModalClose}
        />
      )}
      {/* <div>
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div> */}
        <div className="p-4 border-2 border-gray-200 border-solid rounded-lg dark:border-gray-700">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Brand
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Edit
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Delete
                  </th>
                </tr>
              </thead>{" "}
              <tbody>
                {products.map((product) => (
                  // Rendering product items
                  <tr
                    key={product.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover-bg-gray-600"
                  >
                    <td className="w-4 p-4">
                      <td className="px-6 py-4">{product.id}</td>
                    </td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {product.title}
                    </th>
                    <td className="px-6 py-4">{product.brand}</td>
                    <td className="px-6 py-4">{product.category}</td>
                    <td className="px-6 py-4">{`$${product.price}`}</td>
                    <td className="px-6 py-4">
                      <button
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        onClick={() => handleEditClick(product)}
                      >
                        Edit
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        // href={`/delete/${product.id}`} // You should provide the correct delete route
                        onClick={() => handleDeleteProduct(product.id)}
                        className="font-medium text-red-600 dark:text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 0}
            type="button"
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            Previous
          </button>

          <span className="mx-2">{page + 1}</span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={products.length < pageSize}
            type="button"
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductList;
