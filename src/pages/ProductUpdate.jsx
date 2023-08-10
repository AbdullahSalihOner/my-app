import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button, Dropdown } from "semantic-ui-react";
import KodlamaIoTextInput from "../utilities/customFormControls/KodlamaIoTextInput";
import { CategoryService } from "../services/categoryService";
import { ProductService } from "../services/productService"; // Varsayılan olarak productService eklemeyi unutmayın

export default function ProductUpdate({ productId }) {
  const [product, setProduct] = useState({});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let categoryService = new CategoryService();
    let productService = new ProductService(); // productService'ı import edin
    categoryService
      .getCategories()
      .then((result) => setCategories(result.data));

    productService
      .getProductById(productId)
      .then((result) => setProduct(result.data));
  }, [productId]);

  const schema = Yup.object({
    productName: Yup.string().required("Ürün adı zorunlu"),
    unitPrice: Yup.number().required("Ürün fiyatı zorunlu"),
  });

  return (
    <Formik
      initialValues={{
        productName: product.productName || "",
        unitPrice: product.unitPrice || 0,
      }}
      validationSchema={schema}
      onSubmit={(values) => {
        console.log(values);
        // productService.updateProduct(productId, values); // Güncelleme işlemini burada çağırabilirsiniz
      }}
    >
      <Form className="ui form">
        <KodlamaIoTextInput name="productName" placeholder="Ürün adı" />
        <KodlamaIoTextInput name="unitPrice" placeholder="Ürün fiyatı" />
        <KodlamaIoTextInput name="imageURL" placeholder="Ürün resmi" />
        <Dropdown item text="Category">
          <Dropdown.Menu>
            {categories.map((category) => (
              <Dropdown.Item key={category.id}>{category.categoryName}</Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Button color="green" type="submit">
          Güncelle
        </Button>
      </Form>
    </Formik>
  );
}
