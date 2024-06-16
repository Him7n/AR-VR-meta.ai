require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",

  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/3WdzvbCk1-POpM6tIjHHIXIcm5MGG1-d`,
      accounts: ["1b154517a72674badf7268f46d7cceacd09066dd96f31aec1fdb1d69769208e6"],
    },
  },
};
``