import API_URL from '../apiConfig.js'
import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";


export default function OneProduct(props) {
  return (
    <>
      {props.product && (
        <Col md="4" sm="4" className="mt-3">
           <Link
           onClick={() =>{
            props.setSelectProduct(props.product)
            
           } }
           className="one-product"
           to={`/products/${props.product._id}`}
          >
          <Card className="product">
            <Card.Img
              variant="top"
              src={props.product.img}
              height="300px"
              style={{ margin: "auto", objectFit: "cover" }}
            />
            <Card.Body className="body-one-product">
              <Card.Title>{props.product.title}</Card.Title>
              <Card.Text>
                {props.product.state}
                <br />
                <span style={{color: 'green'}}className="mt-2 text-center">$ {props.product.price} </span>
              </Card.Text>
              <Row>
                <Col className="btn-more-info-space">
                 
                   

                  
                </Col>
              </Row>
            </Card.Body>
          </Card>
          </Link>
        </Col>
      )}

      
    </>
  );
}
