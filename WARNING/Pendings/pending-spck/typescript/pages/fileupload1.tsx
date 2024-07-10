import axios from 'axios'
// let video = new FormData();



function Fileupload1({vufool} : {vufool : any}) {
    
    // let formData = new FormData();
    
    const handleVideo = (e:any) => {
        console.log(e.target.files[0]);
        // if (e.target && e.target.files[0]) {
        //     video.append('file', e.target.files[0])
            
        // }
        // const vufool = e.target.files[0];
        // return {
        //     props: {
        //         vufool
        //     }    
        // }
    }
    
    // const videUpload = () => {
    //     axios.post(
    //         'https://v2.cenvertapi.com/upload',
    //         { video }
    //     )
    //     .then( (res) => {
    //         console.log(res);
    //     })
    //     .catch( (err) => {
    //         console.log(err);
    //     })
    // }
    
  return (
    <>
            
            
            <input type="file" name="video" id="video" onChange={ handleVideo }/>
            <button 
            // onClick=
            // { videUpload }
            >Click me</button>    
            
    </>
  );
}



export default Fileupload1;