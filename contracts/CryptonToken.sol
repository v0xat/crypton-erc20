// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.10;

import "./Ownable.sol";
import "./ERC20.sol";

/** @title Crypton token. */
contract CryptonToken is ERC20, Ownable {
    /** @dev Creates token with custom name, symbol and amount
     * @param name Name of the token.
     * @param symbol Token symbol.
     * @param totalAmount Total amount of tokens.
     */
    constructor(string memory name, string memory symbol, uint256 totalAmount)
        ERC20(name, symbol, totalAmount) {
    }
}