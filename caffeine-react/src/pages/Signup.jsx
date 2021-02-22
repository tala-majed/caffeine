import API_URL from '../apiConfig.js'
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Alert, Button, Form } from "react-bootstrap";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import axios from "axios";
import * as Yup from 'yup';


const validationSchema = Yup.object({
  name: Yup.string().required(" Enter your name "),
  email: Yup.string().required(" Email is required "),
  password: Yup.string().required(" Enter your password ").min(8, "Your password must be at least 8 characters")
})

export default function Singup(props) {
  const history = useHistory();

  const [user, setUser] = useState({ name: "", email: "", password: "" }); // user info
  const [register, setRegister] = useState(true); // to show aleart

  // //to add the input inside user
  // const onChangeInput = ({ target: { name, value } }) => {
  //   setUser({ ...user, [name]: value });
  // };
  // to add the user info to database

  const onSubmit = (values) => {
    // event.preventDefault();

    axios
      .post(`${API_URL}/api/user/register`, values)
      .then((res) => {
        const user = res.data.user;
        if (user) {
          history.push("/login");
        } else {
          setRegister(false)
          setTimeout(() => {
            setRegister(true);
          }, 3000);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {!register && (
        <Alert variant={"danger"}>
          This email is already exist
        </Alert>
      )}
      <div className="cont">
        <Formik
          initialValues={user}
          validationSchema={validationSchema}
          onSubmit={values => onSubmit(values)}
        >
          <Form as={FormikForm} className="form">
            <h3>Sign Up</h3>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                as={Field}
                placeholder="Enter name"
                name="name" />
            </Form.Group>
            <ErrorMessage name="name" render={(msg) => <Alert variant={"danger"}>
              {msg}
            </Alert>} />
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                as={Field}
                name="email"
                type="email"
                placeholder="Enter email" />
            </Form.Group>
            <ErrorMessage name="email" render={(msg) => <Alert variant={"danger"}>
              {msg}
            </Alert>} />
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Password</Form.Label>
              <Form.Control
                as={Field}
                type="password"
                name="password"
                placeholder="Password" />
            </Form.Group>
            <ErrorMessage name="password" render={(msg) => <Alert variant={"danger"}>
              {msg}
            </Alert>} />

            <Button
              variant="primary"
              type="submit"
            >
              Sign up
            </Button>
          </Form>
        </Formik>
      </div>
    </>
  );
}
