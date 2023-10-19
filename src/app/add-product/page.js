"use client"
import { useState } from 'react';


function ProductForm() {
    
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/v1/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Product added successfully.');
      } else {
        console.error('Failed to add the product.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="p-4 sm:ml-64">
    <div className="p-4 border-2 border-gray-200 border-solid rounded-lg dark:border-gray-700">
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </label>
      <br />
      <label>
        Price:
        <input type="number" name="price" value={formData.price} onChange={handleChange} />
      </label>
      <br />
      <label>
        Description:
        <textarea name="description" value={formData.description} onChange={handleChange} />
      </label>
      <br />
      <button type="submit">Add Product</button>
    </form>
    </div>
  </div>

  );
}

export default ProductForm;
