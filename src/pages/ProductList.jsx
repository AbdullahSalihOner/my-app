import React, { useEffect, useState } from "react";
import { Button, Icon, Image, Menu, Table } from "semantic-ui-react";
import { ProductService } from "../services/productService";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { Card } from "react-bootstrap";
import CartService from "../services/cartService";
import { Grid } from "semantic-ui-react";
import WishListService from "../services/wishListService";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");

  const addProductToCart = async (items) => {
      
    let cartService = new CartService();
    await cartService
      .addToCart(token,items)
      .then((result) =>console.log(result) );
  };
     
  const addProductToWishList = async (product) => {
     let wishListService = new WishListService();
     await wishListService
     .addWishList(product,token)
     .then((result)=> console.log(result));
  }
  
  useEffect(() => {
    let productService = new ProductService();
    productService.getProducts().then((result) => setProducts(result.data));
  }, []);

  return (
    <div>
      <Grid>
        <Grid.Row>
          {products?.map((product) => (
            <Grid.Column key={product.id} className="col-md-4 mb-4" width={4}>
              <div className="card h-100">
                <img
                  src={product.imageURL}
                  className="card-img-top"
                  alt={product.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">${product.price}</p>
                  <p className="card-text">{product.description}</p>
                </div>
                <div className="card-footer d-flex justify-content-between align-items-center">
                  <button
                    className="btn btn-danger"
                    onClick={() => addProductToCart(product)}
                  >
                    Sepete Ekle
                  </button>
                  <button
                    className="btn btn-warning"
                    onClick={() => addProductToWishList(product)}
                  >
                    İstek Listesine Ekle
                  </button>
                </div>
              </div>
            </Grid.Column>
          ))}
        </Grid.Row>
      </Grid>
    </div>
  );
}
