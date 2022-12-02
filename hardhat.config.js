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
    }
  }
};
