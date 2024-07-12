import { IStreamerData, IUserData } from "@/utils/types";
import React, { useState } from "react";
import { useSignerContext } from "./signerContext";
import { BigNumber } from "ethers";
import contractConfig from "@/config/contractConfig";
import { publicClient } from "@/components/client";
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


export const CurrUserOrStreamerContext = React.createContext<{
  currStreamerData: IStreamerData | undefined;
  currUserData: IUserData | undefined;
  currStreamerBalance: number | undefined;
  streamerCategories: string[] | undefined;
  streamerFollowers: string[] | undefined;
  streamerFollowing: string[] | undefined;
  getCurrStreamerData: (address: string) => Promise<void>;
  getCurrUserData: (address: string) => Promise<void>;
  getStreamerCategories: (address: string) => Promise<void>;
  getStreamerFollowers: (address: string) => Promise<void>;
  getStreamerFollowing: (address: string) => Promise<void>;
}>({
  currStreamerData: undefined,
  currUserData: undefined,
  currStreamerBalance: undefined,
  streamerCategories: undefined,
  streamerFollowers: undefined,
  streamerFollowing: undefined,
  getCurrStreamerData: async () => {},
  getCurrUserData: async () => {},
  getStreamerCategories: async () => {},
  getStreamerFollowers: async () => {},
  getStreamerFollowing: async () => {},
});

export const useCurrUserOrStreamerContext = () =>
  React.useContext(CurrUserOrStreamerContext);

export const CurrentUserOrStreamerContextProvider = ({ children }: any) => {
  const { contract } = useSignerContext();
  const [currStreamerData, setCurrStreamerData] = useState<IStreamerData>();
  const [currStreamerBalance, setCurrStreamerBalance] = useState<number>();
  const [currUserData, setCurrUserData] = useState<IUserData>();
  const [streamerCategories, setStreamerCategories] = useState<string[]>([]);
  const [streamerFollowers, setStreamerFollowers] = useState<string[]>([]);
  const [streamerFollowing, setStreamerFollowing] = useState<string[]>([]);

  const getCurrStreamerData = async (address: string | undefined) => {
    const currStreamerData: any = await callContractFunction(contractAddress, contractAbi, 'addToUser', [address]);
    const bigNumberStreamerId = BigNumber.from(currStreamerData.streamerId);
    const streamerId = bigNumberStreamerId.toString();
    const bigTotalNfts = BigNumber.from(currStreamerData.totalNfts);
    const totalNfts = bigTotalNfts.toString();
    const bigNumberSubscribers = BigNumber.from(currStreamerData.subscribers);
    const subscribers = bigNumberSubscribers.toString();
    const streamerBalanceData:any = await callContractFunction(contractAddress, contractAbi, 'streamerToBalance', [address]);
    const streamerBalance = parseFloat(streamerBalanceData) / 10 ** 18;
    setCurrStreamerBalance(streamerBalance);
    setCurrStreamerData({
      ...currStreamerData,
      streamerId: streamerId,
      streamerAdd: currStreamerData.streamerAdd,
      name: currStreamerData.name,
      desp: currStreamerData.desp,
      nftImage: currStreamerData.nftImage,
      profilePicture: currStreamerData.profilePicture,
      totalNfts: totalNfts,
      categories: currStreamerData.categories,
      followers: currStreamerData.followers,
      subscribers: subscribers,
      isLive: currStreamerData.isLive,
    });
  };

  const getCurrUserData = async (address: string | undefined) => {
    const currUserData: any = await callContractFunction(contractAddress, contractAbi, 'addToUser', [address]);
    const bigNumberUserId = BigNumber.from(currUserData.userId);
    const userId = bigNumberUserId.toString();
    setCurrUserData({
      ...currUserData,
      userId: userId,
      userAdd: currUserData.userAdd,
      name: currUserData.name,
      desp: currUserData.desp,
      profilePicture: currUserData.profilePicture,
      collection: currUserData.collection,
    });
  };

  const getStreamerCategories = async (address: string | undefined) => {
    const streamerCategories: any = await callContractFunction(contractAddress, contractAbi, 'getStreamerCategories', [address]);
    setStreamerCategories(streamerCategories);
  };

  const getStreamerFollowers = async (address: string | undefined) => {
    const streamerFollowers: any = await callContractFunction(contractAddress, contractAbi, 'getStreamerFollowers', [address]);
    setStreamerFollowers(streamerFollowers);
  };

  const getStreamerFollowing = async (address: string | undefined) => {
    const streamerFollowing: any = await callContractFunction(contractAddress, contractAbi, 'getStreamerFollowing', [address]);
    setStreamerFollowing(streamerFollowing);
  };

  return (
    <CurrUserOrStreamerContext.Provider
      value={{
        currStreamerData,
        currUserData,
        currStreamerBalance,
        streamerCategories,
        streamerFollowers,
        streamerFollowing,
        getCurrStreamerData,
        getCurrUserData,
        getStreamerCategories,
        getStreamerFollowers,
        getStreamerFollowing,
      }}
    >
      {children}
    </CurrUserOrStreamerContext.Provider>
  );
};
