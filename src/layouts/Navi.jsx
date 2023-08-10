import React, { useState } from "react";
import CartSummary from "./CartSummary";
import {  Container, Menu } from "semantic-ui-react";
import SignedOut from "./SignedOut";
import SignedIn from "./SignedIn";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import Categories from "./Categories";

export default function Navi() {
  const [isAuthenticated, setIsAuthenticated] = useState(true)

  const history = useHistory()
  function handleSignOut() {
    setIsAuthenticated(false)
    history.push("/")
  }

  function handleSignIn() {
    setIsAuthenticated(true)
  }
  return (
    <div>
      <Menu inverted fixed="top">
      <Menu.Item href="/" name="DDOYOL" style={{ fontWeight: 'bold', fontSize: '15px' }} />
       {/* Marka Adı eklendi */}
        <Container>
        
          <Menu.Item href="/" name="Anasayfa" />
          <Categories/>

          <Menu.Menu position="right">
              <CartSummary />
              
              {isAuthenticated?<SignedIn signOut={handleSignOut} bisey="1" />
            :<SignedOut signIn={handleSignIn}/>} 

          </Menu.Menu>
        </Container>
      </Menu>
    </div>
  );
}
