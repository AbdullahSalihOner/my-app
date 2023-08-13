import React, { useState } from "react";
import CartSummary from "./CartSummary";
import { Button, Container, Menu } from "semantic-ui-react";
import SignedIn from "./SignedIn";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import Categories from "./CategoriesNavi";
import "./CSS/Navi.css";
import { useEffect } from "react";
import { UserService } from "../services/userService";

export default function Navi() {
  const userId = localStorage.getItem("id");
  const history = useHistory();
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    if (userId) {
      fetchUserRole(userId);
    }
  }, [userId]);

  const fetchUserRole = async (userId) => {
    try {
      const userService = new UserService();
      const response = await userService.getUserById(userId);
      setUserRole(response.data.role);
      
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
  };

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

          {userRole === "admin" ? (
            <Menu.Item href="/admin">Admin Panel</Menu.Item>
          ) : null}

          <Menu.Menu position="right">
            <CartSummary />
            {userId === null ? (
              <Button onClick={() => redirectToLogin()}> Signin </Button>
            ) : (
              <SignedIn />
            )}
          </Menu.Menu>
        </Container>
      </Menu>
    </div>
  );
}