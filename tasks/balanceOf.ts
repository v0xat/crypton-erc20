import fs from 'fs';
import { task } from "hardhat/config";
import { ethers } from "ethers";
import dotenv from 'dotenv';

task("token-balanceOf", "Prints an account's token balance")
  .addParam("account", "The account's address")
  .setAction(async (taskArgs, hre) => {
    const network = hre.network.name;
    const envConfig = dotenv.parse(fs.readFileSync(`.env-${network}`));
    for (const parameter in envConfig) {
      process.env[parameter] = envConfig[parameter]
    }
    
    const cryptonToken = await hre.ethers.getContractAt(
      process.env.CRYPTON_TOKEN_NAME as string,
      process.env.CRYPTON_TOKEN_ADDRESS as string
    );
    
    const balance = await cryptonToken.balanceOf(taskArgs.account);
    console.log(`${taskArgs.account} account balance is ${ethers.utils.formatUnits(balance, 18)} tokens`);
  });
