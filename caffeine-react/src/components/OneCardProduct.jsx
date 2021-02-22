import API_URL from '../apiConfig.js'
import React from 'react'
import { Button, Card, Col, Row, Form } from 'react-bootstrap'
import {Link} from 'react-router-dom'
export default function OneCardProduct(props) {
    const product = props.product.oneProduct;
    console.log('aaa',product.qty)

    const numbersOfQty = 30;

    const qtyNumberDropDown = [...Array(numbersOfQty)].map((e,i)=>{
      return (
      <option>{i+1}</option>
      )

    })
    return ( <> 

    
        {props.product && 
       

                    <div 
                    style={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                    <div className="OneCardProduct">
                   

                       
                        <div>
                             <Link to={`products/${product.id._id}`}>
                              <img   src={product.id.img} alt=""   /> 
                              </Link> 
                              
                      </div>
                       
                       
                        <div> <Link to={`products/${product.id._id}`}>
                             <p className="ex1">{product.id.title}</p>
                             </Link> </div>
                        
                        <div
                        className="price"
                        >  ${product.id.price}   </div>

                        <Form.Group controlId="exampleForm.ControlInput1" 
                        style={{display: 'flex'}}>
                       <Form.Label>
                       <b style={{marginRight: '15px'}}>qty:</b>
                       </Form.Label>
                       <Form.Control  size="sm" as="select" name="qty"  className="qty-drop-down">
                       <option >{product.qty}</option>
                       {qtyNumberDropDown}
                       </Form.Control>
                      </Form.Group>

                        <div>

                          {props.delete &&  <Link  onClick={()=> props.deleteProduct(product.id._id)} to="/cart">
                              Delete
                              </Link>}

                     </div>

                   
                    
                    </div>
                    </div>
                   }
        </>
    
    )
}
