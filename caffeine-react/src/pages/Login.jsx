import API_URL from '../apiConfig.js'
import axios from "axios";
import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  email: Yup.string().required(" Enter your email "),
  password: Yup.string().required(" Enter password "),
})

export default function Login(props) {
  const history = useHistory();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  console.log(API_URL)
  const [login, setLogin] = useState(true); // to show alert
  // const onChangeInput = (event) => {
  //   const { name, value } = event.target;
  //   setCredentials({
  //     ...credentials,
  //     [name]: value,
  //   });
  // };

  const onSubmit = (values) => {
    
    // event.preventDefault();
    axios
      .post(`${API_URL}/api/user/login`, values)
      .then((res) => {
        console.log("Express backend /login response", res);

        const token = res.data.token;
        const msg = res.data.msg;

        if (token) {
          localStorage.setItem("jwtToken", token);
          props.loginCallback();
          history.push("/");
        } else {
          console.log("Login error: ", msg);
          setLogin(false);
          setTimeout(() => {
            setLogin(true);
          }, 5000);

        }
      });
  };

  return (
    <>
    {!login && (
      <Alert variant={"danger"}>
        Your email or password is wrong 
      </Alert>
    )}
    <div className="cont">

      <div className="form">
        <h3> Login </h3>
        <Formik
          initialValues={credentials}
          validationSchema={validationSchema}
          onSubmit={values => onSubmit(values)}
        >
          <Form>
            <div >
              <label>Email address</label>
              <Field type="email" className="form-control" name="email" placeholder="Enter email" />
            </div>
            <ErrorMessage name="email" render={(msg) => <Alert variant={"danger"}>
              {msg}
            </Alert>} />
            <div >
              <label>Password</label>
              <Field type="password" name="password" className="form-control" placeholder="Enter password" />
            </div>
            <ErrorMessage name="password" render={(msg) => <Alert variant={"danger"}>
              {msg}
            </Alert>} />

            <button className="btn" type="submit" >Login</button>
          </Form>
        </Formik>
        <p className="forgot-password text-right">
          Forgot <Link to="/forgot">password?</Link>
        </p>
      </div>


    </div>
    </>
  );
}
