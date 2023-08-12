import React from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import { Button, Dropdown } from "semantic-ui-react";
import CartService from "../services/cartService";
import { useHistory } from "react-router-dom";

export default function CartSummary() {
  const userId = localStorage.getItem("id");
  const [products, setProducts] = useState([]);
  const history = useHistory();

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
  }, []);

  return (
    <div>
      <Dropdown item text="Sepet">
        <Dropdown.Menu>
          {products.map((product) => {
            if (userId != null) {
              return (
                <Dropdown.Item
                  key={product.product.id}
                  onClick={() => redirectToProduct(product.product.id)}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={product.product.imageURL}
                      alt="resim"
                      style={{
                        width: "100px",
                        height: "100px",
                        marginRight: "10px",
                      }}
                    />
                    <span>{product.product.name}</span>
                  </div>
                </Dropdown.Item>
              );
            } else {
              <Dropdown.Item>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <h2>Sepet Boş</h2>
                </div>
              </Dropdown.Item>;
            }
          })}

          <Dropdown.Divider />

          {userId != null ? (
            <Dropdown.Item>
              <Button as={NavLink} to="/cart">
                Sepete Git
              </Button>
            </Dropdown.Item>
          ) : (
            <Dropdown.Item>
              <Button onClick={()=>redirectToLogin()}>Sepete Git</Button>
            </Dropdown.Item>
          )}


        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
