import React, { useEffect, useState } from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { ProductService } from "../services/productService";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import CartService from "../services/cartService";
import WishListService from "../services/wishListService";

export default function ProductDetail() {
  let { id } = useParams();

  const token = localStorage.getItem("token");
  const [product, setProduct] = useState([]);
  const addProductToCart = async (items) => {
      
    let cartService = new CartService();
    await cartService
      .addToCart(token,items)
      .then((result) =>console.log(result) );
  };
     
  const addProductToWishList = async (product) => {
     let wishListService = new WishListService();
     await wishListService
     .addWishList(product,token)
     .then((result)=> console.log(result));
  }

  useEffect(() => {
    let productService = new ProductService();
    productService.getProductById(id).then((result) => setProduct(result.data));
  }, []);

  return (
    <div>
      <Card.Group>
        <Card fluid>
          <Card.Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Image floated="right" size="medium" src={`${product.imageURL}`} />
          </Card.Content>
          
          <Card.Content>
            <Card.Header>{product.name}</Card.Header>
            <Card.Meta></Card.Meta>
            <Card.Description>{product.description}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div className="ui two buttons">
              <Button basic color="green"
                    onClick={() => addProductToCart(product)}
                  >
                    Sepete Ekle
                  </Button>
                  <Button basic color="yellow"
                    onClick={() => addProductToWishList(product)}
                  >
                    İstek Listesine Ekle
                  </Button>
            </div>
          </Card.Content>
        </Card>
      </Card.Group>

      
    </div>
  );
}
