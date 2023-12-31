import React from "react";
import "./style.css";
import { useState } from "react";
import { useEffect } from "react";
import CartService from "../services/cartService";
import { useHistory } from "react-router-dom";

export default function CartDetail() {
  const UserId = localStorage.getItem("id");
  const [products, setProducts] = useState([]);

  const history = useHistory();

  const getCart = async () => {
    
    let cartService = new CartService();
    await cartService
      .getCart(UserId)
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
      .deleteFromCart(productId, UserId)
      .then((result) => setProducts(updatedProducts));
  };

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity >= 1) { // Eğer yeni miktar 1 veya daha fazlaysa
      const updatedProducts = products.map((product) => {
        if (product.product.id === productId) {
          return { ...product, quantity: newQuantity };
        }
        return product;
      });
      let cartService = new CartService();
      await cartService
        .updateCart(productId, UserId, { id: productId, quantity: newQuantity })
        .then((result) => setProducts(updatedProducts));
    }
  };
  

  const calculateTotalPrice = () => {
    return products.reduce(
      (total, product) => total + product.product.price * product.quantity,
      0
    );
  };

  const handlePayment = () => {
    if (products.length > 0) {
      // Eğer sepette ürün varsa, ödeme sayfasına yönlendir
      history.push("/payments");
    } else {
      console.log("Sepette ürün yok.");
      alert("Sepette ürün yok.");
    }
  };

  return (
    <div>
  <div className="container mt-5">
    <h2 className="mb-4">Sepetiniz</h2>
    <div className="row">
      <div className="col-md-8">
        {products.map((product) => (
          <div key={product.product.id} className="mb-4">
            <div className="card p-3">
              <div className="d-flex align-items-center">
                <img
                  src={product.product.imageURL}
                  alt="resim"
                  style={{ width: "120px", height: "120px", objectFit: 'cover', borderRadius: '5px' }}
                />
                <div className="ml-3">
                  <h5>{product.product.name}</h5>
                  <div className="input-group">
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() =>
                        updateQuantity(product.product.id, product.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <span className="input-group-text">{product.quantity}</span>
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() =>
                        updateQuantity(product.product.id, product.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div style={{ position: 'absolute', top: '50%', left: '71%', transform: 'translate(-50%, -50%)' }} className="mt-2 text-center">
                <p style={{ fontSize: '25px'}}>
                  ${product.product.price.toFixed(2)}
                </p>
              </div>
              
            </div>
            <div className="card mt-2">
            <button
                className="btn btn-danger btn-block"
                onClick={() => removeProduct(product.id)}
              >
                Sepetten Çıkar
              </button>
            </div>
          </div>
        ))}
      </div>
     
      <div className="col-md-4">
        <div className="card">
          <div className="card-body">
            <h4>
              Toplam Fiyat: ${parseFloat(calculateTotalPrice()).toFixed(2)}
            </h4>
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
