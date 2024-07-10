import Head from 'next/head'
import { useState, useEffect } from "react";
import axios from "axios";



    export default function Login() {
        const [students, setStudents] = useState([])
            useEffect(()=>{
              async function getAllStudent(){
              try {
                const res = await axios.get("https://express-backend1o1.herokuapp.com/register")
                console.log(res.data)
                setStudents(res.data)
              } catch (error) {
                console.log(error)
              }
            }
            getAllStudent()
        }, [])
        
        return (
           <>
                <Head>
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Harry1o1/pro-components/frontend/styles/Sass/Css/login4.css" type="text/css" media="all" />
                </Head>
                <input type="text/submit/hidden/button/image" name="" id=""  placeholder="Email" className="form-control "/>
                <input type="text/submit/hidden/button/image" name="" id="" placeholder="Password" className="form-control"/>
                {console.log('°==°')}
                
                <h1 className="login-h1">Hai what's happen!!!</h1>
                
           </>
        )
    }; 
