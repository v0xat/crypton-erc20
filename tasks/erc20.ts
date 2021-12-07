import { task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import { ethers } from "ethers";

require("dotenv").config();

const contract = require("../artifacts/contracts/CryptonToken.sol/CryptonToken.json");
const alchemyProvider = new ethers.providers.AlchemyProvider("rinkeby", process.env.ALCHEMY_API_KEY);
const signer = new ethers.Wallet(process.env.RINKEBY_PRIVATE_KEY ?? '', alchemyProvider);

task("token-balanceOf", "Prints an account's token balance")
  .addParam("contract", "The token address on Rinkeby")
  .addParam("account", "The account's address")
  .setAction(async (taskArgs) => {
    const cryptonToken = new ethers.Contract(taskArgs.contract, contract.abi, signer);
    const balance = await cryptonToken.balanceOf(taskArgs.account);
    console.log(`${taskArgs.account} account balance is ${ethers.utils.formatUnits(balance, 18)} tokens`);
  });

task("token-name", "Prints token name")
  .addParam("contract", "The token address on Rinkeby")
  .setAction(async (taskArgs) => {
    const cryptonToken = new ethers.Contract(taskArgs.contract, contract.abi, signer);
    const name = await cryptonToken.name();
    console.log(`Token name: ${name}`);
  });

task("token-supply", "Prints total amount of tokens in existance")
  .addParam("contract", "The token address on Rinkeby")
  .setAction(async (taskArgs) => {
    const cryptonToken = new ethers.Contract(taskArgs.contract, contract.abi, signer);
    const totalSupply = await cryptonToken.totalSupply();
    console.log(`Current supply of the token: ${ethers.utils.formatUnits(totalSupply, 18)}`);
  });
