import React from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CategoryService } from '../services/categoryService';
import { ProductService } from '../services/productService';
import { storage } from '../firebase/index';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'; // Import the necessary Firebase storage functions

export default function ProductAddAdmin() {
    const [categoryId, setCategoryId] = useState(0);
    const [description, setDescription] = useState("");
 
    const [imageFile, setImageFile] = useState(null);
    const [price, setPrice] = useState(0);
    const [name, setName] = useState("");    
    const history = useHistory();

  //FireBase İçin 
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (image) {
      const storageRef = ref(storage, `images/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        'state_changed',
        snapshot => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        error => {
          console.log(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(storageRef);
          console.log('Image URL:', downloadURL);

          // Now you can use the downloadURL if needed
          setImageURL(downloadURL); // Set the image URL state
        }
      );
    }
  };

  const handleDeleteImage = () => {
    setImage(null); // Clear the selected image
    setImageURL(""); // Clear the image URL
    setProgress(0); // Reset the progress
  };




  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      if (!imageURL) {
        console.log("Image is not uploaded yet");
        return;
      }
  
      let productService = new ProductService();
  
      const result = await productService.addProduct({
        categoryId,
        description,
        imageURL,
        price,
        name
      });
      console.log(result);
      window.location.reload();
      alert('Ürün Eklendi');
    } catch (error) {
      console.log(error);
    }
  };

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
            <label htmlFor="imageFile" style={{ marginBottom: '5px', display: 'block' }}>Image</label>

            <progress value={progress} max="100" />
            <br />
            <br />
            
            <input type="file" onChange={handleChange} />
            <button className="btn btn-primary" onClick={handleUpload}>Upload</button>
            <button className="btn btn-secondary" onClick={handleDeleteImage}>Delete</button>
            
            <br />
            {imageURL ? (
              <div>
                <img style={{ width: '100px', height: '100px' }} src={imageURL} alt="firebase-image" />
                <br />
              </div>
            ) : null}
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
