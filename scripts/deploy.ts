import { ethers } from "hardhat";

const tokenName = "CryptonToken";
const symbol = "CRPT";
const totalSupply = 1000;

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const CryptonToken = await ethers.getContractFactory("CryptonToken");
  const cryptonToken = await CryptonToken.deploy(tokenName, symbol, totalSupply);

  await cryptonToken.deployed();

  console.log("CryptonToken deployed to:", cryptonToken.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
