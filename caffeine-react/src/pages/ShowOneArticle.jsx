import API_URL from '../apiConfig.js'
import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from 'axios'
import { Button, Modal } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import DateRangeIcon from '@material-ui/icons/DateRange';


export default function ShowOneArticle(props) {
    const history = useHistory();
    const { article_id } = useParams()
    const [selectArtcile, setSelectArticle] = useState(props.selectArtcile)
    const { title, img, content , createdAt } = selectArtcile

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showEdit, setShowEdit] = useState(false);
    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);

    const [updateArticle, setUpdateArticle] = useState({ title: selectArtcile.title, content: selectArtcile.content, img: selectArtcile.img });
    const articleId = selectArtcile._id;

    const artDateMongodb = new Date(createdAt);
    let year = artDateMongodb.getFullYear();
    let month = artDateMongodb.getMonth()+1;
    let dt = artDateMongodb.getDate();
    if (dt < 10) {
        dt = '0' + dt;
      }
      if (month < 10) {
        month = '0' + month;
      }
    const artDate = year+'-' + month + '-'+dt;
    useEffect(() => {
        if (!title) {
            axios.get(`${API_URL}/api/article/`)
                .then(res => {
                    let article = res.data.msg.find(ele => ele._id == article_id)
                    setSelectArticle(article)
                    //data.msg[0]._id
                    console.log(res.data)
                    oneArticleViews(article_id)
                })


            
        }

    }, [])

    const oneArticleViews = (articleId) => {
        axios
        .put(`${API_URL}/api/article/views/${articleId}`)
        .then((res) => {
          // setOneArticleViwer('done')
          console.log("done");
        })
        .catch((err) => {
          console.log(err);
        });
      }

    const deleteArticle = (articleId) => {

        axios.delete(`${API_URL}/api/article/${articleId}`)
            .then(data => {

                history.push('/articles')
            })
    }

    const onChangeArticle = (e) => {
        console.log("event",e.target)
        const { name, value } = e.target;
        setUpdateArticle({
            ...updateArticle,
            [name]: value,
        });

        console.log(updateArticle)
    };

    const editArticle = (articleId) => {
        
        console.log(selectArtcile)
        axios.put(`${API_URL}/api/article/${articleId}/edit`, {...updateArticle, id: props.auth.currentUser._id })
            .then(data => {

                history.push('/articles')
            })
    }

    return (
        <>
             {selectArtcile.user?
              <div className="ShowOneArticle" style={{width:'50%', height:'500px', margin:'0 auto 700px auto'}}>
               <h1>{title}</h1>
               <div
               style={{display: 'flex'}}
               >
               <p 
               style={{margin: '10px'}}
               >created at {artDate}</p>
               <p
               style={{margin: '10px'}}
               >by: {selectArtcile.user.name} </p>
               <p
               style={{margin: '10px'}}
               >views: {selectArtcile.views}</p>
               </div>
               <p><DateRangeIcon /> {artDate}   <VisibilityOutlinedIcon /> {selectArtcile.views}</p>

               <hr/>
            <img style={{height:'500px', width:'100%'}}
                src={img}
                alt=""
              />
              

               <p>{content}</p>
                

                {props.auth.isLoggedIn ? <>

                    {props.auth.currentUser._id === selectArtcile.user._id ? <>

                       
                      <Button
                        style={{marginBottom: '400px'}}
                      className="float-right" variant="outline-warning" onClick={handleShow}>Delete</Button>
                        <CreateOutlinedIcon style={{fontSize: "25px", color: "#7d8179", cursor:"pointer",  fontSize:"40px"}} className="mr-5 float-right" variant="outline-info" onClick={handleShowEdit}/>  
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Confirm Delete</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Are you sure you want to delete this article</Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={() => deleteArticle(articleId)}>
                                    Delete
                                </Button>
                            </Modal.Footer>
                        </Modal>

                        <Modal size="lg" show={showEdit} onHide={handleCloseEdit}>
                            <Modal.Header closeButton>
                                <Modal.Title>Edit Article</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <input type="text" name="title" size="80" defaultValue={selectArtcile.title} onChange={(e) => onChangeArticle(e)} /> <br/> <br/>
                                <textarea rows="8" cols="80" type="text" name="content" defaultValue={selectArtcile.content} onChange={(e) => onChangeArticle(e)} /> <br/>
                                <input type="text" size="80" name="img" defaultValue={selectArtcile.img} onChange={(e) => onChangeArticle(e)} />
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseEdit}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={() => editArticle(articleId)}>
                                    Edit
                                </Button>
                            </Modal.Footer>
                        </Modal>

                    </> : <>

                        </>} </> : <></>}

            </div>
           :<></>}
        </>
    )
}
