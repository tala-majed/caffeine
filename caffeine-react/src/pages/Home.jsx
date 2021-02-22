import API_URL from '../apiConfig.js'
import React from "react";
import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import axios from "axios";
import { Link } from 'react-router-dom';
import LinesEllipsis from 'react-lines-ellipsis'

export default function Home(props) {
  const [articles, setArticles] = useState([])

  useEffect(() => {
    axios.get(`${API_URL}/api/article/`)
      .then(res => {
        setArticles(res.data.msg)
      })
  }, [])

  articles.sort((b, a) => a.views - b.views)
  const allArticles = articles.map((article,i) => {

    // console.log(article)
    if(i < 3){
    return (
      <Link
      key={i}
      onClick={() =>{
        props.setSelectArticle(article)}
      }
       to={`/${article._id}/article`}
       style={{textDecoration:'none'

    }}>
        <div
         className="art"
         style={{
           backgroundImage: `url(${article.img})`,
           backgroundSize: 'cover'
           }} >
          <div className="img-artcile-shadow"/>
          <div style={{
            width: '100%',
            hight: '40%',
            position: 'absolute',
            bottom: '0',
            margin: '0px 0px 0px 5px'
          }}>
          <p className="art-title"   
           >
             {article.title}
           </p>
          </div>
        </div>
      </Link>
    )
  }
  })



  return (
    <div className="Home">
      <Container fluid className="container-section-ov">
        <Row>
          <div  className="header-img" >
             <div className="img-shadow"/>
             <h1 style={{
               backgroundColor: 'rgba(0, 0, 0, 0.418)',padding: '15px'
             }}>Welcome to caffeine for coffee lovers

           </h1>
            <p style={{

              position: 'absolute',
              bottom: '30px',
              color: 'white',
              backgroundColor: 'rgba(0, 0, 0, 0.418)',
              maxWidth: '90%',
              marginLeft: '40px'
            }}>Caffeine enables users to buy and sell coffee products. Not only that but also enables
           them to share articles and read other users articles
           </p>
            </div>
        </Row>
        <Row>
          <div className="article-header">
            <Link to="/articles" style={{textDecoration:'none'}}> <h1>Articles</h1> </Link>
          </div>
        </Row>
        <Row>
          <div className="article-section">

            {allArticles}


          </div>
        </Row>


        <Row>
          <div className="article-section">



          </div>
        </Row> 


        <Row>
          <div >

           

          
          </div>
        </Row>
      </Container>
    </div>
  );
}