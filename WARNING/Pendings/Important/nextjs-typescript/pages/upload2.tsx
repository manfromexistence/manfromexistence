import React, { useState } from 'react'
import axios from "axios"


function Addpost() {
  const [title, setTitle] = useState('dfv')
  const [picture, setPicture] = useState('');




const handlevideo = (e:any) => {
    e.preventDefault();
    let data = new FormData();
    data.append('file', picture);
    data.append('upload_preset', 'ml_default')
    data.append('cloud_name', 'SpaceX')
    let url = 'https://api.cloudinary.com/v1_1/SpaceX/image/upload';
    axios.post(url, data, )
    .then(res => {
      console.log(res.data);
    })
    // .catch(err:any) {
        // console.log(err)
    // }
};









    



  return (
   <>
      <div>
        <h1>Add new posts </h1>
        <form
        onSubmit={ handlevideo }
        >
          <h2 onChange={(e:any) => setTitle(e.target.value)}/>
          <div >
            <h1 color="primary">Upload an Image </h1>
            <input type="file" accept="image/png, image/jpeg" onChange={(e:any) => { setPicture(e.target.files[0]) }} />
            <input type="submit"
            />
          </div>
        </form>
      </div>
        <img src={picture?URL.createObjectURL(picture):""} />
   </>
  )
}

export default Addpost

