const { ethers } = require("hardhat");

async function main() {
  const Threatre = await ethers.deployContract("Theater");
  await Threatre.waitForDeployment();

  console.log("Threatre deployed to:", await Threatre.getAddress());
}
// 0x64bd384eA6d6B76ee7C3E1248beaA9cE3157f9dD
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });