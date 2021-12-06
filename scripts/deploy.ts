import { ethers } from "hardhat";

async function main() {
  const CryptonToken = await ethers.getContractFactory("CryptonToken");
  const cryptonToken = await CryptonToken.deploy("Hello, Hardhat!");

  await cryptonToken.deployed();

  console.log("CryptonToken deployed to:", cryptonToken.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
