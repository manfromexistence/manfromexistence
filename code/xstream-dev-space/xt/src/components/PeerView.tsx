import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import ProfilePicture from "../../assets/images/profilePicture.jpg";
import { Video, Audio } from "@huddle01/react/components";
import {
  useLobby,
  useAudio,
  useVideo,
  usePeers,
  useRoom,
  useLivestream,
} from "@huddle01/react/hooks";
import { useRouter } from "next/router";
import Router from "next/router";
import PeopleIcon from "@mui/icons-material/People";
import ShareIcon from "@mui/icons-material/Share";
import SecondaryButton from "./SecondaryButton";
import { useStreamContext } from "@/contexts/streamContext";
import Context from "@/contexts/context";
import contractConfig from "@/config/contractConfig";
import { useSignerContext } from "@/contexts/signerContext";
import { useAccount } from "wagmi";
import { useCurrUserOrStreamerContext } from "@/contexts/currUserOrStreamerContext";
import { BigNumber } from "ethers";

const PeerView = () => {
  const context: any = useContext(Context);
  const { peers } = usePeers();
  const router = useRouter();
  const { address } = useAccount();
  const { contract, isUser, isStreamer, nftContract } = useSignerContext();
  const {
    streamData,
    streamerData,
    streamId,
    streamCategories,
    setFollowsStreamer,
    setSubscribedStreamer,
  } = useStreamContext();
  const { getCurrStreamerData } = useCurrUserOrStreamerContext();
  const [follow, setFollow] = useState<boolean>(false);
  const [subscribed, setSubscribed] = useState<boolean>(false);

  const getFollowData = async () => {
    if (isUser) {
      const userFollows: boolean = await contract.userFollowsStreamer(
        address,
        streamerData?.streamerAdd
      );
      setFollow(userFollows);
      setFollowsStreamer(userFollows);
    } else if (isStreamer) {
      const streamerFollows: boolean = await contract.streamerFollowsStreamer(
        address,
        streamerData?.streamerAdd
      );
      setFollow(streamerFollows);
      setFollowsStreamer(streamerFollows);
    }
  };

  const getSubscribedData = async () => {
    const balance = await nftContract.balanceOf(
      address,
      streamerData?.streamerId
    );
    if (balance > 0) {
      setSubscribed(true);
      setSubscribedStreamer(true);
    } else {
      setSubscribed(false);
      setSubscribedStreamer(false);
    }
  };

  useEffect(() => {
    if (streamerData && streamData) {
      true;
      getFollowData();
      getSubscribedData();
      context.setLoading(false);
    }
  }, [streamerData, streamData]);

  useEffect(() => {
    const addStreamStoppedListener = async () => {
      if (streamData) {
        const eventEmitter2 = contract.on(
          "StreamStopped",
          (streamId: BigNumber, streamer: string, streamerName: string) => {
            const streamIdData = BigNumber.from(streamId);
            const streamIdString: string = streamIdData.toString();
            console.log("I was called");
            const streamIdString2: string | undefined =
              streamData?.streamId.toString();
            console.log(streamIdString, streamIdString2);
            if (streamIdString === streamIdString2) {
              console.log("I was called again");
              alert(`The Stream has been stopped.`);
              router.push("/home");
            }
          }
        );

        return () => {
          eventEmitter2.removeAllListeners("StreamStopped");
        };
      }
    };

    addStreamStoppedListener();
  }, [streamData]);

  const followStreamer = async () => {
    context.setLoading(true);
    const followStreamer = await contract.follow(streamerData?.streamerAdd);
    await followStreamer.wait();
    context.setLoading(false);
    setFollow(true);
    setFollowsStreamer(true);
  };

  const unfollowStreamer = async () => {
    context.setLoading(true);
    const unfollowStreamer = await contract.unfollow(streamerData?.streamerAdd);
    await unfollowStreamer.wait();
    context.setLoading(false);
    setFollow(false);
    setFollowsStreamer(false);
  };

  const subscribeStreamer = async () => {
    context.setLoading(true);
    const subscribeStreamer = await contract.mintNft(streamerData?.streamerAdd);
    await subscribeStreamer.wait();
    context.setLoading(false);
    setSubscribed(true);
    setSubscribedStreamer(true);
  };

  return (
    <div className="w-[50%] h-auto flex flex-col justify-start items-start gap-2 mb-4">
      <div className="w-full flex flex-row justify-between items-start">
        <div className="flex flex-row justify-start items-start">
          <div
            className="relative flex flex-col justify-start items-center w-[5rem] h-[5rem] cursor-pointer"
            onClick={async () => {
              await getCurrStreamerData(streamerData?.streamerAdd as string);
              Router.push({
                pathname: "/dashboard",
                query: { streamer: streamerData?.name },
              });
            }}
          >
            <div className="rounded-[50%] w-[4rem] h-[4rem] overflow-hidden">
              <Image
                alt="Profile Picture"
                src={`https://ipfs.io/ipfs/${streamerData?.profilePicture}`}
                objectFit="cover"
                width={200}
                height={200}
              ></Image>
            </div>
            <div className="absolute bottom-1 h-[1.4rem] w-[3rem] rounded-md bg-primaryRed text-white font-rubik font-semibold text-[0.7rem] flex flex-col justify-center items-center">
              LIVE
            </div>
          </div>
          <div className="w-[80%] flex flex-col justify-start items-start ml-4">
            <div
              className="relative h-[2.2rem] w-auto min-w-[6rem] bg-primaryGrey rounded-lg flex flex-row justify-start items-center py-2 cursor-pointer hover:bg-secondaryGrey mb-2"
              onClick={async () => {
                await getCurrStreamerData(streamerData?.streamerAdd as string);
                Router.push({
                  pathname: "/dashboard",
                  query: { streamer: streamerData?.name },
                });
              }}
            >
              <span className="text-textRed font-rubik font-bold mx-3">
                {streamerData?.name}
              </span>
            </div>
            <span
              className="text-white font-rubik font-bold text-[1.5rem] ml-2 w-full max-h-[5rem] h-auto inline-block break-words content-fit"
              onClick={() => {
                console.log(peers);
              }}
            >
              {streamData?.title}
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-between items-end h-full">
          <span className="text-textRed font-rubik font-semibold text-[1.2rem]">
            {streamData?.exclusive ? "Exclusive" : ""}
          </span>
          <span className="text-white font-rubik font-semibold text-[1rem] mt-5">
            {router.query.roomId}
          </span>
        </div>
      </div>

      <div className="w-full h-full aspect-video bg-secondaryRed/10 border-solid border-[1px] border-primaryRed rounded-xl relative overflow-hidden mt-4 border-shadow">
        {Object.values(peers)
          .filter((peer: any) => peer.cam)
          .map((peer: any) => (
            <div
              key={peer.peerId}
              className="w-full h-full aspect-video bg-zinc-800/50 rounded-2xl relative overflow-hidden"
            >
              <Video
                peerId={""}
                track={peer.cam}
                className="h-full w-full object-contain absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                debug
              />
            </div>
          ))}
      </div>
      <div className="w-full flex flex-row justify-between items-center mt-4">
        <div className="flex flex-row justify-start items-center">
          <div
            className="relative flex flex-row justify-center items-baseline p-[6px] bg-secondaryGrey w-auto gap-2"
            onClick={() => {
              console.log(streamData?.title);
            }}
          >
            <PeopleIcon
              style={{
                fontSize: 22,
                color: "white",
                position: "absolute",
                left: 8,
              }}
            ></PeopleIcon>
            <span className="text-textRed font-rubik font-medium text-[1rem] ml-8">
              4500
            </span>
            <span className="text-textRed font-rubik font-normal text-[0.8rem]">
              live viewers
            </span>
          </div>
          <ShareIcon
            style={{ fontSize: 30, color: "white", marginLeft: "1rem" }}
          ></ShareIcon>
        </div>
        <div className="flex flex-row justify-start items-center gap-4">
          <SecondaryButton
            h="h-[2.2rem]"
            textSize="text-[1rem]"
            action1={() => {
              followStreamer();
            }}
            action2={() => {
              unfollowStreamer();
            }}
            disabled={follow}
            iconType="follow"
          ></SecondaryButton>
          <SecondaryButton
            h="h-[2.2rem]"
            textSize="text-[1rem]"
            action1={() => {
              subscribeStreamer();
            }}
            action2={() => {}}
            disabled={subscribed}
            iconType="subscribe"
          ></SecondaryButton>
        </div>
      </div>
      <div className="grid grid-flow-row grid-cols-4 gap-4 h-auto w-full mt-6">
        {streamCategories?.map((category, index) => (
          <div
            key={index}
            className="w-auto px-2 h-[2.4rem] bg-primaryRed rounded-2xl flex flex-row justify-center items-center text-white font-rubik font-bold text-[0.8rem] cursor-pointer"
          >
            {category}
          </div>
        ))}
      </div>
      <div className="w-full flex flex-row justify-between items-baseline mt-4">
        <span className="text-white font-rubik font-semibold text-[1.5rem]">
          Description
        </span>
      </div>
      <div className="w-full h-auto min-h-[10rem] rounded-sm border-[1px] border-secondaryGrey border-solid text-white font-rubik font-extralight tracking-wider p-4 bg-primaryGrey flex flex-col justify-between items-start gap-10 mb-8">
        <span>{streamData?.desp}</span>
        <span className="text-white font-rubik font-semibold tracking-wider">
          {streamData?.hashtags}
        </span>
      </div>
    </div>
  );
};

export default PeerView;
