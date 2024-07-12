let btn = document.querySelector('button');
async function hi(){
    
            const user = await Moralis.authenticate({ provider: "walletconnect" })
    console.log(user);
    console.log('op');
}    

// btn.addEventListener('click',login(),false);

