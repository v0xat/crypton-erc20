# ERC-20

ERC-20 token implementation according to the https://eips.ethereum.org/EIPS/eip-20 + mint/burn 

Rinkeby: https://rinkeby.etherscan.io/token/0xbF3B80fd32d87A1470018daF2cCAc549b1cAc0F2

To run requires `.env` file with:
- MNEMONIC
- ALCHEMY_URL

`.env-<network_name>` with:
- CRYPTON_TOKEN_NAME
- CRYPTON_TOKEN_SYMBOL
- CRYPTON_TOKEN_DECIMALS
- CRYPTON_TOKEN_MINT

Try running some of the following tasks:

```shell
npx hardhat test
npx hardhat coverage
npx hardhat run scripts/deploy.ts --network rinkeby
npx hardhat token-transfer --amount 5 --network rinkeby
npx hardhat token-balance --account 0x9c5042b7eB6057f2C9Fa58c82Af330173bc42b35 --network rinkeby
```
