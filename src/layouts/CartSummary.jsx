import React from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import { Button, Dropdown } from "semantic-ui-react";
import CartService from "../services/cartService";
import { useHistory } from "react-router-dom";
import "../layouts/CSS/CartSummary.css";
import Modal from "react-modal";

export default function CartSummary() {
  const userId = localStorage.getItem("id");
  const [products, setProducts] = useState([]);
  const history = useHistory();

  ///Popup denemesi

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  ///popup denemesi sonu

  const redirectToProduct = (productId) => {
    history.push(`/products/${productId}`);
  };

  const redirectToLogin = () => {
    history.push(`/login`);
  };

  const getCart = async () => {
    if (!userId) {
      console.log("Kullanıcı kimliği bulunamadı.");
      return;
    }

    console.log(userId);
    let cartService = new CartService();
    await cartService
      .getCart(userId)
      .then((result) => setProducts(result.data.cartItems));
  };

  useEffect(() => {
    getCart();
  }, [getCart]);

  return (
    
    <div>
      <Dropdown item text="Sepet" className="dropdown-content">
        <Dropdown.Menu>
          {products.length > 0 ? (
            products.map((product) => (
              <Dropdown.Item
                key={product.product.id}
                onClick={() => redirectToProduct(product.product.id)}
              >
                <div className="product-item">
                  <img
                    src={product.product.imageURL}
                    alt="resim"
                    className="product-image"
                  />
                  <span>{product.product.name}</span>
                </div>
              </Dropdown.Item>
            ))
          ) : (
            <Dropdown.Item>
              <div className="empty-cart">
                <h2>Sepet Boş</h2>
              </div>
            </Dropdown.Item>
          )}

          <Dropdown.Divider />

          <Dropdown.Item>
            <div className="button-container">
              {userId != null ? (
                <Button as={NavLink} to="/cart">
                  Sepete Git
                </Button>
              ) : (
                <Button className="modal-button"
                  onClick={() => {
                    redirectToLogin();
                    openModal();
                  }}
                >
                  Sepete Git
                </Button>
              )}
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className="custom-modal"
                overlayClassName="custom-modal-overlay"
                contentLabel="Popup Modal"
              >
                <h2 className="modal-title">Kullanıcı Hatası</h2>
                <p className="modal-content">
                  Lütfen Giriş Yapınız
                </p>
                <button className="modal-button" onClick={closeModal}>
                  Kapat
                </button>
              </Modal>
            </div>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

// Modal'ın stil ayarları
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "400px",
  },
};

Modal.setAppElement("#root");
