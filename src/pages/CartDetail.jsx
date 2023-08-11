import React from "react";
import { Table } from "react-bootstrap";
import "./style.css";
import { useState } from "react";
import { useEffect } from "react";
import CartService from "../services/cartService";

export default function CartDetail() {
  const token = localStorage.getItem("token");
  const [products, setProducts] = useState([]);

  const getCart = async () => {
    console.log(token);
    let cartService = new CartService();
    await cartService
      .getCart(token)
      .then((result) => setProducts(result.data.cartItems));
  };
  useEffect(() => {
    getCart();
  }, []);

  const removeProduct = async (productId) => {
    const updatedProducts = products.filter(
      (product) => product.id !== productId
    );
    let cartService = new CartService();
    await cartService
      .deleteFromCart(productId, token)
      .then((result) => setProducts(updatedProducts));
  };

  const updateQuantity = async (productId, newQuantity) => {
    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
        return { ...product, quantity: newQuantity };
      }
      console.log(product);
      return product;
    });
    let cartService = new CartService();
    await cartService
      .updateCart(productId, token)
      .then((result) => setProducts(updatedProducts));
  };

  const calculateTotalPrice = () => {
    return products.reduce(
      (total, product) => total + product.product.price * product.quantity,
      0
    );
  };

  const handlePayment = () => {
    // Ödeme işlemleri burada gerçekleştirilebilir
    console.log("Ödeme yapıldı.");
  };

  return (
    <div>
      <div className="container mt-5">
        <h2 className="mb-4">Sepetiniz</h2>
        <div className="row">
          <div className="col-md-8">
            {products.map((product) => (
              <div key={product.product.id} className="mb-4">
                <div className="d-flex align-items-center">
                  <img
                    src={product.product.imageURL}
                    alt="resim"
                    style={{ width: "100px", height: "100px" }}
                  />
                  <div className="ml-3">
                    <h4>{product.product.name}</h4>
                    <p>Fiyat: ${product.product.price}</p>
                    <div className="input-group">
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() =>
                          updateQuantity(
                            product.product.id,
                            product.quantity - 1
                          )
                        }
                      >
                        -
                      </button>
                      <span className="input-group-text">
                        {product.quantity}
                      </span>
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() =>
                          updateQuantity(
                            product.product.id,
                            product.quantity + 1
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  className="btn btn-danger mt-2"
                  onClick={() => removeProduct(product.id)}
                >
                  Sepetten Çıkar
                </button>
              </div>
            ))}
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h4>Toplam Fiyat: ${parseFloat(calculateTotalPrice()).toFixed(2)}</h4>
                <button
                  className="btn btn-primary mt-3"
                  onClick={handlePayment}
                >
                  Ödeme Yap
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
