require("@nomicfoundation/hardhat-chai-matchers");
require("@nomiclabs/hardhat-ethers");
require("@nomicfoundation/hardhat-toolbox");
require("hardhat-gas-reporter");


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: "https://ethereum-goerli-rpc.allthatnode.com",
      accounts: [process.env.DEPLOY_PRIVATE_KEY]
    },
    mumbai: {
      url: "https://matic-mumbai.chainstacklabs.com",
      accounts: [process.env.DEPLOY_PRIVATE_KEY]
    },
    cronos: {
      url: "https://evm-t3.cronos.org",
      accounts: [process.env.DEPLOY_PRIVATE_KEY]
    }
  }
};
