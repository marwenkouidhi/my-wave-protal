import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Make sure you have metamask!");
      } else {
        const accounts = await ethereum.request({ method: "eth_accounts" });
        if (accounts.length > 0) {
          console.log(accounts);
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
        <h1 className="text-2xl font-bold ">👋 Hey there!</h1>
        <p className="text-gray-500">
          Hey! I am Marwen. Connect your Ethereum wallet and wave at me!
        </p>
        <button className="bg-gray-200 hover:bg-gray-300 anima text-sm text-bold cursor-pointer w-full py-2 rounded-md">
          Wave at Me
        </button>
      </div>
    </div>
  );
};

export default Home;
