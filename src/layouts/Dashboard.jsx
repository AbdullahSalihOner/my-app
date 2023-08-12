import React from "react";
import ProductList from "../pages/ProductList";
import Categories from "./CategoriesNavi";
import { Grid, GridColumn } from "semantic-ui-react";
import { Route } from "react-router";
import ProductDetail from "../pages/ProductDetail";
import CartDetail from "../pages/CartDetail";
import { ToastContainer } from "react-toastify";
import ProductAdd from "../pages/ProductAdd";
import ProductUpdate from "../pages/ProductUpdate";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import WishListPage from "../pages/WishListPage";
import About from "../pages/About";
import Navi from "./Navi";
import Payment from "../pages/Payment";
import AdminPanel from "../pages/AdminPanel";
import ProductAdminPage from "../pages/ProductAdminPage";
import UserAdminPage from "../pages/UserAdminPage";
import CategoryAdminPage from "../pages/CategoryAdminPage";



export default function Dashboard() {
  return (
    <div>
      <ToastContainer position="bottom-right"/>
      <Grid>
        <Grid.Row>
          <Navi/>
          <GridColumn width={0}>
            {/* <CategoriesMain /> */}
          </GridColumn>
          <Grid.Column width={16}>
            <Route exact path="/" component={ProductList} />
            <Route exact path="/products" component={ProductList} />
            <Route path="/products/:id" component={ProductDetail} />

            <Route path="/cart" component={CartDetail} />

            <Route path="/product/add" component={ProductAdd} />  
            <Route path="/product/update" component={ProductUpdate} />
            

            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={SignupPage} />

            <Route path="/wishlist" component={WishListPage}/>


            <Route path="/about" component={About}/>

            <Route path="/payment" component={Payment} />

            <Route exact path="/admin" component={AdminPanel} />
            <Route path="/admin/product" component={ProductAdminPage}/>
            <Route path="/admin/user" component={UserAdminPage}/>
            <Route path="/admin/category" component={CategoryAdminPage}/>




          </Grid.Column>
          
        </Grid.Row>
        
      </Grid>
    </div>
  );
}