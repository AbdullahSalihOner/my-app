import React from "react";
import ProductList from "../pages/ProductList";
import Categories from "./Categories";
import { Grid } from "semantic-ui-react";
import { Route } from "react-router";
import ProductDetail from "../pages/ProductDetail";
import CartDetail from "../pages/CartDetail";
import { ToastContainer } from "react-toastify";
import ProductAdd from "../pages/ProductAdd";
import ProductUpdate from "../pages/ProductUpdate";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import WishListDeatil from "../pages/WishListDeatil";
import About from "../pages/About";
import Navi from "./Navi";
import Footer from "./Footer";
import Payment from "../pages/Payment";

export default function Dashboard() {
  return (
    <div>
      <ToastContainer position="bottom-right"/>
      <Grid>
        <Grid.Row>
          <Navi/>
          <Grid.Column width={16}>
            <Route exact path="/" component={ProductList} />
            <Route exact path="/products" component={ProductList} />
            <Route path="/products/:id" component={ProductDetail} />

            <Route path="/cart" component={CartDetail} />

            <Route path="/product/add" component={ProductAdd} />  
            <Route path="/product/update" component={ProductUpdate} />
            

            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={SignupPage} />

            <Route path="/wishlist" component={WishListDeatil}/>


            <Route path="/about" component={About}/>

            <Route path="/payment" component={Payment} />




          </Grid.Column>
          
        </Grid.Row>
        
      </Grid>
    </div>
  );
}