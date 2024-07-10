import React, { useState } from 'react'
import axios from "axios"


function Addpost() {
  const [title, setTitle] = useState('dfv')
  const [picture, setPicture] = useState('');


  const handlesubmit = (e:any) => {
    e.preventDefault();
    let form_data = new FormData();
    form_data.append('video', picture);
    form_data.append('name', title);
    
    let url = 'https://pro-component-django1o1.herokuapp.com/video/vc';
    axios.post(url, form_data, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }).then(res => {
      console.log(res.data);
    })
    // .catch(err) => console.log(err);
  };




  return (
    <div>
      <div>
        <h1>Add new posts </h1>
        <form onSubmit={handlesubmit} >
          <h2 onChange={(e:any) => setTitle(e.target.value)}/>
          <div >
            <h1 color="primary">Upload an Image </h1>
            <input type="file" accept="image/png, image/jpeg" onChange={(e:any) => { setPicture(e.target.files[0]) }} />
            <input type="submit" />
          </div>
        </form>
      </div>
        <img src={picture?URL.createObjectURL(picture):""} />
   </div>
  )
}

export default Addpost

