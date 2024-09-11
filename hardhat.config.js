require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  defaultNetwork: "ganache",
  networks: {
    hardhat: {},
    ganache: {
      url: 'http://127.0.0.1:7545',
      chainId: 1337,
      from: `0xf101830F4480bc7Ef138A8A61c97119Cd6E6aCBE`,
      gas: 3000000
    }

    //POLYGON_AMOY_RPC_URL=https://rpc-amoy.polygon.technology/
    // amoy: {
    //   url: `${process.env.POLYGON_AMOY_RPC_URL}`,
    //   accounts: [`${process.env.PRIVATE_KEY}`]
    // }
  }
};