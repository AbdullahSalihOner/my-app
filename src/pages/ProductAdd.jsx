import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button, Dropdown } from "semantic-ui-react";
import KodlamaIoTextInput from "../utilities/customFormControls/KodlamaIoTextInput";
import { CategoryService } from "../services/categoryService";

export default function ProductAdd() {
  const initialValues = { productName: "", unitPrice: 0 };

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let categoryService = new CategoryService();
    categoryService
      .getCategories()
      .then((result) => setCategories(result.data));
  }, []);

  const schema = Yup.object({
    productName: Yup.string().required("Ürün adı zorunlu"),
    unitPrice: Yup.number().required("Ürün fiyatı zorunlu"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      <Form className="ui form">
        <KodlamaIoTextInput name="name" placeholder="Ürün adı" />
        <KodlamaIoTextInput name="description" placeholder="Ürün Tanımı" />
        <KodlamaIoTextInput name="price" placeholder="Ürün fiyatı" />
        <KodlamaIoTextInput name="imageURL" placeholder="Ürün resmi" />
        <Dropdown item text="Category">
        <Dropdown.Menu>
          {categories.map((category) => (
            
              <Dropdown.Item key={category.id}>{category.categoryName}</Dropdown.Item>
            
          ))}
          </Dropdown.Menu>
        </Dropdown>
        <Button color="green" type="submit">
          Ekle
        </Button>
      </Form>
    </Formik>
  );
}
