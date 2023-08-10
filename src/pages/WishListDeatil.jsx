import React, { useEffect } from 'react'
import WishListService from '../services/wishListService';
import { useState } from 'react';

export default function WishListDeatil({ item, onRemove, onAddToCart }) {

  const token = localStorage.getItem('token');
  const [items, setItems] = useState([]);

  const getWishList = async () => {
    let wishListService = new WishListService();
    await wishListService.getWishList(token).then((result) => setItems(result.data.wishListItems));
  };
  

  useEffect(() => {
    getWishList();
  }, []);




  return (
    <div className="card mb-3">
      <img src={items.imageURL} className="card-img-top" alt={items.name} />
      <div className="card-body">
        <h5 className="card-title">{items.name}</h5>
        <p className="card-text">${items.price}</p>
        <p className="card-text">{items.description}</p>
        <button className="btn btn-danger mr-2" onClick={() => onRemove(items.id)}>Sil</button>
        <button className="btn btn-success" onClick={() => onAddToCart(items)}>Sepete Ekle</button>
      </div>
    </div>
  )
}
