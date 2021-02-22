import API_URL from "../apiConfig.js";
import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import { Link } from 'react-router-dom';

export default function Admin(props) {

    const [articles, setArticles] = useState([])
    const [products, setProducts] = useState([])
    const [users, setUsers] = useState([])
    const [changeAfterDelete, setChangeAfterDelete] = useState(false)

    useEffect(() => {
        /*    *****    GET ALL ARTICLES    *****       */
        axios.get(`${API_URL}/api/article/`)
            .then(res => {
                setArticles(res.data.msg)
            })

        /*     *****    GET ALL PRODUCTS    *****      */
        axios.get(`${API_URL}/api/product/products`)
            .then(res => {
                setProducts(res.data.msg)
            })


        /*     *****    GET ALL USERS    *****      */
        axios.get(`${API_URL}/api/admin/users`)
            .then(res => {
                //data.msg[0].name
                // console.log(res.data)
                setUsers(res.data.msg)
            })

    }, [changeAfterDelete])

    const changeUserPermission = (e, user) =>{
        // console.log(e, user.isAdmin)
        const isAdmin = user.isAdmin
        console.log(isAdmin)
        if(e==false&&isAdmin==true || e==true&&isAdmin==false){
            axios.put(`${API_URL}/api/admin/${user._id}`, {isAdmin: isAdmin})
            .then(res=>{
                console.log(res)
            })
        }
    }

    /*    *****    DELETE ARTICLE    *****       */
    const deleteArticle = (article) => {
        // console.log(article)
        const articleId = article._id;
        axios.delete(`${API_URL}/api/article/${articleId}`)
            .then(data => {
                // console.log(data)
                setChangeAfterDelete(!changeAfterDelete)
            })
    }

    /*    *****    DELETE PRODUCT    *****       */
    const deleteProduct = (product) => {
        console.log(product._id)
        const productId = product._id;
        axios.delete(`${API_URL}/api/admin/${productId}`)
            .then(data => {
                // console.log(data)
                setChangeAfterDelete(!changeAfterDelete)
            })
    }
    /*    *****    DELETE USER    *****       */
    const deleteUser = (user) => {
        console.log(user._id)
        const userId = user._id;
        axios.delete(`${API_URL}/api/admin/${userId}/deleteuser`)
            .then(data => {
                // console.log(data)
                setChangeAfterDelete(!changeAfterDelete)
            })
    }


    /*    *****    MAP ALL ARTICLES    *****       */
    const allArticles = articles.map(article => {
        // console.log(article)

        return (
            <>
                <div className='content-container'>
                    <img
                        src={article.img}
                        alt=""
                    />
                    <h5 className="container-title">{article.title}</h5>
                    {/* <p>{article.content}</p> */}

                    <p className="admin-delete-btn" onClick={() => deleteArticle(article)}>X</p>
                </div>
            </>
        )
    })


    /*    *****    MAP ALL PRODUCTS    *****       */
    const allProducts = products.map(product => {

        return (
            <>
                <div className='content-container'>
                    <img
                        src={product.img}
                        alt=""
                    />
                    <h5 className="container-title">{product.title}</h5>

                    <p className="admin-delete-btn" onClick={() => deleteProduct(product)}>X</p>
                </div>
            </>
        )
    })


    /*    *****    MAP ALL USERS    *****       */
    const allUsers = users.map(user => {

        return (
            <>
                <div className='content-container'>
                    <img
                        src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'
                        alt=""
                    />
                    <h5 className="container-title">Name: {user.name}, Email: {user.email}, </h5> 

                    <p style={{ marginTop: '12px', float: 'left', marginRight:'10px', fontSize:'18px' }}>Admin: </p>
                    
                    <BootstrapSwitchButton
                        checked={user.isAdmin}
                        onlabel='Yes'
                        offlabel='NO'
                        onChange={(e)=>changeUserPermission(e,user)}
                    />

                    <p className="admin-delete-btn" onClick={() => deleteUser(user)}>X</p>
                </div>
            </>
        )
    })


    /*    *****    RENDER ADMIN PAGE    *****       */

    if (!props.auth.isLoggedIn) {
        return (
            <>
                <div class="alert alert-danger" role="alert">
                    <strong>Oh !!!</strong> <Link to="/login" class="alert-link">You have to login first</Link> and try submitting again.
                </div>
            </>
        )
    } else if (!props.auth.currentUser.isAdmin) {
        return (
            <>
                <div class="alert alert-warning" role="alert">
                    <strong>Oh !!!</strong> <Link to="/" class="alert-link">You dont have permission</Link>  to access this page.
                </div>
            </>
        )
    } else {
        return (
            <div className="dashboard-container ">

                <h1>Articles</h1>
                <div className='admin-container'>

                    {allArticles}

                </div> <br />

                <h1>Products</h1>
                <div className='admin-container'>
                    {allProducts}
                </div> <br />

                <h1>Users</h1>
                <div className='admin-container'>
                    {allUsers}
                </div>
            </div>
        )
    }

}
