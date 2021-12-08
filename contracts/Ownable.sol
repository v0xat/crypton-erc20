//SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.10;

/** @title This contract implements Owner functionality  */
contract Ownable {
  address private _owner;

  /// @notice Inits owner as a contract creator.
  constructor() {
    _owner = msg.sender;
  }

  modifier onlyOwner {
    require(msg.sender == _owner, "Only owner can do this");
    _;
  }

  /** @notice Returns current contract owner.
   * @return Owner address.
   */
  function owner() external view returns(address) {
    return _owner;
  }
}