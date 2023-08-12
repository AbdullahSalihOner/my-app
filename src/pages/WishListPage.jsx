import React, { useEffect } from "react";
import WishListService from "../services/wishListService";
import { useState } from "react";
import CartService from "../services/cartService";
import Modal from "react-modal";

export default function WishListDeatil({ item, onRemove, onAddToCart }) {
  const [items, setItems] = useState([]);

  const UserId = localStorage.getItem("id");

  ///Popup denemesi
  const [activeModal, setActiveModal] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  ///popup denemesi sonu

  const getWishList = async () => {
    let wishListService = new WishListService();
    await wishListService
      .getWishList(UserId)
      .then((result) => setItems(result.data));
  };

  console.log(items);

  useEffect(() => {
    getWishList();
  }, []);

  const removeProduct = async (wishListId) => {
    const updatedWishList = items.filter((items) => items.id !== wishListId);
    let wishListService = new WishListService();
    await wishListService
      .deleteWishList(wishListId, UserId)
      .then((result) => setItems(updatedWishList));
  };

  const addProductToCart = async (items) => {
    let cartService = new CartService();
    await cartService
      .addToCart(UserId, items)
      .then((result) => console.log(result));
  };

  console.log(items);

  return (
    <div className="card mb-3">
      <h1>Wish List</h1>
      {items?.map((item) => (
        <div key={item.id}>
          <img
            src={item.imageURL}
            className="card-img-top"
            alt={item.name}
            style={{ width: "300px" }}
          />
          <div className="card-body">
            <h5 className="card-title">{item.name}</h5>
            <p className="card-text">${item.price}</p>
            <p className="card-text">{item.description}</p>
            <button
              className="btn btn-danger mr-2"
              onClick={() => removeProduct(item.id)}
            >
              Sil
            </button>
            <button
              className="btn btn-success"
              onClick={() => addProductToCart(item)}
            >
              Sepete Ekle
            </button>
            <button
              className="btn btn-primary ml-2"
              onClick={() => openModal(item.id)}
            >
              Detaylar
            </button>
            {activeModal === item.id && (
              <Modal
                isOpen={activeModal === item.id}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Ürün Detayları"
              >
                <h2 className="modal-title">{item.name} Detayları</h2>
                <img
                  src={item.imageURL}
                  alt={item.name}
                  style={{ width: "200px", height: "200px" }}
                />
                <p className="modal-content">Fiyat: ${item.price}</p>
                <p className="modal-content">{item.description}</p>
                <button className="modal-button" onClick={closeModal}>
                  Kapat
                </button>
              </Modal>
            )}
          </div>
        </div>
      ))}
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
