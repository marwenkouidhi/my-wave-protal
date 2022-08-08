import { ethers } from "ethers";
import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import abi from "../utils/WavePortal.json";

const Home: NextPage = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const contractAddress = "0x77900485A7c77c99d1E02B8E2d0bA3f751CCEecE";
  const contractABI = abi.abi;
  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Make sure you have metamask!");
      } else {
        const accounts = await ethereum.request({ method: "eth_accounts" });
        if (accounts.length > 0) {
          console.log("An authorized account was found", accounts[0]);
          setCurrentAccount(accounts[0]);
        } else {
          console.log("No authorized account found");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const wave = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.WebSocketProvider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        console.log("waving");
        let count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count...", count.toNumber());
        const waveTxn = await wavePortalContract.wave();
        console.log("Mining...", waveTxn.hash);

        await waveTxn.wait();
        console.log("Mined -- ", waveTxn.hash);

        count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count...", count.toNumber());
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <div className="grid gap-7 max-w-5xl mx-auto p-5">
      <button
        className=" bg-green-200 justify-self-end hover:bg-green-300  text-sm text-bold cursor-pointer  p-1 px-5 rounded-md text-gray-600 font-semibold flex items-center  space-x-2"
        onClick={connectWallet}
      >
        <Image src="/purse.png" height={20} width={20} />
        {currentAccount ? (
          <p>{currentAccount.substring(1, 15) + "..."}</p>
        ) : (
          <p>Connect Wallet</p>
        )}
      </button>

      <div className="max-w-lg mx-auto text-center grid gap-5">
        <h1 className="text-2xl font-bold  flex items-end justify-center space-x-2 ">
          <span className="text-5xl">👋</span>
          <p>Hey there!</p>
        </h1>
        <p className="text-gray-500">
          Hey! I am Marwen. Connect your Ethereum wallet and wave at me!
        </p>
        <button
          onClick={wave}
          className="bg-gray-200 text-gray-600 font-semibold hover:bg-gray-300 anima text-sm text-bold cursor-pointer w-full py-2 rounded-md"
        >
          ➡️ Wave at Me
        </button>
      </div>
    </div>
  );
};

export default Home;
