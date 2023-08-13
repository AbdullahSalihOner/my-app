import React from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CategoryService } from '../services/categoryService';
import { ProductService } from '../services/productService';

export default function ProductAddAdmin() {
    const [categoryId, setCategoryId] = useState(0);
    const [description, setDescription] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [price, setPrice] = useState(0);
    const [name, setName] = useState("");    
    const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
        let productService = new ProductService();
        const result = await productService.addProduct({
            categoryId,
            description,
            imageURL,
            price,
            name
        }); // Kısa yol
        window.location.reload();
        alert("Ürün Eklendi");
       
    }
    catch (error) {
        console.log(error);
    }
   
  }
  return (
    

    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{
        width: '300px',
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        padding: '20px',
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Add Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" style={{ marginBottom: '5px', display: 'block' }}>Product Name</label>
            <input
            
              type="name"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                border: '1px solid #ccc',
                borderRadius: '5px',
                padding: '10px',
                width: '100%',
              }}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" style={{ marginBottom: '5px', display: 'block' }}>Description</label>
            <input
              type="description"
              className="form-control"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{
                border: '1px solid #ccc',
                borderRadius: '5px',
                padding: '10px',
                width: '100%',
              }}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="imageUrl" style={{ marginBottom: '5px', display: 'block' }}>Image</label>
            <input
              type="text"
              className="form-control"
              id="imageUrl"
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
              style={{
                border: '1px solid #ccc',
                borderRadius: '5px',
                padding: '10px',
                width: '100%',
              }}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="price" style={{ marginBottom: '5px', display: 'block' }}>Price</label>
            <input
              type="text"
              className="form-control"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              style={{
                border: '1px solid #ccc',
                borderRadius: '5px',
                padding: '10px',
                width: '100%',
              }}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="categoryId" style={{ marginBottom: '5px', display: 'block' }}>Category Id</label>
            <input
              type="text"
              className="form-control"
              id="categoryId"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              style={{
                border: '1px solid #ccc',
                borderRadius: '5px',
                padding: '10px',
                width: '100%',
              }}
              required
            />
          </div>
    
          <div style={{ textAlign: 'center' }}>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Ekle</button>
          </div>
        </form>
      </div>
    </div>
  )
}
