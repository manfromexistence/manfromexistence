import React from 'react';
import Image from 'next/image'
// import { Counter } from '../redux-src/features/counter/Counter';
import axios from 'axios'



    


function App() {
    
    // let formData = new FormData();
    
    // const handleVideo = (e:any) => {
    //     console.log(e.target.files[0]);
    // }

    // formData.append('video', 'video_20211215_114025_gzBahoC.mp4')
    // formData.append('name', 'jjj')    
    //  const headers = {
    //           'Content-Type' : 'multipart/form-data'
    //   }

       
       
    // const videUpload = () => {
    //     console.log(formData);
    //     axios.post(
    //         'https://pro-component-django1o1.herokuapp.com/video/vc',formData,{headers }  
    //     )
    //     .then( (res) => {
    //         console.log(res);
    //     })
    //     .catch( (err) => {
    //         console.log('error');
    //     })
    // }
    
    
    
    
    

  return (
    <div className="App">
      <header className="App-header">
        <Image src="/logo.svg" alt="Vercel Logo" width={72} height={16} />
        <Image src="/vercel.svg" alt="Vercel Logo" width={200} height={86} />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
            
      
    </div>
    
  );
}

export default App;





            // <button >Click me</button>    
            // <input type="file" name="video" id="video" onChange={ handleVideo }/>



    //   {  <img src={logo} className="App-logo" alt="logo" /> }
