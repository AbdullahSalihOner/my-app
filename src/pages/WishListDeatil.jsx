import React, { useEffect } from "react";
import WishListService from "../services/wishListService";
import { useState } from "react";
import CartService from "../services/cartService";
import { ProductService } from "../services/productService";

export default function WishListDeatil({ item, onRemove, onAddToCart }) {
  const token = localStorage.getItem("token");
  const [items, setItems] = useState([]);
  const [products, setProducts] = useState([]);

  const getWishList = async () => {
    let wishListService = new WishListService();
    await wishListService
      .getWishList(token)
      .then((result) => setItems(result.data));
  };

  console.log(items);

  useEffect(() => {
    getWishList();
  }, []);

  const removeProduct = async (wishListId) => {
    const updatedWishList = items.filter(
      (items) => items.id !== wishListId
    );
    let wishListService = new WishListService();
    await wishListService
      .deleteWishList(wishListId, token)
      .then((result) => setItems(updatedWishList));
  };

  const addProductToCart = async (items) => {
      
    let cartService = new CartService();
    await cartService
      .addToCart(token,items)
      .then((result) =>console.log(result) );
  };
      

  console.log(items);

  return (
    
    <div className="card mb-3">
       <h1>Wish List</h1>
      {items?.map((items) => (
        <div>
          <img
            src={items.imageURL}
            className="card-img-top"
            alt={items.name}
            style={{ width: "300px" }}
          />
          <div className="card-body">
            <h5 className="card-title">{items.name}</h5>
            <p className="card-text">${items.price}</p>
            <p className="card-text">{items.description}</p>
            <button
              className="btn btn-danger mr-2"
              onClick={() => removeProduct(items.id)}
              
            >
              Sil
            </button>
            <button
              className="btn btn-success"
              onClick={() => addProductToCart(items)}
            >
              Sepete Ekle
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
