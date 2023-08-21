import React, { useEffect, useState } from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { ProductService } from "../services/productService";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import CartService from "../services/cartService";
import WishListService from "../services/wishListService";
import "../pages/CSS/ProductDetail.css";
import ReactModal from "react-modal";

export default function ProductDetail() {

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  let { id } = useParams();

  const UserId = localStorage.getItem("id");
  const [product, setProduct] = useState([]);
  const addProductToCart = async (items) => {
    let cartService = new CartService();
    await cartService
      .addToCart(items, UserId)
      .then((result) => console.log(result));
  };

  const addProductToWishList = async (product) => {
    let wishListService = new WishListService();
    await wishListService
      .addWishList(product, UserId)
      .then((result) => console.log(result));
  };

  useEffect(() => {
    let productService = new ProductService();
    productService.getProductById(id).then((result) => setProduct(result.data));
  }, []);

  return (
    <div className="center-page">
      <Card className="product-card" fluid>
        <Card.Content>
          <div className="image-container">
            <Image
              floated="left"
              size="small"
              src={product.imageURL}
              onClick={openModal}
              className="clickable-image"
            />
          </div>
          <div className="card-details">
            <Card.Header className="card-header">{product.name}</Card.Header>
            <Card.Description className="card-description">
              {product.description}
            </Card.Description>
          </div>
        </Card.Content>
        <Card.Content extra>
          <div className="ui two buttons">
            <Button
              basic
              color="green"
              onClick={() => addProductToCart(product)}
            >
              Sepete Ekle
            </Button>
            <Button
              basic
              color="yellow"
              onClick={() => addProductToWishList(product)}
            >
              İstek Listesine Ekle
            </Button>
          </div>
        </Card.Content>
      </Card>

      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Fotoğraf Modal"
        className="modal-content"
      >
        <Image size="medium" src={product.imageURL} />
        <Button onClick={closeModal}>Kapat</Button>
      </ReactModal>
    </div>
  
  
  );
}
