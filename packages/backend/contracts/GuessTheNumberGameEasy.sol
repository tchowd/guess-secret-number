// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "./MyToken.sol";

// Contract for a simple "Guess the Number" game with ERC-20 token rewards
contract GuessTheNumberGameEasy {
    bytes32 secretNumber; // The hashed secret number players need to guess
    address payable owner; // Owner of the game
    MyToken public token; // ERC-20 token used as rewards for winners


        // Event emitted when a player wins
    event Winner(address indexed player, uint256 value, uint256 tokens);
    // Event emitted when a player loses
    event Loser(address indexed player, uint256 value);

    // Constructor that initializes the secret number and game owner
    constructor(bytes32 _secretNumber) payable {
        secretNumber = _secretNumber;
        owner = payable(msg.sender);
        token = new MyToken(10000 * 10**18, address(this));
    }

    // Function that allows players to make a guess
    function play(uint _guess) public payable {
        // Require a minimum payment to play the game
        require(msg.value >= 0.001 ether, "Please pay at least 0.001 ETH to play");
        // Ensure there are enough tokens left in the contract
        uint256 tokensBalance = token.balanceOf(address(this));
        require(tokensBalance >= 100 * 10**18, "contract should have at least 100 tokens");
        uint256 tokensToTransfer = 100 * 10**18;
        uint256 payout = (address(this).balance * 80) / 100;
        
        // Check if the guess is correct
        if (keccak256(abi.encodePacked(_guess)) == secretNumber) {
            // Transfer tokens to the winner
            token.transfer(msg.sender, tokensToTransfer);

            // Transfer Ether to the winner
            (bool sent, bytes memory data) = msg.sender.call{value: payout}("");
            require(sent, "Failed to send Ether");

            // Emit the Winner event
            emit Winner(msg.sender, payout, tokensToTransfer);

            // Generate a new secret number
            uint256 randomtime = block.timestamp;
            uint256 newNumber = randomtime % 11;
            bytes32 newSecretNumber = hashNumber(newNumber);
            changeSecretNumber(newSecretNumber);
        } else {
            // Emit the Loser event
            emit Loser(msg.sender, msg.value);
        }
    }

    // Function to get the token balance of the contract
    function getTokenBalance() public view returns (uint){
        return token.balanceOf(address(this));
    }

    // Function to get the Ether balance of the contract
    function getContractBalance() public view returns (uint) {
        return address(this).balance;
    }

    // Function to get the current secret number's hash
    function getSecretNumberHash() public view returns (bytes32) {
        return secretNumber;
    }

    // Function to change the secret number, only callable by the owner
    function changeSecretNumber(bytes32 _newSecretNumber) public {
        require(msg.sender == owner, "Only the owner can change the secret number");
        secretNumber = _newSecretNumber;
    }

    // Function to hash a number using keccak256
    function hashNumber(uint256 numToChange) public view returns(bytes32) {
        return keccak256(abi.encodePacked(numToChange));
    }

}