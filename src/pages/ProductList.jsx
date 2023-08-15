import React, { useEffect, useState } from "react";
import { ProductService } from "../services/productService";
import CartService from "../services/cartService";
import { Grid, GridColumn, Menu } from "semantic-ui-react";
import WishListService from "../services/wishListService";
import { useHistory } from "react-router-dom";
import "../pages/CSS/ProductList.css";
import Heart from "react-heart";
import Modal from "react-modal";
import CategoryList from "../layouts/CategoryList";
import { CategoryService } from "../services/categoryService";
import { Col, Row } from "react-bootstrap";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);

  const history = useHistory();

  const UserId = localStorage.getItem("id");

  const [activeProducts, setActiveProducts] = useState({});

  ///Popup denemesi

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const redirectToLogin = () => {
    history.push(`/login`);
  };

  ///popup denemesi sonu

  const toggleHeart = (productId) => {
    setActiveProducts((prevState) => ({
      ...prevState,
      [productId]: !prevState[productId],
    }));
  };

  //WithList işlemleri

  const getWishList = async () => {
    let wishListService = new WishListService();
    await wishListService
      .getWishList(UserId)
      .then((result) => setItems(result.data));
  };

  const addProductToWishList = async (product) => {
    let wishListService = new WishListService();
    await wishListService
      .getWishList(UserId)
      .then((result) => setItems(result.data));

    let isProductInWishList = false;
    for (let i = 0; i < items.length; i++) {
      if (items[i].id === product.id) {
        isProductInWishList = true;
        break;
      }
    }

    if (isProductInWishList) {
      alert("Bu ürün zaten favorilerinizde bulunmaktadır.");
      return;
    } else {
      await wishListService
        .addWishList(product, UserId)
        .then((result) => console.log(result));
      alert("Ürün favorilere eklendi");
    }
  };

  const removeProductFromWishList = async (wishListId) => {
    const updatedWishList = products.filter((items) => items.id !== wishListId);
    let wishListService = new WishListService();
    await wishListService
      .deleteWishList(wishListId, UserId)
      .then((result) => setProducts(updatedWishList));
  };

  //Ürün işlemleri
  const addProductToCart = async (items) => {
    let cartService = new CartService();
    await cartService
      .addToCart(UserId, items)
      .then((result) => console.log(result));

    alert("Ürün sepete eklendi");
  };

  const redirectToProduct = (productId) => {
    history.push(`/products/${productId}`);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    let productService = new ProductService();

    let categoryService = new CategoryService();
    categoryService
      .getCategories()
      .then((result) => setCategories(result.data));

    if (selectedCategory) {
      productService
        .getProductByCategoryId(selectedCategory.id)
        .then((result) => setProducts(result.data));
    } else {
      productService.getProducts().then((result) => setProducts(result.data));
    }
  }, [selectedCategory]);

  return (
    <div style={{ display: "flex" }}>
      <Col xs={3}>
        <Menu pointing vertical>
          {categories.map((category) => (
            <Menu.Item
              key={category.id}
              onClick={() => handleCategorySelect(category)}
            >
              {category.categoryName}
            </Menu.Item>
          ))}
        </Menu>
      </Col>

      <Col xs={9}>
        <Grid>
          <Grid.Row>
            {products?.map((product) => (
              <Grid.Column key={product.id} className="col-md-4 mb-4" width={5}>
                <div className="card h-100">
                  <img
                    src={product.imageURL}
                    className="card-img-top"
                    alt={product.name}
                    style={{ maxWidth: 250, maxHeight: 250 }}
                    onClick={() => redirectToProduct(product.id)}
                  />
                  <div className="card-body">
                    <h5
                      className="card-title"
                      onClick={() => redirectToProduct(product.id)}
                    >
                      {product.name}
                    </h5>
                    <p className="card-text">${product.price}</p>
                    <p className="card-text">{product.description}</p>
                  </div>
                  <div className="card-footer d-flex justify-content-between align-items-center">
                    <div style={{ width: "2rem" }}>
                      {UserId != null ? (
                        <Heart
                          isActive={activeProducts[product.id]}
                          onClick={() => {
                            toggleHeart(product.id);
                            addProductToWishList(product);
                          }}
                          activeColor="red"
                          inactiveColor="blue"
                          animationTrigger="hover"
                          animationScale={1.5}
                        />
                      ) : (
                        <Heart
                          isActive={activeProducts[product.id]}
                          onClick={() => {
                            openModal();
                            redirectToLogin();
                          }}
                          activeColor="red"
                          inactiveColor="blue"
                          animationTrigger="hover"
                          animationScale={1.5}
                        />
                      )}
                    </div>
                    {UserId != null ? (
                      <button
                        className="btn btn-dark"
                        onClick={() => {
                          addProductToCart(product);
                        }}
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <button
                        className="btn btn-dark"
                        onClick={() => {
                          redirectToLogin();
                          openModal();
                        }}
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </Grid.Column>
            ))}
          </Grid.Row>
        </Grid>
      </Col>
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
