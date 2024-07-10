/* Moralis init code */
const serverUrl = "https://a2pko6dyqtwq.usemoralis.com:2053/server";
const appId = "D0r1DA19TTZvr6CiWdB3sjDDE0Y71EFasRNLP12a";
Moralis.start({ serverUrl, appId });

/* Authentication code */
async function login() {
    let user = Moralis.User.current();
    if (!user) {
    
            const user = await Moralis.authenticate({ provider: "walletconnect" })
            .then(function(user) {
                console.log("logged in user:", user);
                console.log(user.get("ethAddress"));
            })
            .catch(function(error) {
                console.log(error);
            });
    }
}

async function logOut() {
    await Moralis.User.logOut();
    console.log("logged out");
}

document.getElementById("btn-login").onclick = login;
document.getElementById("btn-logout").onclick = logOut;
