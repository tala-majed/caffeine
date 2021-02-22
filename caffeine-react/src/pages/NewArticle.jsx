import API_URL from '../apiConfig.js'
import React from 'react';
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { useState } from 'react';
import { Route, Redirect, useHistory } from "react-router-dom";
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
    title: Yup.string().required(" Title is required "),
    content: Yup.string().required(" Aticle content is required "),
  })
  
  
export default function NewArticle(props) {
    const [article, setArticle] = useState({title: "", content:"", img:""});
    const history = useHistory();
    const [updateArtImg , setUpdateArtImg] = useState("")



    const onSubmit = (values) => {

       values.img = updateArtImg
        axios
            .post(`${API_URL}/api/article/new-article`, { ...values, id: props.auth.currentUser._id })
            .then((res) => {

                history.push("/articles");


            })
            .catch((err) => console.log(err));

    }

    const uploadImageHundler = (e) => {
        var format = new FormData()
        format.append("image", e.target.files[0])
        axios.post("https://api.imgur.com/3/image/", format, { headers: { "Authorization": "Client-ID 6cd46bc903efe25" } })
          .then(data =>{
    
            setUpdateArtImg(data.data.data.link)
           
        })
    }
    if (props.auth.isLoggedIn) {

        return (
            <div className="NewProduct">

                <Formik
                initialValues = {article}
                validationSchema={validationSchema}
                onSubmit = {values => onSubmit(values) }
                >

                <Form as={FormikForm} className="form">
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>
                            <b>Article Title</b>
                        </Form.Label>
                        <Form.Control  as={Field} type="text" placeholder="Type the title of article" name="title" />
                    </Form.Group>
                    <ErrorMessage name="title" render={(msg) =>  <Alert variant={"danger"}>
                    {msg}
                  </Alert>} />
                                       <Form.Label>
                            <b>Article</b>
                        </Form.Label> 
                    <Form.Group controlId="exampleForm.ControlTextarea1">
  
                        <Field as="textarea" cols={70} rows={10} name="content" />
                    </Form.Group>
                    <ErrorMessage name="content" render={(msg) =>  <Alert variant={"danger"}>
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
                    <br />
                    <Button className="btn-add-product" type="submit" variant="secondary" size="sm" >
                        Add to articles
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
