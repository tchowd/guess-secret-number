pragma solidity ^0.8.0;

contract ConvertToHash {
    function hash(uint256 numToChange) public view returns(bytes32) {
        return keccak256(abi.encodePacked(numToChange));
    }
}