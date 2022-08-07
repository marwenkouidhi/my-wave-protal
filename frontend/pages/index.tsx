import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="max-w-lg mx-auto text-center pt-24 grid gap-5">
      <h1 className="text-2xl font-bold ">👋 Hey there!</h1>
      <p className="text-gray-500">
        I am farza and I worked on self-driving cars so that&apos;s pretty cool
        right? Connect your Ethereum wallet and wave at me!
      </p>
      <button className="bg-gray-200 hover:bg-gray-300 anima text-sm text-bold cursor-pointer w-full py-2 rounded-md">
        Wave at Me
      </button>
    </div>
  );
};

export default Home;
