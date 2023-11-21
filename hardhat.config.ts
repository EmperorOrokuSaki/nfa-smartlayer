import '@nomiclabs/hardhat-etherscan';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-web3';
import '@nomicfoundation/hardhat-chai-matchers';
import 'solidity-coverage';
import 'hardhat-gas-reporter';
import 'hardhat-contract-sizer';
import '@openzeppelin/hardhat-upgrades';
import * as dotenv from 'dotenv';
import { HardhatUserConfig } from 'hardhat/types';
import { task, types } from 'hardhat/config';
import deployFleekPrints from './scripts/deploy/deploy-fleek-prints';

dotenv.config();

const {
  PRIVATE_KEY,
  REPORT_GAS,
  ETHERSCAN_API_KEY,
  POLYGONSCAN_KEY,
  POLYGON_API_URL,
  ETH_MAIN_API_URL,
  ETH_SEPOLIA_API_URL,
  ETH_GOERLI_API_URL,
  MAINNET_API_KEY,
  COINMARKETCAP_KEY,
  QANET_RPC_URL,
} = process.env;

const config: HardhatUserConfig = {
  defaultNetwork: 'local',
  networks: {
    hardhat: {
      chainId: 31337,
      forking: MAINNET_API_KEY
        ? {
            url: MAINNET_API_KEY,
            blockNumber: 16876149,
          }
        : undefined,
    },
    mumbai: {
      url: POLYGON_API_URL ? POLYGON_API_URL : '',
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 80001,
    },
    goerli: {
      url: ETH_GOERLI_API_URL ? ETH_GOERLI_API_URL : '',
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 5,
    },
    sepolia: {
      url: ETH_SEPOLIA_API_URL ? ETH_SEPOLIA_API_URL : '',
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 11155111,
    },
    mainnet: {
      url: ETH_MAIN_API_URL ? ETH_MAIN_API_URL : '',
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 1,
    },
    qanet: {
      url: QANET_RPC_URL ? QANET_RPC_URL : '',
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 31337,
    },
    local: {
      url: 'http://localhost:8545',
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
  },
  gasReporter: {
    enabled: REPORT_GAS === 'true' || false,
    currency: 'USD',
    outputFile: 'gas-report',
    noColors: true,
    coinmarketcap: COINMARKETCAP_KEY,
  },
  contractSizer: {
    runOnCompile: false,
    only: ['NftMarketplace'],
  },
  solidity: {
    version: '0.8.12',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
        details: {
          yul: true,
        },
      },
      viaIR: true,
    },
  },
  mocha: {
    timeout: 200000, // 200 seconds max for running tests
  },
  etherscan: {
    apiKey: {
      polygonMumbai: POLYGONSCAN_KEY ? POLYGONSCAN_KEY : '',
      mainnet: ETHERSCAN_API_KEY ? ETHERSCAN_API_KEY : '',
      goerli: ETHERSCAN_API_KEY ? ETHERSCAN_API_KEY : '',
      sepolia: ETHERSCAN_API_KEY ? ETHERSCAN_API_KEY : '',
    },
  },
};

export default config;

// Use the following command to deploy where the ne`twork flag can be replaced with the network you choose:
// npx hardhat deploy --network goerli --new-proxy-instance --name "FleekNFAs" --symbol "FLKNFA" --billing "[10000, 20000]"
task('deploy:FleekPrints', 'Deploy the FleekPrints contract')
  .addFlag('newProxyInstance', 'Force to deploy a new proxy instance')
  .addOptionalParam('isMain', 'Is it the main contract', true, types.boolean)
  .addOptionalParam('mainChainId', 'Main chain id', 161, types.int)
  .addOptionalParam(
    'authorizedSource',
    'The only authorized source of the contract',
    "0xd4997d0FaCC83231b9F26a8B2155b4869E99946F",
    types.string
  )
  .addOptionalParam('lzEndpoint', 'LayerZero endpoint on chain', "0x7cacBe439EaD55fa1c22790330b12835c6884a91", types.string)
  .setAction(deployFleekPrints);