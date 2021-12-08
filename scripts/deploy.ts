import fs from 'fs';
import dotenv from 'dotenv';
import hre, { ethers } from "hardhat";
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

// Gather deployment info
const network = hre.network.name;
const envConfig = dotenv.parse(fs.readFileSync(`.env-${network}`));
for (const parameter in envConfig) {
    process.env[parameter] = envConfig[parameter]
}

async function main() {
  let owner: SignerWithAddress;
  [owner] = await ethers.getSigners();
  console.log("Owner address: ", owner.address);

  const balance = await owner.getBalance();
  console.log(`Owner account balance: ${ethers.utils.formatEther(balance).toString()}`);

  const CryptonToken = await ethers.getContractFactory("CryptonToken");
  const cryptonToken = await CryptonToken.deploy(
    process.env.CRYPTON_TOKEN_NAME as string,
    process.env.CRYPTON_TOKEN_SYMBOL as string,
    process.env.CRYPTON_TOKEN_MINT as string
  );

  await cryptonToken.deployed();
  console.log(`CryptonToken deployed to ${cryptonToken.address}`);

  // Sync env file
  fs.appendFileSync(`.env-${network}`,
  `\r\# Deployed at \rCRYPTON_TOKEN_ADDRESS=${cryptonToken.address}\r`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
