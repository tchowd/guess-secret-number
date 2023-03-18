pragma solidity ^0.8.0;

import "./MyToken.sol";

contract GuessTheNumberGame {
    bytes32 secretNumber;
    address payable owner;
    MyToken public token;

    event Winner(address indexed player, uint256 value, uint256 tokens);
    event Loser(address indexed player, uint256 value);

    constructor(bytes32 _secretNumber) payable {
        secretNumber = _secretNumber;
        owner = payable(msg.sender);
        token = new MyToken(10000 * 10**18, address(this));
    }

    function play(uint _guess) public payable {
        require(msg.value >= 0.001 ether, "Please pay at least 0.001 ETH to play");
        uint256 tokensBalance = token.balanceOf(address(this));
        require(tokensBalance >= 100 * 10**18, "contract should have at least 100 tokens");
        uint256 tokensToTransfer = 100 * 10**18;
        uint256 payout = (address(this).balance * 80) / 100;
        
        if (keccak256(abi.encodePacked(_guess)) == secretNumber) {
            token.transfer(msg.sender, tokensToTransfer);

            (bool sent, bytes memory data) = msg.sender.call{value: payout}("");
            require(sent, "Failed to send Ether");

            emit Winner(msg.sender, payout, tokensToTransfer);


            uint256 randomtime = block.timestamp;
            uint256 newNumber = randomtime % 100;
            bytes32 newSecretNumber = hashNumber(newNumber);
            changeSecretNumber(newSecretNumber);
    }
        else {
            emit Loser(msg.sender, msg.value);
        }
    }
    

    function getTokenBalance() public view returns (uint){
        return token.balanceOf(address(this));
    }

    function getContractBalance() public view returns (uint) {
        return address(this).balance;
    }

    function getSecretNumberHash() public view returns (bytes32) {
        return secretNumber;
    }

    function changeSecretNumber(bytes32 _newSecretNumber) public {
        require(msg.sender == owner, "Only the owner can change the secret number");
        secretNumber = _newSecretNumber;
    }

    function hashNumber(uint256 numToChange) public view returns(bytes32) {
        return keccak256(abi.encodePacked(numToChange));
    }
}