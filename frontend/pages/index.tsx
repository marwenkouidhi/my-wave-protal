import { ethers } from "ethers";
import { formatEther } from "ethers/lib/utils";
import type { NextPage } from "next";
import { useCallback, useEffect, useRef, useState } from "react";
import ReactCanvasConfetti from "react-canvas-confetti";
import abi from "../utils/WavePortal.json";

declare var window: any;
declare var ethereum: any;

const Home: NextPage = () => {
  const refAnimationInstance = useRef(null);
  const getInstance = useCallback((instance: any) => {
    refAnimationInstance.current = instance;
  }, []);

  const [currentAccount, setCurrentAccount] = useState({
    address: "",
    balance: "",
    isLoggedIn: false,
  });
  const [portalState, setPortalState] = useState({
    nbWaves: null,
    isLoading: false,
  });

  const [confettiState, setconfettiState] = useState(0);
  const increment = () => {
    setconfettiState(confettiState + 1);
  };

  const contractAddress = "0x96F3B1B30656870Bdd0Aaa3942998bAA125adb9A";
  const contractABI = abi.abi;
  const checkIfWalletIsConnected = async () => {
    if (typeof window !== "undefined") {
      try {
        const { ethereum } = window;
        if (!ethereum) {
          console.log("Make sure you have metamask!");
        } else {
          const accounts = await ethereum.request({ method: "eth_accounts" });
          if (accounts.length > 0) {
            const provider = new ethers.providers.Web3Provider(ethereum);

            setCurrentAccount({
              ...currentAccount,
              isLoggedIn: true,
              address: accounts[0],
              balance: formatEther(await provider.getBalance(accounts[0])),
            });
            setPortalState({
              ...portalState,
              nbWaves: await getTotalWaves(),
            });
          } else {
            console.log("No authorized account found");
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const connectWallet = async () => {
    if (typeof window !== "undefined") {
      try {
        const { ethereum } = window;

        if (!ethereum) {
          alert("Get MetaMask!");
          return;
        }

        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        const provider = new ethers.providers.Web3Provider(ethereum);
        setCurrentAccount({
          isLoggedIn: true,
          balance: formatEther(await provider.getBalance(accounts[0])),
          address: accounts[0],
        });
        setPortalState({
          ...portalState,
          nbWaves: await getTotalWaves(),
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const wave = async () => {
    if (typeof window !== "undefined") {
      try {
        const { ethereum } = window;
        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const wavePortalContract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );
          setPortalState({
            ...portalState,
            isLoading: true,
          });
          const waveTxn = await wavePortalContract.wave();
          await waveTxn.wait();
          setPortalState({
            isLoading: false,
            nbWaves: await getTotalWaves(),
          });
          increment();
        } else {
          console.log("Ethereum object doesn't exist!");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getTotalWaves = async () => {
    if (typeof window !== "undefined") {
      const { ethereum } = window;
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const wavePortalContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      return (await wavePortalContract.getTotalWaves()).toNumber();
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    ethereum.on("accountsChanged", (accounts: any) => {
      if (accounts.length > 0) {
        connectWallet();
      } else {
        setCurrentAccount({
          isLoggedIn: false,
          balance: "",
          address: "",
        });
      }
    });
    ethereum.on("connect", () => {
      connectWallet();
    });
  }, []);

  return (
    <div className="grid gap-7 max-w-6xl  mx-auto p-5">
      <div className="justify-self-end text-xs text-bold flex space-x-2 text-gray-600 font-semibold ">
        <button
          className="bg-green-200  hover:bg-green-300  p-1 px-5 flex items-center rounded-md cursor-pointer space-x-2 "
          onClick={connectWallet}
        >
          <span className="text-lg">🙋‍♂️</span>

          {currentAccount.isLoggedIn ? (
            <p>{currentAccount.address.substring(1, 15) + "..."}</p>
          ) : (
            <p>Connect Wallet</p>
          )}
        </button>
        {currentAccount.isLoggedIn ? (
          <button
            className="bg-red-200 hover:bg-red-300  p-1 px-5 flex items-center rounded-md cursor-pointer space-x-2"
            onClick={connectWallet}
          >
            <span className="text-lg">💵</span>
            <p>{"Balance: " + currentAccount.balance.substring(1, 5)}</p>
          </button>
        ) : null}
      </div>
      <div className="max-w-lg mx-auto text-center grid gap-5">
        <h1 className="text-2xl font-bold  flex items-end justify-center space-x-2 relative">
          <span className="text-5xl">👋</span>
          <p>Hey there!</p>
          {currentAccount.isLoggedIn && (
            <p className="text-xs font-semibold absolute top-0 left-0  bg-green-200 text-gray-600  px-3 leading-3 p-1  rounded-md  ">
              <span>Total waves: </span>
              <span>{portalState.nbWaves}</span>
            </p>
          )}
        </h1>
        <p className="text-gray-500">
          I&apos;am Marwen and this is my to my Wave Portal. Make you&apos;re
          self home, connect your Ethereum wallet and wave at me!
        </p>
        <button
          disabled={!currentAccount.isLoggedIn}
          onClick={wave}
          className="relative disabled bg-gray-200 disabled:cursor-not-allowed disabled:opacity-80 disabled:bg-red-200 text-gray-600 font-semibold hover:bg-gray-300 anima text-sm text-bold cursor-pointer w-full py-2 rounded-md overflow-hidden  first-letter:"
        >
          ➡️ Wave at Me
          {portalState.isLoading && (
            <div className="absolute bottom-0 w-full bg-gray-200  ">
              <div className="bg-green-300 h-1 animate-wiggle"></div>
            </div>
          )}
        </button>
      </div>
      <ReactCanvasConfetti
        fire={confettiState}
        style={{
          position: "fixed",
          pointerEvents: "none",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
        }}
        refConfetti={getInstance}
      />
    </div>
  );
};

export default Home;
