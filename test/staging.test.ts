import { assert } from "chai";
import { Contract } from "ethers";
import { deployments, ethers, getUnnamedAccounts, network } from "hardhat";
import { developmentChains } from "../hardhat-config-helper";

!developmentChains.includes(network.name) &&
  describe("WavePortal Staging Tests", () => {
    let wavePortalContract: Contract, accounts: any, deployer: string;

    beforeEach(async () => {
      accounts = await getUnnamedAccounts();
      deployer = accounts.deployer;
      await deployments.fixture(["wave"]);
      wavePortalContract = await ethers.getContract("WavePortal", deployer);
    });

    it("Wave initialized correctly", async () => {
      assert.equal(await wavePortalContract.getTotalWaves(), "0");
    });

    it("should increment total waves when executing wave()", async () => {
      const currentWaves = (
        await wavePortalContract.getTotalWaves()
      ).toNumber();
      await wavePortalContract.wave();
      const newWaves = (await wavePortalContract.getTotalWaves()).toNumber();
      assert.equal(newWaves, currentWaves + 1);
    });
  });
