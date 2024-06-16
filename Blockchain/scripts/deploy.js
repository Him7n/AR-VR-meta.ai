const { ethers } = require("hardhat");

async function main() {
  const Threatre = await ethers.deployContract("Theater");
  await Threatre.waitForDeployment();

  console.log("Threatre deployed to:", await Threatre.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });