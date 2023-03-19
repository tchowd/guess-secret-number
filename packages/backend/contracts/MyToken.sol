// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Import the OpenZeppelin ERC20 contract
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// MyToken contract that inherits the OpenZeppelin ERC20 contract
contract MyToken is ERC20 {

    // Constructor for the MyToken contract
    // Takes an initial supply and a destination address as parameters
    constructor(uint256 initialSupply, address destination) ERC20("My Token", "MTK") {
    // Mint the initial supply of tokens and assign them to the destination address
    _mint(destination, initialSupply);

    }
}   