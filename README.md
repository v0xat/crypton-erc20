# ERC-20

ERC-20 token implementation according to the https://eips.ethereum.org/EIPS/eip-20 + mint/burn 

Rinkeby: https://rinkeby.etherscan.io/token/0x02B53adF54aC0ef5fd2981c21B10536dcE204123

To run requires `.env` file with:
- MNEMONIC
- ALCHEMY_URL
- ETHERSCAN_API_KEY

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
