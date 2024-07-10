// import Head from 'next/head'
// import { useState, useEffect } from "react";
// import axios from "axios";



// export default function Login() {
//     const [students, setStudents] = useState([])
//     useEffect(()=>{
//       async function getAllStudent(){
//       try {
//         const students = await axios.get("https://express-backend1o1.herokuapp.com/register")
//         console.log(students.data)
//         setStudents(students.data)
//       } catch (error) {
//         console.log(error)
//       }
//     }
//     getAllStudent()
//   }, [])

    
    
//     return (
//         <>
//             <Head>
//                 <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Harry1o1/pro-components/frontend/styles/Sass/Css/login4.css" type="text/css" media="all" />
//             </Head>
//             <input type="text/submit/hidden/button/image" name="" id=""  placeholder="Email" className="form-control "/>
//             <input type="text/submit/hidden/button/image" name="" id="" placeholder="Password" className="form-control"/>
//             {console.log('°==°')}
            
//             <h1 className="login-h1">Hai what's happen!!!</h1>
            
//         </>
//     )
// }; 





//   <pre>
                // <code>{JSON.stringify(loginData, null, 4)}</code>
            // </pre>
          

// export async function getStaticProps() {
//   let registerData = [];
//   let loginData = [];
//   let error = "";
//   try {
//     const loginRes = await fetch(
//       "https://express-backend1o2.herokuapp.com/register",{
//         method: "GET",
//         headers: {
//           // update with your user-agent
//           "User-Agent":
//             "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36", 
//           Accept: "application/json; charset=UTF-8",
//           'Content-Type':'application/json'
//         },
//     });
    
//     loginData = await loginRes.json();
    
//     // Register
//     if (!loginData) {
//         console.log('noooooo');
//     } else {
//         console.log('oppp');
//     }
//   } catch (e) {
//     error = e.toString();
//   }

//   return {
//     props: {
//       loginData,
//       error,
//     },
//   };
// }








// Feching data
// export async function getStaticProps(context) {
//   const res = await fetch(`https://express-backend1o1.herokuapp.com/`);
//   const data = await res.json();
  
//     if (!data) {
//         return {
//           notFound: true,
//         }
//     }
    
//     return {
//         props: { data }, // will be passed to the page component as props
//     }
// }
// export async function getStaticProps() {
//   let data = [];
//   let error = "";
//   try {
//     const res = await fetch(
//       "https://express-backend1o2.herokuapp.com/register",{
//         method: "GET",
//         headers: {
//           // update with your user-agent
//           "User-Agent":
//             "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36", 
//           Accept: "application/json; charset=UTF-8",
//           'Content-Type':'application/json'
//         },
//         body: JSON.stringify({
//             // name, email, work, phone, password, cpassword
//             "name": "Emon",
//             "email": "ajju40959@19gmail.com",
//             "work": "YouTuber",
//             "phone": "01722595705",
//             "password": "Robin123@!",
//             "cpassword": "Robin123@!"
//         })}
//     );
//     data = await res.json();
//     if (!data) {
//         console.log('noooooo');
//     } else {
//         console.log('oppp');
//     }
//   } catch (e) {
//     error = e.toString();
//   }

//   return {
//     props: {
//       data,
//       error,
//     },
//   };
// }
// function Index({ data, error }) {
//   return (
//     <>
//         {console.log('data')}
//       {error && <p>{error}</p>}
//       <pre>
//         <code>{JSON.stringify(data, null, 4)}</code>
//       </pre>
//       <h1 className="">All data</h1>
          
//     </>
//   );
// }






function Login() {
  return (
    <>
        <h1 className="">Hello from Login</h1>
    </>
  );
}




export default Login;

