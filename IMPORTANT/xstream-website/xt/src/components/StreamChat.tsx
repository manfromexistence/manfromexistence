import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import PolygonLogo from "../../assets/logos/PolygonLogo.png";
import SendIcon from "@mui/icons-material/Send";
import { useAccount } from "wagmi";
import { BigNumber } from "ethers";
import Context from "@/contexts/context";
import { useSignerContext } from "@/contexts/signerContext";
import { useStreamContext } from "@/contexts/streamContext";
import ChatMessage from "./ChatMessage";

interface ChatProps {
  message: string;
  amount: number;
}

const StreamChat = () => {
  const context: any = useContext(Context)
  const { address } = useAccount();
  const [chat, setChat] = useState<ChatProps>({
    message: "",
    amount: 0,
  });
  const { isUser, userData, isStreamer, streamerData } = useSignerContext();
  const {
    streamData,
    allChats,
    streamId,
    followsStreamer,
    subscribedStreamer,
    streamBalance,
    getWholeStreamData,
    getAllChatData,
  } = useStreamContext();
  const { contract } = useSignerContext();

  const handleMessageChange = (e: any) => {
    setChat({ ...chat, message: e.target.value });
  };
  const handleAmountChange = (e: any) => {
    setChat({ ...chat, amount: e.target.value });
  };
  const handleAllCheck = () => {
    let status = false;
    if (chat.message != "") {
      status = true;
    }
    return status;
  };

  const sendChat = async () => {
    console.log(streamData?.streamId.toNumber() as number);
    if (isUser) {
      if (chat.amount == 0) {
        context.setLoading(true)
        console.log("I am user");
        const sendChat = await contract.chat(
          streamData?.streamId,
          userData?.name,
          chat.message,
          subscribedStreamer
        );
        console.log(
          streamData?.streamId,
          userData?.name,
          chat.message,
          subscribedStreamer
        );
        await sendChat.wait();
        getAllChatData(streamData?.streamId.toNumber() as number);
        context.setLoading(false)
        setChat({ ...chat, message: "", amount: 0 });
      } else {
        context.setLoading(true)
        console.log("I am user with superchat");
        const amountBig: BigNumber = BigNumber.from(
          (chat.amount * 10 ** 18).toString()
        );
        const sendChat = await contract.chat(
          streamData?.streamId,
          userData?.name,
          chat.message,
          subscribedStreamer,
          { from: address, value: amountBig }
        );
        console.log(
          streamData?.streamId,
          userData?.name,
          chat.message,
          subscribedStreamer,
          amountBig
        );
        await sendChat.wait();
        getAllChatData(streamData?.streamId.toNumber() as number);
        context.setLoading(false)
        setChat({ ...chat, message: "", amount: 0 });
      }
    } else if (isStreamer) {
      if (chat.amount == 0) {
        context.setLoading(true)
        console.log("I am streamer");
        const sendChat = await contract.chat(
          streamData?.streamId,
          streamerData?.name,
          chat.message,
          subscribedStreamer
        );
        console.log(
          streamData?.streamId,
          streamerData?.name,
          chat.message,
          subscribedStreamer
        );
        await sendChat.wait();
        getAllChatData(streamData?.streamId.toNumber() as number);
        context.setLoading(false)
        setChat({ ...chat, message: "", amount: 0 });
      } else {
        context.setLoading(true)
        console.log("I am streamer with superchat");
        const amountBig: BigNumber = BigNumber.from(
          (chat.amount * 10 ** 18).toString()
        );
        const sendChat = await contract.chat(
          streamData?.streamId,
          streamerData?.name,
          chat.message,
          subscribedStreamer,
          { from: address, value: amountBig }
        );
        console.log(
          streamData?.streamId,
          streamerData?.name,
          chat.message,
          subscribedStreamer,
          amountBig
        );
        await sendChat.wait();
        getAllChatData(streamData?.streamId.toNumber() as number);
        context.setLoading(false)
        setChat({ ...chat, message: "", amount: 0 });
      }
    } else {
      alert("You need to be a user or streamer to send chat");
    }
  };

  useEffect(() => {
    const addChatReceivedListener = async () => {
      if (streamData) {
        const eventEmitter1 = contract.on(
          "ChatReceived",
          (
            sender: string,
            name: string,
            message: string,
            amount: BigNumber,
            isSubscriber: boolean
          ) => {
            console.log(sender, name, message, amount, isSubscriber);
            console.log(streamData);
            console.log(streamData.streamId);
            getAllChatData(streamData.streamId.toNumber() as number);
            console.log(streamData.streamId.toNumber() as number);
            getWholeStreamData(streamData.streamId.toNumber() as number);
          }
        );

        return () => {
          eventEmitter1.removeAllListeners("ChatReceived");
        };
      }
    };

    addChatReceivedListener();
  }, [streamData]);

  return (
    <div
      className={`w-[40%] ${
        address == streamData?.streamer ? "h-[75vh]" : "h-[80vh]"
      } flex flex-col justify-start items-center gap-2 mb-4 bg-primaryGrey border-[1px] border-secondaryGrey border-solid p-4`}
    >
      <div className="w-full flex flex-row justify-between items-center">
        <span
          className="text-white text-[1.5rem] font-rubik font-bold"
          onClick={() => {
            // getWholeStreamData(streamData?.streamId.toNumber() as number);
            console.log(streamData);
          }}
        >
          STREAM MONEY
        </span>
        <div className="flex flex-row justify-center items-center">
          <span className="text-white text-[1.5rem] font-rubik font-bold">
            {streamBalance}
          </span>
          <div className="h-[2rem] w-[2rem] ml-4">
            <Image alt="Polygon Logo" src={PolygonLogo}></Image>
          </div>
        </div>
      </div>
      <div className="w-[90%] bg-secondaryGrey h-[2px] mt-2"></div>
      <div className="w-full h-[70%] p-2 flex flex-col justify-start items-start">
        <div className="w-full h-full flex flex-col justify-start items-center gap-2 overflow-scroll">
          {allChats?.map((chat, index) =>
            <ChatMessage key={index} chat={chat} streamData={streamData}></ChatMessage>
          )}
        </div>
      </div>
      <div className="w-[90%] bg-secondaryGrey h-[2px] mt-2"></div>
      <div className="w-[95%] h-auto flex-col justify-start items-start mt-2">
        <div className="w-full flex flex-row justify-between items-center">
          <div className="w-[85%] h-[2.5rem] border-primaryRed border-2 border-solid rounded-md bg-[#1c1c1e] px-2 flex flex-col justify-center items-start">
            <textarea
              id="message"
              className="w-full mt-1 appearance-none resize-none bg-transparent border-none outline-none text-white text-[1rem] font-rubik"
              placeholder="Send a message"
              value={chat.message}
              onChange={(e: any) => {
                handleMessageChange(e);
              }}
            />
          </div>
          <div
            className={`rounded-full w-[3rem] h-[3rem] ${
              handleAllCheck()
                ? "bg-secondaryRed border-[1px] border-primaryRed border-solid cursor-pointer"
                : "bg-secondaryGrey"
            } flex flex-row justify-center items-center`}
            onClick={() => {
              if (handleAllCheck()) {
                sendChat();
              }
            }}
          >
            <SendIcon style={{ fontSize: 25, color: "white" }}></SendIcon>
          </div>
        </div>
        {!(address == streamData?.streamer) && (
          <div
            className={`w-full flex flex-row justify-start items-center mt-1`}
          >
            <div className="w-[20%] h-[2rem] border-primaryRed border-2 border-solid rounded-md bg-[#1c1c1e] px-2 flex flex-col justify-center items-start">
              <input
                type="number"
                min={0}
                id="amount"
                step={0.1}
                placeholder="Amount"
                value={chat.amount}
                className="appearance-none bg-transparent w-full border-none outline-none text-white text-[0.8rem] font-rubik"
                onChange={(e: any) => {
                  handleAmountChange(e);
                }}
              />
            </div>
            <div className="h-[1.5rem] w-[1.5rem] ml-4">
              <Image alt="Polygon Logo" src={PolygonLogo}></Image>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StreamChat;
