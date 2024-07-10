import Script from 'next/script'
import Navbar1 from './Navbar1'
import Head from 'next/head'


export default function Layout() {
    // Custom css
    
    return (
        <>
            <Navbar1 />
            <Head>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"/>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@ionic/core/css/ionic.bundle.css"/>
            </Head>
            <Script src="https://cdn.jsdelivr.net/gh/Harry1o1/pro-components/frontend/styles/Sass/JavaScript/global.js"  type="module" strategy="beforeInteractive" />
            <Script src="https://cdn.jsdelivr.net/npm/@ionic/core/dist/ionic/ionic.js"  type="module" strategy="beforeInteractive" />
            <Script src="https://cdn.jsdelivr.net/npm/@ionic/core/dist/ionic/ionic.esm.js"  type="module" strategy="beforeInteractive" />
            
        </>
    )
};
    
