import fs from 'fs';
import dotenv from 'dotenv';
import { task } from "hardhat/config";
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { BigNumber } from 'ethers';

task("token-transfer", "Transfers small amount of tokens from owner and backwards")
  .addParam("amount", "The amount of tokens to transfer")
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

    const formatUnits = (amount: BigNumber) => 
      hre.ethers.utils.formatUnits(amount, process.env.CRYPTON_TOKEN_DECIMALS);
    const parseUnits = (amount: string) => 
      hre.ethers.utils.parseUnits(amount, process.env.CRYPTON_TOKEN_DECIMALS);

    let owner, alice: SignerWithAddress;
    let ownerBalance, aliceBalance: BigNumber;
    [owner, alice] = await hre.ethers.getSigners();
    
    ownerBalance = await cryptonToken.balanceOf(owner.address);
    aliceBalance = await cryptonToken.balanceOf(alice.address);
    console.log(`Owner tokens balance: ${formatUnits(ownerBalance)}`);
    console.log(`Alice tokens balance: ${formatUnits(aliceBalance)}`);

    console.log(`\nTransferring ${taskArgs.amount} tokens from owner to alice...\n`)
    await cryptonToken.transfer(
      alice.address,
      parseUnits(taskArgs.amount)
    );

    ownerBalance = await cryptonToken.balanceOf(owner.address);
    aliceBalance = await cryptonToken.balanceOf(alice.address);
    console.log(`Owner tokens balance: ${formatUnits(ownerBalance)}`);
    console.log(`Alice tokens balance: ${formatUnits(aliceBalance)}`);

    console.log(`\nTransferring ${taskArgs.amount} tokens from alice back to owner...\n`)
    await cryptonToken.connect(alice).transfer(
      owner.address,
      parseUnits(taskArgs.amount)
    );

    ownerBalance = await cryptonToken.balanceOf(owner.address);
    aliceBalance = await cryptonToken.balanceOf(alice.address);
    console.log(`Owner tokens balance: ${formatUnits(ownerBalance)}`);
    console.log(`Alice tokens balance: ${formatUnits(aliceBalance)}`);
  });