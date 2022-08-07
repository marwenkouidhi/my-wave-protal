import { ContractFactory } from "ethers";
import { ethers } from "hardhat";

const main = async () => {
  const [owner, randomPerson] = await ethers.getSigners();
  const waveContractFactory: ContractFactory = await ethers.getContractFactory(
    "WavePortal"
  );
  const waveContract = await waveContractFactory.deploy();
  await waveContract.deployed();

  console.log("Contract deployed to:", waveContract.address);
  console.log("Contract deployed by:", owner.address);

  let waveCount = await waveContract.getTotalWaves();
  let waveTx = await waveContract.wave();
  await waveTx.wait();
  waveCount = await waveContract.getTotalWaves();

  waveTx = await waveContract.connect(randomPerson).wave();
  await waveTx.wait();
  waveCount = await waveContract.getTotalWaves();
};

const runMain = async () => {
  try {
    await main();
    process.exit(0); // exit Node process without error
  } catch (error) {
    console.log(error);
    process.exit(1); // exit Node process while indicating 'Uncaught Fatal Exception' error
  }
};
runMain();
