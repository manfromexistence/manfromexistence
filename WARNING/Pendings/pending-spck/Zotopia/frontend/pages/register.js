import React, {useState} from 'react'; 
import Head from 'next/head'





export default function Register({data, error}) {
    const [user,setUser] = useState({
        name:'',email:'',work:'',phone:'',password:'',cpassword:''
    });
    
    // handleInputs
    let name, value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;
        // Setuser
        setUser({...user, [name]:value});
        console.log('Input changed!');
    };
    // Postdata
    const handlePost = async () => {
        // let userdata = [user.name, user.email, user.work, user.phone, user.password, user.cpassword];
        // let actuall1 = user.name;
        // return console.log(actuall1)
        let data = [];
        let error = "";
        try {
            const res = await fetch(
                    "https://express-backend1o1.herokuapp.com/register", {
                    method: "POST",
                    headers: {
                        // update with your user-agent
                        // "Access-Control-Allow-Headers",
                        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36",
                        Accept: "application/json; charset=UTF-8",
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "name": `${user.name}`,
                        "email": `${user.email}`,
                        "work": `${user.work}`,
                        "phone": `${user.phone}`,
                        "password": `${user.password}`,
                        "cpassword":`${user.cpassword}`
                    })
                }
            );
            data = await res.json();
            if (res.status === 404) {
                console.log('noooooo');
            }            
            if (res.status === 500 || !data) {
                console.log('noooooo');
            }
            else {
                console.log('oppp');

            }
            if (typeof window !== "undefined") {
                window.alert('Registration successful');
            }
        } catch (e) {
            error = e.toString();
        }
        return {
            props: {
                data,
                error,
            },
        }
    }

    return (
        <>
            <Head>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Harry1o1/pro-components/frontend/styles/Sass/Css/register4.css" type="text/css" media="all" />
            </Head>
            <h1>Signup</h1>
            <input type="text" name="name" id="name"  placeholder="Name" className="form-control1" autoComplete="off"  value={user.name} onChange={handleInputs}/>
            <input type="email" name="email" id="email"  placeholder="Email" className="form-control2" autoComplete="off"  value={user.email} onChange={handleInputs}/>
            <input type="text" name="work" id="work"  placeholder="Work" className="form-control3" autoComplete="off"  value={user.work} onChange={handleInputs}/>
            <input type="number" name="phone" id="phone"  placeholder="Phone" className="form-control4" autoComplete="off"  value={user.phone} onChange={handleInputs}/>
            <input type="password" name="password" id="password"  placeholder="Password" className="form-control5" autoComplete="off"  value={user.password} onChange={handleInputs}/>
            <input type="password" name="cpassword" id="cpassword"  placeholder="Cpassword" className="form-control6" autoComplete="off"  value={user.cpassword} onChange={handleInputs}/>
            
            <div className="btn" onClick={handlePost}>
                Confrom
            </div>
            {error && <p>{error}</p>}
            <pre>
                <code>{JSON.stringify(data, null, 4)}</code>
            </pre>
            <h1 className="login-h1">Hai what's happen!!!</h1>
        </>
    )
}; 
























    // export async function getStaticProps() {
    //   let data = [];
    //   let error = "";
      
    //   try {
    //     const res = await fetch(
    //         "https://express-backend1o2.herokuapp.com/register",{
    //         method: "POST",
    //         headers: {
    //           // update with your user-agent
    //           "User-Agent":
    //             "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36", 
    //           Accept: "application/json; charset=UTF-8",
    //           'Content-Type':'application/json'
    //         },
    //         body: JSON.stringify({
    //             "name": "Emon",
    //             "email": "ajju40959@203gmail.com",
    //             "work": "YouTuber",
    //             "phone": "01722595705",
    //             "password": "Robin123@!",
    //             "cpassword": "Robin123@!"
    //         })}
    //     );
    //     data = await res.json();
    //     if (res.status === 500 || !data) {
    //         console.log('noooooo');
    //     }
    //     else {
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

    // const postInputs = async (e) => {
    //     const {name, email, work, phone, password, cpassword} = user;
    //     try {
    //         const Postres = await fetch('https://mocki.io/v1/48d60718-251c-4b1b-92c8-2f4bc95ff936',{
    //         method:'POST',
    //         headers:{
    //             // update with your user-agent
    //             "User-Agent":
    //                 "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36", 
    //                 Accept: "application/json; charset=UTF-8",
    //             'Content-Type':'application/json'
    //         },
    //         body:JSON.stringify({
    //             // name, email, work, phone, password, cpassword
    //             "name": "Emon",
    //             "email": "ajju40959@5gmail.com",
    //             "work": "YouTuber",
    //             "phone": "01722595705",
    //             "password": "Robin123@!",
    //             "cpassword": "Robin123@!"
    //         })})
            
            
    //         const Postdata = await Postres.json();
    //         if (res.status === 200 || !Postdata) {
    //             console.log('Invalid Registration');
    //         } 
    //         else {
    //           console.log("Registration Successful!");
    //         }   
            
            
            
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }






// async function getStaticProps() {
//   let data = [];
//   let error = "";
//   try {
//     const res = await fetch(
//         "https://express-backend1o2.herokuapp.com/register",{
//         method: "POST",
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
//             "email": "ajju40959@200gmail.com",
//             "work": "YouTuber",
//             "phone": "01722595705",
//             "password": "Robin123@!",
//             "cpassword": "Robin123@!"
//         })}
//     );
//     data = await res.json();
//     if (res.status === 500 || !data) {
//         console.log('noooooo');
//     }
//     else {
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
