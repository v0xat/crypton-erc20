// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.10;

/** @title Standard ERC-20 contract interface as described in EIP. */
interface IERC20 {
    /// @notice Returns total amount of tokens in existance.
    function totalSupply() external view returns (uint256);

    /** @notice Returns amount of tokens owned by `account`.
     * @param account Address of the token holder.
     * @return The amount of tokens in uint.
     */
    function balanceOf(address account) external view returns (uint256);

    /** @notice Transfers `amount` of tokens to specified address.
     * @param to Address of recipient.
     * @param amount The amount of tokens to transfer.
     * @return True if transfer was successfull.
     */
    function transfer(address to, uint256 amount) external returns (bool);

    /** @notice Returns the number of tokens approved by an `owner` to a `spender`.
     * @param owner Address of an owner of approved tokens.
     * @param spender Approved address.
     * @return The amount of tokens in uint.
     */
    function allowance(address owner, address spender) external view returns (uint256);

    /** @notice Approves `spender` to use `amount` of function caller tokens.
     * @param spender Address of recipient.
     * @param amount The amount of tokens to approve.
     * @return The amount of tokens in uint.
     */
    function approve(address spender, uint256 amount) external returns (bool);

    /** @notice Allows a spender to spend an allowance.
     * @param sender Address of spender.
     * @param recipient Address of recipient.
     * @param amount The amount of tokens to transfer.
     * @return True if transfer was successfull.
     */
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    /** @notice This event is emitted when a token transfer occurs.
     * @param from Sender`s address.
     * @param to Recipient`s address.
     * @param value The amount of transferred tokens.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /** @notice This event is emitted when a token approval occurs.
     * @param owner The source account.
     * @param spender Address of spender.
     * @param value The amount of tokens.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);
}