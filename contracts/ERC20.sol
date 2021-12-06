// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.10;

import "./IERC20.sol";

/** @title Implementation of the IERC20 interface  */
contract ERC20 is IERC20 {
    uint256 private _totalSupply;
    string private _name;
    string private _symbol;
    uint8 private _decimals;

    mapping(address => uint256) private _balances;
    mapping(address => mapping (address => uint256)) private _allowances;

    constructor(string memory name_, string memory symbol_, uint256 total) {
        _name = name_;
        _symbol = symbol_;
        _decimals = 18;
        _totalSupply = total * 10 ** _decimals;
        _balances[msg.sender] = _totalSupply;
    }

    function name() external view returns (string memory) {
        return _name;
    }

    function symbol() external view returns (string memory) {
        return _symbol;
    }

    function decimals() external view returns (uint8) {
        return _decimals;
    }

    function totalSupply() external view returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address account) external view returns (uint256 balance) {
        return _balances[account];
    }

    function transfer(address to, uint256 amount) external returns (bool) {
        // require(to != address(0), "Can't transfer to zero address");
        require(_balances[msg.sender] >= amount, "Not enough tokens");

        _balances[msg.sender] -= amount;
        _balances[to] += amount;
        emit Transfer(msg.sender, to, amount);
        return true;
    }

    function allowance(address owner, address spender) external view returns (uint256) {
        return _allowances[owner][spender];
    }

    function approve(address spender, uint256 amount) external returns (bool) {
        // require(spender != address(0), "Can't approve to zero address");

        _allowances[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(address owner, address recipient, uint256 amount) external returns (bool) {
        // require(owner != address(0), "Can't transfer from zero address");
        // require(recipient != address(0), "Can't transfer to zero address");
        require(_allowances[owner][msg.sender] >= amount, "Not enough tokens");
        require(_balances[owner] >= amount, "Not enough tokens");

        _balances[owner] -= amount;
        _allowances[owner][msg.sender] -= amount;
        _balances[recipient] += amount;

        emit Transfer(msg.sender, recipient, amount);
        return true;
    }
}