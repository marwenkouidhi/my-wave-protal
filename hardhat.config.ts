import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
import "hardhat-deploy";

dotenv.config();

const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const ALCHEMY_RINKEBY_URL = process.env.ALCHEMY_RINKEBY_URL || "";
const ALCHEMY_MAINNET_URL = process.env.ALCHEMY_MAINNET_URL || "";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks: {
    rinkeby: {
      url: ALCHEMY_RINKEBY_URL,
      accounts: [PRIVATE_KEY],
    },
    mainnet: {
      chainId: 1,
      url: ALCHEMY_MAINNET_URL,
      accounts: [PRIVATE_KEY],
    },
  },
  namedAccounts: {
    deployer: { default: 0 },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
};

export default config;
