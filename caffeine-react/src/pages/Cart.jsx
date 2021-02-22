import API_URL from '../apiConfig.js'
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Container,
  Button,
  Row,
  MyVerticallyCenteredModal,
  Modal,
} from "react-bootstrap";
import OneCardproduct from "../components/OneCardProduct";
//cart
let sum = 0;
export default function Cart(props) {
  const { name, email, products, _id } = props.auth.currentUser;
  const [alluserProducts, setAluserProducts] = useState([]);
  const [changeOnDelete, setChangeOnDelete] = useState(false);
  const [modalShow, setModalShow] = React.useState(false);
  const [show, setShow] = useState(false);
  const [checkOutState, setCheckOutState] = useState(false);
  const [order, setOrder] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const userId = _id;
  const userOrderCode = userId.substr(userId.length - 15);

  useEffect(() => {
    axios.get(`${API_URL}/api/user/${_id}/cart`).then((res) => {
      
      if(res.data.user.products == []){
        setCheckOutState(false)
      }else{
        setCheckOutState(true)
      }
      setAluserProducts(res.data.user.products);
      console.log(res.data.user.products)
    });
  }, [changeOnDelete]);

  const deleteProduct = (productId) => {
    axios
      .delete(`${API_URL}/api/user/${userId}/cart/${productId}`)
      .then((res) => {
        
        setChangeOnDelete(!changeOnDelete);

        console.log("cart page", res);
      });
  };
  const uniqueProducts = [];

  alluserProducts.forEach((product,i) => {
    if (!uniqueProducts.includes(product)) uniqueProducts.push(product);
  });

  // const sum = (product) => {
  //   let sum = 0;
  //   alluserProducts.forEach(product=>{
  //     if(uniqueProducts.includes(product)) sum++
  //   })
  //   return sum
  // }
  
  const Total = (product) => {
    let total = 0;
    alluserProducts.forEach((product) => {
      total = total +(parseInt(product.oneProduct.id.price)*parseInt(product.oneProduct.qty));

      console.log("product", product);
    });
    return total;
  };

  const cartProducts = alluserProducts.map((product,i) => {
    return (
      <>
        <OneCardproduct
          key={i}
          deleteProduct={deleteProduct}
          product={product}
          delete={true}
        />
        {/* <p className="total"> Qty :{sum()} </p> */}
        <div>
          {" "}
          <hr></hr>
        </div>{" "}
      </>
    );
  });

  const orders = alluserProducts.map((product,i) => {
    return (
      <>
        <li key={i} >{product.oneProduct.id.title}</li>
      </>
    );
  });

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter"
            style={{ color: "green" }}
          >
            Thank you for shopping with us.
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>
            <b>Order number:</b> {userOrderCode}
          </h5>
          <ul>{orders}</ul>
          <p>
            <b>Estimated delivery:</b> 28 Jun 2021 -30 Jun 2021.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  function deleteOrder() {
    console.log('asim')
    axios
      .delete(`${API_URL}/api/user/cart/delete-order/${userId}`)
      .then((res) => {
        setChangeOnDelete(!changeOnDelete);
        setCheckOutState(false)
        console.log("order-deleted", res);

        setTimeout(()=>{
          setModalShow(true)
          setOrder(res)
          console.log('order',order)
        }, 100);

        
      });
  }
  props.SetProductLenght(alluserProducts.length)
  console.log("from cart",alluserProducts.length)
  return (
    <div className="Cart">
      <div style={{

       display: 'flex',
       flexDirection: 'column',
       justifyContent: 'center',
       textAlign: 'left'

      }}>
      <h1 style={{
        margin: '30px',
        fontSize: '2em'
      }}>Shopping Cart</h1>
      <div>
        {" "}
        <hr></hr>
      </div>
      {cartProducts}

      <p
       className="total"
       style={{
         margin: 'auto',
         padding: '50px 0px 200px 0px'
       }}
       
       > Total : ${Total()} </p>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "100px",
        }}
      >
        {checkOutState? 
        <Button variant="secondary" onClick={handleShow}>
        Checkout
      </Button>
        :
        <>
        </>
        }

      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>Payment is ready! confirm to continuo.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              
              handleClose();
              deleteOrder();
            }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
    </div>
  );
}
