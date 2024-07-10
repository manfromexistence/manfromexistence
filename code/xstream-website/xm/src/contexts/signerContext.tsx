import React, { useContext, useEffect, useState } from "react";
import { useAccount, useWalletClient } from "wagmi";
import contractConfig from "../config/contractConfig";
import nftContractConfig from "../config/nftContractConfig";
import { IUserData, IStreamerData, IStreamData } from "@/utils/types";
import { getContract } from 'viem'
import { BigNumber } from "ethers";;
import { publicClient } from 'components/client'

export const SignerContext = React.createContext<{
  signer: any | undefined | null;
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
  signer: undefined,
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


async function callContractFunction(address: any, abi: any, functionName: string, args?: any) {
  try {
    const data = await publicClient.readContract({
      address,
      abi,
      functionName,
      args,
    });
    return data;
  } catch (error) {
    console.error('Error calling contract function:', error);
  }
}
const contractAddress = `0x${contractConfig.address}`;
const contractAbi = contractConfig.abi;
export const useSignerContext = () => useContext(SignerContext);


export const SignerContextProvider = ({ children }: any) => {
  const { data: signer, isError } = useWalletClient();
  const { address } = useAccount();
  const [contract, setContract] = useState();
  const [nftContract, setNftContract] = useState();
  const [isUser, setIsUser] = useState<boolean>(false);
  const [userData, setUserData] = useState<IUserData>();
  const [isStreamer, setIsStreamer] = useState<boolean>(false);
  const [streamerData, setStreamerData] = useState<IStreamerData>();
  const [streamerBalance, setStreamerBalance] = useState<number>();
  const [livestreams, setLivestreams] = useState<IStreamData[]>([]);

  const getContractInfo = async () => {

    const contract: any = getContract({
      address: `0x${contractConfig.address}`,
      abi: contractConfig.abi,
      client: { public: publicClient }
    })
    const nftContract: any = getContract({
      address: `0x${nftContractConfig.address}`,
      abi: nftContractConfig.abi,
      client: { public: publicClient }
    })



    // async function callContractFunction(address: any, abi: any, functionName: string, args?: any) {
    //   try {
    //     const data = await publicClient.readContract({
    //       address,
    //       abi,
    //       functionName,
    //       args,
    //     });
    //     return data;
    //   } catch (error) {
    //     console.error('Error calling contract function:', error);
    //   }
    // }

    const isUser:any = await callContractFunction(contractAddress, contractAbi, 'isUser', [address]);
    console.log('Is user:', isUser);

    setIsUser(isUser);
    if (isUser) {
      const userData: any = await callContractFunction(contractAddress, contractAbi, 'addToUser', [address]);
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
    const isStreamer: any = await callContractFunction(contractAddress, contractAbi, 'isStreamer', [address]);
    setIsStreamer(isStreamer);
    if (isStreamer) {
      const streamerData: any = await callContractFunction(contractAddress, contractAbi, 'addToStreamer', [address]);
      const bigNumberStreamerId = BigNumber.from(streamerData.streamerId);
      const streamerId = bigNumberStreamerId.toString();
      const bigTotalNfts = BigNumber.from(streamerData.totalNfts);
      const totalNfts = bigTotalNfts.toString();
      const bigNumberSubscribers = BigNumber.from(streamerData.subscribers);
      const subscribers = bigNumberSubscribers.toString();
      const streamerBalanceData:any = await callContractFunction(contractAddress, contractAbi, 'streamerToBalance', [address]);
      const streamerBalance = parseFloat(streamerBalanceData) / 10 ** 18;
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
    setContract(contract);
    setNftContract(nftContract);
  };
  
  // const getContractInfo = async () => {
  //   // const contract = await publicClient.getContract(
  //   //   contractConfig.abi,
  //   //   contractConfig.address
  //   // );
  //   // const nftContract = await publicClient.getContract(
  //   //   nftContractConfig.abi,
  //   //   nftContractConfig.address
  //   // );
  //   const contract: any = getContract({
  //     address: `0x${contractConfig.address}`,
  //     abi: contractConfig.abi,
  //     client: { public: publicClient }
  //   })
  //   const nftContract: any = getContract({
  //     address: `0x${nftContractConfig.address}`,
  //     abi: nftContractConfig.abi,
  //     client: { public: publicClient }
  //   })

  //   // Check if user exists
  //   const isUser = await contract.call({ method: 'isUser', args: [address] });
  //   setIsUser(isUser);
  
  //   if (isUser) {
  //     // Get user data
  //     const userData = await contract.call({ method: 'addToUser', args: [address] });
  
  //     // Adapt BigNumber conversion (if applicable)
  //     const formattedUserId = userData.userId.toString(); // Assuming userId is a number
  
  //     setUserData({
  //       ...userData,
  //       userId: formattedUserId,
  //       userAdd: userData.userAdd,
  //       name: userData.name,
  //       desp: userData.desp,
  //       profilePicture: userData.profilePicture,
  //       collection: userData.collection,
  //     });
  //   }
  
  //   // Check if streamer exists
  //   const isStreamer = await contract.call({ method: 'isStreamer', args: [address] });
  //   setIsStreamer(isStreamer);
  
  //   if (isStreamer) {
  //     // Get streamer data
  //     const streamerData = await contract.call({ method: 'addToStreamer', args: [address] });
  
  //     // Adapt BigNumber conversion (if applicable)
  //     const formattedStreamerId = streamerData.streamerId.toString(); // Assuming streamerId is a number
  //     const formattedTotalNfts = streamerData.totalNfts.toString(); // Assuming totalNfts is a number
  //     const formattedSubscribers = streamerData.subscribers.toString(); // Assuming subscribers is a number
  
  //     // Get streamer balance (assuming there's a method like this)
  //     const streamerBalanceData = await contract.call({ method: 'streamerToBalance', args: [address] });
  //     const streamerBalance = parseFloat(streamerBalanceData) / 10 ** 18;
  
  //     setStreamerData({
  //       ...streamerData,
  //       streamerId: formattedStreamerId,
  //       streamerAdd: streamerData.streamerAdd,
  //       name: streamerData.name,
  //       desp: streamerData.desp,
  //       nftImage: streamerData.nftImage,
  //       profilePicture: streamerData.profilePicture,
  //       totalNfts: formattedTotalNfts,
  //       categories: streamerData.categories,
  //       followers: streamerData.followers,
  //       subscribers: formattedSubscribers,
  //       isLive: streamerData.isLive,
  //     });
  //   }
  
  //   setContract(contract);
  //   setNftContract(nftContract);
  // }
  const getLivestreamsData = async () => {
    //@ts-ignore
    const livestreamsData: IStreamData[] = await callContractFunction(contractAddress, contractAbi, 'getLiveStreams', [address]);
    console.log(livestreamsData);
    setLivestreams(livestreamsData);
  };

  useEffect(() => {
    if (signer && address) {
      console.log("signerContext was called");
      getContractInfo();
    }
  }, [signer, address]);

  return (
    <SignerContext.Provider
      value={{
        signer,
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
