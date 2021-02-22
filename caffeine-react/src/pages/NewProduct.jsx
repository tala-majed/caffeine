import API_URL from '../apiConfig.js'
import React from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { useState } from 'react';
import { Route, Redirect, useHistory, Link } from "react-router-dom";
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  title: Yup.string().required(" This field is required "),
  description: Yup.string().required(" This field is required "),
  price: Yup.string().required("Product price is required "),
  state: Yup.string().required("You must choose one "),
  qty: Yup.string().required("Quantity is required at least one"),
})

export default function NewProduct(props) {

  const history = useHistory();
  const [updateProductImg , setUpdateProductImg] = useState("")



  const onSubmit = (values) => {
    
    values.img= updateProductImg
    axios
      .post(`${API_URL}/api/product/new-product`, values)
      .then((res) => {

        history.push("/products");


      })
      .catch((err) => console.log(err));


  }

  const numbersOfQty = 30;

  const qtyNumberDropDown = [...Array(numbersOfQty)].map((e, i) => {
    return (
      <option key={i}>{i + 1}</option>
    )

  })

  const uploadImageHundler = (e) => {
    var format = new FormData()
    format.append("image", e.target.files[0])
    axios.post("https://api.imgur.com/3/image/", format, { headers: { "Authorization": "Client-ID 6cd46bc903efe25" } })
      .then(data =>{

        
        setUpdateProductImg(data.data.data.link)
       
    })
  } 
  if (props.auth.isLoggedIn) {

    return (
      <div className="NewProduct">

        <Formik
          initialValues={{title: "", description: "", img: updateProductImg, price: "", state: "", qty: ""}}
          validationSchema={validationSchema}
          onSubmit={values => onSubmit(values)}
        >

          <Form as={FormikForm} className="form">
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>
                <b>Product Name</b>
              </Form.Label>
              <Form.Control as={Field} type="text" placeholder="Philips Series 3200 Fully Automatic Espresso Machine" name="title" />
            </Form.Group>
            <ErrorMessage name="title" render={(msg) =>  <Alert variant={"danger"}>
                    {msg}
                  </Alert>} />
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>
                <b>Description</b>
              </Form.Label>
              <Form.Control as={Field} rows={10} name="description" />
            </Form.Group>
            <ErrorMessage name="description" render={(msg) =>  <Alert variant={"danger"}>
                    {msg}
                  </Alert>} />
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>
                <b>Image</b>
              </Form.Label>
              <br/>
              <input type="file"  onChange={uploadImageHundler} name="img"   />
            </Form.Group>
            <ErrorMessage name="img" render={(msg) =>  <Alert variant={"danger"}>
                    {msg}
                  </Alert>} />
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>
                <b>Price</b>
              </Form.Label>
              <Form.Control as={Field} type="text" placeholder="Product Price" name="price" />
            </Form.Group>
            <ErrorMessage name="price" render={(msg) =>  <Alert variant={"danger"}>
                    {msg}
                  </Alert>} />
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>
                <b>State</b> 
              </Form.Label> <br/>
              <Field size="mm" as="select" name="state"  placeholder="http://" >
                <option></option>
                <option>New</option>
                <option>Like New</option>
                <option>Used</option>
              </Field>
            </Form.Group>
            <ErrorMessage name="state" render={(msg) =>  <Alert variant={"danger"}>
                    {msg}
                  </Alert>} />

            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>
                <b>Quantity</b>
              </Form.Label> <br/>
              <Field as={Field} size="sm" as="select" name="qty"  className="qty-drop-down">
                <option ></option>
                {qtyNumberDropDown}
              </Field>
            </Form.Group>
            <ErrorMessage name="qty" render={(msg) =>  <Alert variant={"danger"}>
                    {msg}
                  </Alert>} />

            <br />
           
              <Button variant="secondary" type="submit" size="sm" >
                Add New Product
        </Button>
        

          </Form>
        </Formik>
      </div>
    );
  } else {
    return (
      <Route>
        <Redirect to="/login" />
      </Route>
    );
  }
}
