import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { deployLibraries } from './deploy-libraries';
import { deployContractWithProxy } from './deploy-proxy-contract';
import { Contract } from 'ethers';

type TaskArgs = {
  newProxyInstance: boolean;
  isMain: boolean;
  mainChainId: number;
  authorizedSource: string;
  lzEndpoint: string;
};

export default async (
  { newProxyInstance, isMain, mainChainId, authorizedSource, lzEndpoint}: TaskArgs,
  hre: HardhatRuntimeEnvironment
): Promise<Contract> => {
  console.log('Deploying FleekPrints...');
  //const libraries = await deployLibraries(['BytesLib', 'ExcessivelySafeCall', 'FleekENS'], hre);

  return deployContractWithProxy(
    {
      name: 'FleekPrints',
      newProxyInstance,
      args: [isMain, mainChainId, authorizedSource, lzEndpoint],
      //libraries,
    },
    hre
  );
};
