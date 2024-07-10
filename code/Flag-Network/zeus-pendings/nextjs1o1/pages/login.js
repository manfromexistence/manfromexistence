import Link from 'next/link'
import Script from 'next/script'
import Head from 'next/head'
import Image from 'next/image'


import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';


// const provider_options = {
//     walletconnect:{
//         package:WalletConnectProvider,
//         potions:{
//             infuraId:'27e484dcd9e3efcfd25a83a78777cdf1'
//         }
//     }
// }


const provider = new WalletConnectProvider({
  infuraId: "27e484dcd9e3efcfd25a83a78777cdf1",
  qrcodeModalOptions: {
    mobileLinks: [
      "rainbow",
      "metamask",
      "argent",
      "trust",
      "imtoken",
      "pillar",
    ],
  },
});
if(typeof window !== 'undefined'){
    
    const web3modal = new Web3Modal({
        
        network:'mainnet',
        cahceProvider:true,
        providerOptions: provider,
        
    })
    
    
    

}

export default function Temporary_Join_Signin(){
  return (
    <>
        
        
        <div id="join-signin_container">
          <div className="forms ">
            <div id="join-container">
              <h1>Join Hello</h1>
              <div id="input-container1" className="input-containers">
                <div className="icons">
                  <ion-icon name="person-outline" />
                </div>
                <input type="search" name="op1o1" placeholder="Enter Name" id="op1o1" />
              </div>
              <div id="input-container2" className="input-containers">
                <div className="icons">
                  <ion-icon name="mail-outline" />
                </div>
                <input type="search" name="op1o1" placeholder="Enter Email" id="op1o1" />
              </div>
              <div id="input-container5" className="input-containers">
                <div className="icons">
                  <ion-icon name="key-outline" />
                </div>
                <input type="search" name="op1o1" placeholder="Enter Password" id="op1o1" />
              </div>
              <div id="input-container6" className="input-containers">
                <div className="icons">
                  <ion-icon name="refresh-outline" />
                </div>
                <input type="search" name="op1o1" placeholder="Enter Cpassword" id="op1o1" />
              </div>
              <div id="others-container">
                <div id="btn">Next</div>
                <div id="or-container">
                  <div id="line1" />
                  <h1> or </h1>
                  <div id="line2" />
                </div>
                <div id="wallet_connect-login-container" onClick={async()=>{
                    const provider = await web3modal.connect();
                    const web3 = new Web3(provider);
                }}>
                  <div id="wallet_connect-login-button">
                    Connect to WalletConnect
                  </div>
                </div>
                <div id="social-login-container">
                  <div id="social_login_header">
                    <Image src="/Google.png" alt="google-icon" width={48} height={48} />
                    <Image src="/Facebook.png" alt="linkedin-icon" width={48} height={48} />
                    <div className="circle">
                      <ion-icon name="caret-down" />
                    </div>
                  </div>
                  <div id="social_login_toolbar">
                    <Image src="/Discord.png" alt="google-icon" width={48} height={48} />
                    <Image src="/Messanger.png" alt="linkedin-icon" width={48} height={48} />
                    <Image src="/Linkedin.png" alt="Linkin" width={48} height={48} />
                  </div>
                </div>
                <h2>Already a membar?<a href="#" id="join_toggle" className="join_signin_toggle">Signin</a></h2>
              </div>
            </div>
            <div id="signin-container">
              <h1>Signin Hello</h1>
              {/* <div id="input-container1" class="input-containers">
                      <ion-icon name="person-outline"></ion-icon>
                      <input type="search" name="op1o1" placeholder="Enter Name" id="op1o1">
                  </div> */}
              <div id="input-container2" className="input-containers">
                <div className="icons">
                  <ion-icon name="mail-outline" />
                </div>
                <input type="search" name="op1o1" placeholder="Enter Email" id="op1o1" />
              </div>
              <div id="input-container3" className="input-containers">
                <div className="icons">
                  <ion-icon name="key-outline" />
                </div>
                <input type="search" name="op1o1" placeholder="Enter Password" id="op1o1" />
              </div>
              <div id="others-container">
                <div id="btn">Next</div>
                <div id="or-container">
                  <div id="line1" />
                  <h1> or </h1>
                  <div id="line2" />
                </div>
                <div id="wallet_connect-login-container">
                  <div id="wallet_connect-login-button">
                    Connect to WalletConnect
                  </div>
                </div>
                <div id="social-login-container">
                  <div id="social_login_header">
                    <Image src="/Google.png" alt="google-icon" width={48} height={48} />
                    <Image src="/Facebook.png" alt="linkedin-icon" width={48} height={48} />
                    <div className="circle">
                      <ion-icon name="caret-down" />
                    </div>
                  </div>
                  <div id="social_login_toolbar">
                    <Image src="/Discord.png" alt="google-icon" width={48} height={48} />
                    <Image src="/Messanger.png" alt="linkedin-icon" width={48} height={48} />
                    <Image src="/Linkedin.png" alt="Linkin" width={48} height={48} />
                  </div>
                </div>
                <h2>Not a membar?<a href="#" id="signin_toggle" className="join_signin_toggle">Join</a></h2>
              </div>
            </div>
          </div>
        </div>





















      <Script
        src="https://cdn.jsdelivr.net/gh/Harry1o1/Demo/nextjs1o2/containers/Join&Signin/main.js"
        strategy="beforeInteractive"
      />

      <Head>
        <title>LetWorkBeDone</title>
        <meta name="description" content="Generated by create next app" />

        
        <link href="https://cdn.jsdelivr.net/gh/Harry1o1/Demo/nextjs1o2/containers/Join&Signin/style1o1.css" rel="stylesheet" />

        
        
        

      </Head>

    </>
  );
};

