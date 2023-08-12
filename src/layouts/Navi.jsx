import React, { useState } from "react";
import CartSummary from "./CartSummary";
import { Button, Container, Menu } from "semantic-ui-react";
import SignedOut from "./SignedOut";
import SignedIn from "./SignedIn";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import Categories from "./CategoriesNavi";
import "./CSS/Navi.css";
import { useEffect } from "react";

export default function Navi() {
  // const [userId, setUserId] = useState(null);
  // setUserId(localStorage.getItem("id"));

  const userId = localStorage.getItem("id");

  const history = useHistory();

  useEffect(() => {
    console.log(userId);
  }, [userId]);

  const redirectToLogin = () => {
    history.push(`/login`);
  };

  return (
    <div>
      <Menu inverted fixed="top" className="custom-menu">
        <Menu.Item
          href="/"
          name="DDOYOL"
          style={{ fontWeight: "bold", fontSize: "15px" }}
        />

        <Container>
          <Menu.Item href="/" name="Anasayfa" />

          <Categories />

          <Menu.Menu position="right">
            <CartSummary />
            {userId === null ? (
              <Button onClick={() => redirectToLogin()}> Signin </Button>
            ) : (
              <SignedIn/>
            )}

            
          </Menu.Menu>
        </Container>
      </Menu>
    </div>
  );
}
