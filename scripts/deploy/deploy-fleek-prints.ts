import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { deployLibraries } from './deploy-libraries';
import { deployContractWithProxy } from './deploy-proxy-contract';
//import { ethers } from "hardhat";
import { Contract } from 'ethers';

async function main() {
  console.log('hello');
  
  const lock = await ethers.deployContract("FleekPrints", [true, 161, "0xd4997d0FaCC83231b9F26a8B2155b4869E99946F", "0x7cacBe439EaD55fa1c22790330b12835c6884a91"]);

  await lock.waitForDeployment();

  console.log(
    `deployed to ${lock.target}`
  );

  //console.log('Deploying FleekPrints...');
  //const libraries = await deployLibraries(['BytesLib', 'ExcessivelySafeCall', 'FleekENS'], hre);
};
