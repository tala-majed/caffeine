import API_URL from '../apiConfig.js'
import React from 'react'
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useEffect, useState } from "react";

export default function NavBar(props) {
  const [searchTerm, setSearchTerm] = useState("");

 
console.log("from navbar", props.productLenght)
  return (
    <div className="NavBar">
      <Navbar className="navbar" variant="dark">

        <Navbar.Brand 
        as={Link}
         to="/"
         onClick={
          ()=>{
              props.setProductPage(false)
              props.setArticlePage(false)
       }}
        >Caffeine</Navbar.Brand>

        <Nav className="mr-auto">

          <Nav.Link
           as={Link}
           to="/"
           onClick={
            ()=>{
                props.setProductPage(false)
                props.setArticlePage(false)
         }}
          >Home</Nav.Link>

          <Nav.Link
           as={Link}
           to="/products"
           onClick={
             ()=>{
                props.setProductPage(true)
                 props.setArticlePage(false)
          }}
           >Products</Nav.Link>

          <Nav.Link
           as={Link}
           to="/articles"
           onClick={
            ()=>{
               props.setProductPage(false)
                props.setArticlePage(true)
         }}
           >
             Articles</Nav.Link>
             

        </Nav>

        <Nav style={{ float: "right" }}>
          {!props.isLoggedIn ? <>
            <Nav.Link as={Link} to="/login">
              Login
          </Nav.Link>

            <Nav.Link as={Link} to="/signup">
              Signup
          </Nav.Link>
         
          </> : <>


        
          {props.articlePage?
          <>
            
          <Nav.Link
          as={Link}
          to="/new-article"
          style={{margin: 'auto 30px auto auto'}}
           >
          Add New Article
          </Nav.Link>
          
          </> 
          
          
          :<></> 
        
        }
          
          


         {props.productPage?
           <>
           <input
           style={{margin: 'auto 30px auto auto' , height: '30px'}}
           type="text" name="search" placeholder="Search"  onChange={event =>{props.ToSetSearch(event.target.value)
            }}></input>
          <Nav.Link
           as={Link}
            to='/new-product'
            style={{margin: 'auto 30px auto auto'}}
            > Add New Product </Nav.Link>
            </>
           : <></>}


              <Nav.Link
               as={Link}
                to='/cart'
                onClick={
                  ()=>{
                      props.setProductPage(false)
                      props.setArticlePage(false)
               }}
               > <span style={{color:'#d1290a'}}>{props.productLenght}</span><ShoppingCartIcon style={{ marginTop: "6px", marginRight: "15px", fontSize: "25px", color: "#7d8179" }}/>  </Nav.Link>

           <Nav.Link
           as={Link}
            to='/profile'
            style={{margin: 'auto 30px auto auto'}}
            > Profile </Nav.Link>

              <Button variant="dark"
              style={{margin: 'auto 10px auto 10px', height: '100%'}}
                onClick={() => {
                  console.log("Logging Out!");
                  localStorage.removeItem("jwtToken");
                  props.loginCallback();
                }}
              >
                Logout
          </Button>
            </>}
        </Nav>


      </Navbar>
    </div>
  )
}
