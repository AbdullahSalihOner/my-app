import React, { useEffect, useState } from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { ProductService } from "../services/productService";
import { useParams } from "react-router-dom/cjs/react-router-dom";

export default function ProductDetail() {
  let { id } = useParams();

  const [product, setProduct] = useState([]);

  useEffect(() => {
    let productService = new ProductService();
    productService.getProductById(id).then((result) => setProduct(result.data));
  }, []);

  return (
    <div>
      <Card.Group>
        <Card fluid>
          <Image floated="right" size="large" src={`${product.imageURL}`} />
          <Card.Content>
            <Card.Header>{product.name}</Card.Header>
            <Card.Meta></Card.Meta>
            <Card.Description>{product.description}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div className="ui two buttons">
              <Button basic color="green">
                Sepete Ekle
              </Button>
              <Button basic color="red">
                İstek Listesine Ekle
              </Button>
            </div>
          </Card.Content>
        </Card>
      </Card.Group>
    </div>
  );
}
