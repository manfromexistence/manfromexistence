import Head from 'next/head'
let emon;



export default function Home() {
    emon = 'Home';

    
    if (typeof window !== "undefined") {
        window.alert(emon);
    }
    
  return (
      <>
            <h1 className="text-center">Home</h1>
      </>
    )
    
    
}


console.log(emon);