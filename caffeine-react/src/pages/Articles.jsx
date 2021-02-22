import API_URL from "../apiConfig.js";
import React from "react";
import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import LinesEllipsis from "react-lines-ellipsis";
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import DateRangeIcon from '@material-ui/icons/DateRange';


export default function Articles(props) {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    axios.get(`${API_URL}/api/article/`).then((res) => {
      setArticles(res.data.msg);
    });
  }, []);


articles.sort((b, a) => a.views - b.views)

  // sort array of objects (articles) by bigest views to lower.

  console.log("articles ", articles);

  const oneArticleViews = (articleId) => {
    // axios
    // .put(`http://localhost:5000/api/article/views/${articleId}`)
    // .then((res) => {
    //   // setOneArticleViwer('done')
    //   console.log("done");
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
  }

  const allArticles = articles.map((article, i) => {
    const artDateMongodb = new Date(article.createdAt);
    let year = artDateMongodb.getFullYear();
    let month = artDateMongodb.getMonth() + 1;
    let dt = artDateMongodb.getDate();
    if (dt < 10) {
      dt = "0" + dt;
    }
    if (month < 10) {
      month = "0" + month;
    }
    const artDate = year + "-" + month + "-" + dt;

    return (
      <Link
        key={i}
        onClick={() => {
          oneArticleViews(article._id);
        }}
        to={`/${article._id}/article`}
        style={{ textDecoration: "none"}}
      >
        <div 
        style={{ color: "black"}}
        className="article-content">
          <img src={article.img} alt="" />
          <h1>{article.title}</h1>
          <LinesEllipsis
            className="content"
            text={article.content}
            maxLine="3"
            ellipsis="....  (Read More)"
            trimRight
          />
          <br/>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <p style={{ fontSize: "0.7em", marginRight: "30px" }}>
            <DateRangeIcon /> {artDate}
            </p>
            <p style={{ fontSize: "0.7em" }}><VisibilityOutlinedIcon /> {article.views}</p>
          </div>
        </div>
      </Link>
    );
  });

  console.log('All articles:::', allArticles)

  return (
    <div className="Articles">
      <Container fluid className="article-container-section">
        <Row>
          <div className="article-page">{allArticles}</div>
        </Row>
      </Container>
    </div>
  );
}
