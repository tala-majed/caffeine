import API_URL from '../apiConfig.js'
import React from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";


export default function UserProfile(props) {
    const { name, email, _id } = props.auth.currentUser;
    const [updateProfile , setUpdateProfile] = useState({})
    const [UserForProfile, setUserForProfile] = useState({});


    const uploadImageHundler = (e) => {
        var format = new FormData()
        format.append("image", e.target.files[0])
        axios.post("https://api.imgur.com/3/image/", format, { headers: { "Authorization": "Client-ID 6cd46bc903efe25" } })
          .then(data =>{

            setUserForProfile(UserForProfile);
            const img={img: data.data.data.link}
            axios.put(`${API_URL}/api/user/profile/info/${_id}`,img)
            .then((res) => {
            
 
           
              console.log(UserForProfile)
        
            }).catch(err=>{console.log(err)})
        
           
        })
      } 
      
      

    
   
    
      useEffect(() => {
        
          axios.get(`${API_URL}/api/user/users`).then((res) => {
            let UserForProfile = res.data.msg.find((ele) => ele._id == _id);
            console.log("from user profile"+res.data.msg)
            setUserForProfile(UserForProfile);
          });
        
        
      }, );

    return (




<div className="cont">
    
<div className="form">
<form>
          <h3>My Profile</h3>
          <div className="profileIMG">  <img width="70" height="70" src={UserForProfile.img} alt="" srcset="" /></div>
          <hr/>
          <div className="form-group">

        
              <label>Image:  </label>
        
              &nbsp;  <input
               type="file"
                name="image"
                 placeholder="image"
                 onChange={uploadImageHundler}
                 ></input>
          </div>


          <div className="form-group">
              <label>Name:  </label>
             
              <label> &nbsp; { name } </label>
             
          </div>
        

          <div className="form-group">
              <label>Email address: </label>
             
              <label> &nbsp; {email} </label>
          </div>

         
      </form>
      </div>
      </div>
    )
  }
  