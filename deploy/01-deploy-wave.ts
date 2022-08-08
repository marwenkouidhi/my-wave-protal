import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import {
  developmentChains,
  VERIFICATION_BLOCK_CONFIRMATIONS,
} from "../hardhat-config-helper";
import verify from "../utils/verify";

const deployWave: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { network, getNamedAccounts, deployments, ethers } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  const waitConfirmations = developmentChains.includes(network.name)
    ? 1
    : VERIFICATION_BLOCK_CONFIRMATIONS;

  const wave = await deploy("WavePortal", {
    from: deployer,
    log: true,
    waitConfirmations,
  });
  console.log(wave.address);
  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    await verify(wave.address, []);
  }
};

export default deployWave;
deployWave.tags = ["all", "wave"];
