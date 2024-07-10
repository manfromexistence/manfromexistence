NEXT_PUBLIC_WALLETCONNECT="c9dc1818b014595e86d4e5e1effe46cf"
import React, { useEffect, useState } from "react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { useHuddle01 } from "@huddle01/react";
// import { publicProvider } from "wagmi/providers/public";
import { polygonMumbai } from "wagmi/chains";
import Context from "../contexts/context";
// import { WagmiConfig } from "wagmi";
// import { configureChains } from "wagmi";
// import { createClient } from "wagmi";
// import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { createPublicClient, http } from 'viem'
import { SignerContextProvider } from "@/contexts/signerContext";
import { StreamContextProvider } from "@/contexts/streamContext";
import { CurrentUserOrStreamerContextProvider } from "@/contexts/currUserOrStreamerContext";
// import { WagmiConfig, createConfig } from 'wagmi'
import { WagmiConfig, createConfig, configureChains, mainnet } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'

const {
  chains,
 publicClient,
 webSocketPublicClient
} = configureChains(
  [mainnet],
  [publicProvider()],
)
import { usePublicClient } from 'wagmi'
// const publicClient = usePublicClient()

// const config = createConfig({
//   autoConnect: true,
//  publicClient,
//  webSocketPublicClient
// })

// const { chains, provider } = configureChains(
//   [polygonMumbai],
//   [
//     jsonRpcProvider({
//       rpc: () => ({
//         http: "https://responsive-lively-brook.quiknode.pro/4bc6ee0cd8f90e1457df450bc756c10547be2f32",
//       }),
//     }),
//   ]
// );

// const { connectors } = getDefaultWallets({
//   appName: "My RainbowKit App",
//   projectId: process.env.NEXT_PUBLIC_WALLETCONNECT as string,
//   chains,
// });

const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: mainnet,
    ransport: http()
  })
});

// const wagmiClient = createClient({
//   autoConnect: true,
//   connectors,
//   provider,
// });

export default function App({ Component, pageProps }: AppProps) {
  const { initialize, isInitialized } = useHuddle01();
  const [roomId, setRoomId] = useState<string>("No Room Id");
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    // its preferable to use env vars to store projectId
    initialize(process.env.NEXT_PUBLIC_HUDDLE01_PROJECT_ID as string);
  }, []);

  return (
    // <WagmiConfig client={wagmiClient}>
    //   <RainbowKitProvider chains={chains}>
    //     <Context.Provider
    //       value={{
    //         roomId,
    //         setRoomId,
    //         loading,
    //         setLoading
    //       }}
    //     >
    //       <SignerContextProvider>
    //         <StreamContextProvider>
    //           <CurrentUserOrStreamerContextProvider>
    //             <Component {...pageProps} />
    //           </CurrentUserOrStreamerContextProvider>
    //         </StreamContextProvider>
    //       </SignerContextProvider>
    //     </Context.Provider>
    //   </RainbowKitProvider>
    // </WagmiConfig>
    <Context.Provider
      value={{
        roomId,
        setRoomId,
        loading,
        setLoading
      }}
    >
      <SignerContextProvider>
        <StreamContextProvider>
          <CurrentUserOrStreamerContextProvider>
            <Component {...pageProps} />
          </CurrentUserOrStreamerContextProvider>
        </StreamContextProvider>
      </SignerContextProvider>
      {/* <Component {...pageProps} /> */}

    </Context.Provider>
  );
}


import React, { useContext, useEffect, useState } from "react";
// import { ethers } from "ethers";
// import { Signer } from "ethers";
// import { BigNumber } from "ethers";

import { useAccount, useWalletClient } from "wagmi";
import contractConfig from "../config/contractConfig";
import nftContractConfig from "../config/nftContractConfig";
import { IUserData, IStreamerData, IStreamData } from "@/utils/types";
import { mainnet } from 'viem/chains'
import { Chain, EIP1193RequestFn, TransportConfig, getContract } from 'viem'
import { createPublicClient, createWalletClient, http, custom } from 'viem'
import { BigNumber } from "ethers";

// Viam Clients
const client = createPublicClient({
  chain: mainnet,
  transport: http(),
})
// const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
// const client = createWalletClient({
//   chain: mainnet, 
//   transport: http(),

// })


// const logs = await contract.getEvents.Transfer()
// const unwatch = contract.watchEvent.Transfer(
//   { from: contractConfig.address },
//   { onLogs(logs: any) { console.log(logs) } }
// )

export const SignerContext = React.createContext<{
  WalletClient: any | undefined | null;
  contract: any;
  nftContract: any;
  isUser: boolean;
  userData: IUserData | undefined;
  isStreamer: boolean;
  streamerData: IStreamerData | undefined;
  streamerBalance: number | undefined;
  livestreams: IStreamData[] | [];
  getLivestreamsData: () => Promise<void>;
  getContractInfo: () => Promise<void>;
}>({
  WalletClient: undefined,
  contract: undefined,
  nftContract: undefined,
  isUser: false,
  userData: undefined,
  isStreamer: false,
  streamerData: undefined,
  streamerBalance: undefined,
  livestreams: [],
  getLivestreamsData: async () => { },
  getContractInfo: async () => { },
});

export const useSignerContext = () => useContext(SignerContext);

export const SignerContextProvider = ({ children }: any) => {
  const { data: WalletClient, isError } = useWalletClient();
  const { address } = useAccount();
  const [contract, setContract] = useState<any>();
  const [nftContract, setNftContract] = useState<any>();
  const [isUser, setIsUser] = useState<boolean>(false);
  const [userData, setUserData] = useState<IUserData>();
  const [isStreamer, setIsStreamer] = useState<boolean>(false);
  const [streamerData, setStreamerData] = useState<IStreamerData>();
  const [streamerBalance, setStreamerBalance] = useState<number>();
  const [livestreams, setLivestreams] = useState<IStreamData[]>([]);

  const getContractInfo = async () => {
    // const contract: any = new ethers.Contract(
    //   contractConfig.address,
    //   contractConfig.abi,
    //   WalletClient as Signer
    // );
    // const nftContract: any = new ethers.Contract(
    //   nftContractConfig.address,
    //   nftContractConfig.abi,
    //   WalletClient as Signer
    // );
    // Contracts
    const contract = getContract({
      address: `0x${contractConfig.address}`,
      abi: contractConfig.abi,
      client: { public: client }
    })
    const nftContract = getContract({
      address: `0x${nftContractConfig.address}`,
      abi: nftContractConfig.abi,
      client: { public: client }
    })

    <!-- // const [isUser, totalSupply, symbol, tokenUri, balance] = await Promise.all([
    //   client.readContract({
    //     ...contractConfig,
    //     functionName: 'isUser',
    //   }),
    //   client.readContract({
    //     ...contractConfig,
    //     functionName: 'totalSupply',
    //   }),
    //   client.readContract({
    //     ...contractConfig,
    //     functionName: 'symbol',
    //   }),
    //   client.readContract({
    //     ...contractConfig,
    //     functionName: 'tokenURI',
    //     args: [420n],
    //   }),
    //   client.readContract({
    //     ...contractConfig,
    //     functionName: 'balanceOf',
    //     args: [address],
    //   }),
    // ])
     -->
    const isUserResult = await client.readContract({
      address:  `0x${contractConfig.address}`,
      abi: contractConfig.abi,
      functionName: 'isUser',
      args: [`0x${contractConfig.address}`]
    })
    const userDataResult = await client.readContract({
      address:  `0x${contractConfig.address}`,
      abi: contractConfig.abi,
      functionName: 'addToUser',
      args: [`0x${contractConfig.address}`]
    })

    const isUser: any = isUserResult;

    setIsUser(isUser);
    if (isUser) {
      const userData: any = await userDataResult;
      const bigNumberUserId = BigNumber.from(userData.userId);
      const userId = bigNumberUserId.toString();
      setUserData({
        ...userData,
        userId: userId,
        userAdd: userData.userAdd,
        name: userData.name,
        desp: userData.desp,
        profilePicture: userData.profilePicture,
        collection: userData.collection,
      });
    }

    const isStreamerResult = await client.readContract({
      address:  `0x${contractConfig.address}`,
      abi: contractConfig.abi,
      functionName: 'isStreamer',
      args: [`0x${contractConfig.address}`]
    })
    const streamerDataResult = await client.readContract({
      address:  `0x${contractConfig.address}`,
      abi: contractConfig.abi,
      functionName: 'streamerData',
      args: [`0x${contractConfig.address}`]
    })
    const streamerToBalanceResult = await client.readContract({
      address:  `0x${contractConfig.address}`,
      abi: contractConfig.abi,
      functionName: 'streamerToBalance',
      args: [`0x${contractConfig.address}`]
    })
    const isStreamer: any = await isStreamerResult;
    setIsStreamer(isStreamer);
    if (isStreamer) {
      const streamerData: any = await streamerDataResult;
      const bigNumberStreamerId = BigNumber.from(streamerData.streamerId);
      const streamerId = bigNumberStreamerId.toString();
      const bigTotalNfts = BigNumber.from(streamerData.totalNfts);
      const totalNfts = bigTotalNfts.toString();
      const bigNumberSubscribers = BigNumber.from(streamerData.subscribers);
      const subscribers = bigNumberSubscribers.toString();
      const streamerBalanceData = await streamerToBalanceResult;
      // const streamerBalance = parseFloat(streamerBalanceData) / 10 ** 18;
      const streamerBalance:any = streamerBalanceData;
      setStreamerBalance(streamerBalance);
      setStreamerData({
        ...streamerData,
        streamerId: streamerId,
        streamerAdd: streamerData.streamerAdd,
        name: streamerData.name,
        desp: streamerData.desp,
        nftImage: streamerData.nftImage,
        profilePicture: streamerData.profilePicture,
        totalNfts: totalNfts,
        categories: streamerData.categories,
        followers: streamerData.followers,
        subscribers: subscribers,
        isLive: streamerData.isLive,
      });
    }
    setContract(contract.read);
    setNftContract(nftContract.read);
  };

  const getLivestreamsData = async () => {
    //@ts-ignore
    const livestreamsData: IStreamData[] = await contract.getLiveStreams();
    console.log(livestreamsData);
    setLivestreams(livestreamsData);
  };

  useEffect(() => {
    if (WalletClient && address) {
      console.log("signerContext was called");
      // getContractInfo();
    }
  }, [WalletClient, address]);

  return (
    <SignerContext.Provider
      value={{
        WalletClient,
        contract,
        nftContract,
        isUser,
        userData,
        isStreamer,
        streamerData,
        streamerBalance,
        livestreams,
        getLivestreamsData,
        getContractInfo,
      }}
    >
      {children}
    </SignerContext.Provider>
  );
};















































    // const isUser: any = await publicClient.readContract({
    //   address: "0xB206ff81102e812240437A7E5411059837009cbE",
    //   abi: contractConfig.abi,
    //   functionName: 'isUser',
    //   args: address

    // })

    // if (isUser) {
    //   const userData: IUserData = await contract.addToUser(address);
    //   const bigNumberUserId = BigNumber.from(userData.userId);
    //   const userId = bigNumberUserId.toString();
    //   setUserData({
    //     ...userData,
    //     userId: userId,
    //     userAdd: userData.userAdd,
    //     name: userData.name,
    //     desp: userData.desp,
    //     profilePicture: userData.profilePicture,
    //     collection: userData.collection,
    //   });
    // }
    // const isStreamer: boolean = await contract.isStreamer(address);
    // setIsStreamer(isStreamer);
    // if (isStreamer) {
    //   const streamerData: IStreamerData = await contract.addToStreamer(address);
    //   const bigNumberStreamerId = BigNumber.from(streamerData.streamerId);
    //   const streamerId = bigNumberStreamerId.toString();
    //   const bigTotalNfts = BigNumber.from(streamerData.totalNfts);
    //   const totalNfts = bigTotalNfts.toString();
    //   const bigNumberSubscribers = BigNumber.from(streamerData.subscribers);
    //   const subscribers = bigNumberSubscribers.toString();
    //   const streamerBalanceData = await contract.streamerToBalance(address);
    //   const streamerBalance = parseFloat(streamerBalanceData) / 10 ** 18;
    //   setStreamerBalance(streamerBalance);
    //   setStreamerData({
    //     ...streamerData,
    //     streamerId: streamerId,
    //     streamerAdd: streamerData.streamerAdd,
    //     name: streamerData.name,
    //     desp: streamerData.desp,
    //     nftImage: streamerData.nftImage,
    //     profilePicture: streamerData.profilePicture,
    //     totalNfts: totalNfts,
    //     categories: streamerData.categories,
    //     followers: streamerData.followers,
    //     subscribers: subscribers,
    //     isLive: streamerData.isLive,
    //   });
    // }
    // setContract(contract);
    // setNftContract(nftContract);
    // const [ isUser, userData,isStreamer,streamerData,streamerBalanceData ]:[any,any,any,any,any] = await Promise.all([
    //   publicClient.readContract({
    //     ...contract,
    //     functionName: 'isUser',
    //   }),
    //   publicClient.readContract({
    //     ...contract,
    //     functionName: 'addToUser',
    //     args: [address]
    //   }),
    //   publicClient.readContract({
    //     ...contract,
    //     functionName: 'isStreamer',
    //     args: [`0x${contractConfig.address}`]
    //   }),
    //   publicClient.readContract({
    //     ...contract,
    //     functionName: 'addToStreamer',
    //     args: [`0x${contractConfig.address}`]
    //   }),
    //   publicClient.readContract({
    //     ...contract,
    //     functionName: 'streamerToBalance',
    //     args: [address]
    //   }),
    // ])
    // console.log(`isUser = ${isUser}, userData = ${userData},isStreamer = ${isStreamer}, streamerData = ${streamerData}, streamerBalanceData = ${streamerBalanceData}`);

    // const isUser: any = await contract.watchEvent.isUser(address);
    // setIsUser(isUser);
    // if (isUser) {
    //   // const userData: IUserData = await contract.read.addToUser(address);
    //   const bigNumberUserId = BigNumber.from(userData.userId);
    //   const userId = bigNumberUserId.toString();
    //   setUserData({
    //     ...userData,
    //     userId: userId,
    //     userAdd: userData.userAdd,
    //     name: userData.name,
    //     desp: userData.desp,
    //     profilePicture: userData.profilePicture,
    //     collection: userData.collection,
    //   });
    // }
    // // const isStreamer: boolean = await contract.read.isStreamer(address);
    // setIsStreamer(isStreamer);
    // if (isStreamer) {
    //   // const streamerData: IStreamerData = await contract.read.addToStreamer(address);
    //   const bigNumberStreamerId = BigNumber.from(streamerData.streamerId);
    //   const streamerId = bigNumberStreamerId.toString();
    //   const bigTotalNfts = BigNumber.from(streamerData.totalNfts);
    //   const totalNfts = bigTotalNfts.toString();
    //   const bigNumberSubscribers = BigNumber.from(streamerData.subscribers);
    //   const subscribers = bigNumberSubscribers.toString();
    //   // const streamerBalanceData = await contract.read.streamerToBalance(address);
    //   const streamerBalance = parseFloat(streamerBalanceData) / 10 ** 18;
    //   setStreamerBalance(streamerBalance);
    //   setStreamerData({
    //     ...streamerData,
    //     streamerId: streamerId,
    //     streamerAdd: streamerData.streamerAdd,
    //     name: streamerData.name,
    //     desp: streamerData.desp,
    //     nftImage: streamerData.nftImage,
    //     profilePicture: streamerData.profilePicture,
    //     totalNfts: totalNfts,
    //     categories: streamerData.categories,
    //     followers: streamerData.followers,
    //     subscribers: subscribers,
    //     isLive: streamerData.isLive,
    //   });
    // }
    // setContract(contract);
    // setNftContract(nftContract);