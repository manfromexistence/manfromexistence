import { createPublicClient, createWalletClient, http, custom } from 'viem'
import { mainnet } from 'viem/chains'
 
export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(),
})

let customResult:any;

// if (typeof window !== 'undefined') {
//   // Code that needs the window object (e.g., access window.location)
//   console.log(window.location.href);
//   customResult = window.ethereum!;

// } else {
//   // Optional: Handle server-side rendering if needed
//   console.log("hi");
//   customResult = "hidsafl;safjkla;";

// }

// export const walletClient = createWalletClient({
//   chain: mainnet,
//   transport: http()

// })

// export const [account] = await walletClient.getAddresses()