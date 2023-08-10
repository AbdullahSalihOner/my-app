import React from "react";
import { useState ,useEffect} from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import { Button, Dropdown } from "semantic-ui-react";
import CartService from "../services/cartService";

export default function CartSummary() {
  const token = localStorage.getItem("token");
  console.log(token);

/*   const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    let cartService = new CartService();
    cartService.getCart().then((result) => setCartItems(result.data));
  }, []); */
  return (
    <div>
      <Dropdown item text="Sepet">
        <Dropdown.Menu>
          {/* <Dropdown.Item>{cartItems.product}</Dropdown.Item>
          <Dropdown.Item>{cartItems.quantity}</Dropdown.Item>
          <Dropdown.Item>{cartItems.totalCost}</Dropdown.Item> */}
          <Dropdown.Divider />
          <Dropdown.Item>
            <Button as={NavLink} to="/cart">
              Sepete Git
            </Button>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
