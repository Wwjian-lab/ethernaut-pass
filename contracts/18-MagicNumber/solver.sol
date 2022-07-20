pragma solidity ^0.8.0;

contract Solver {
    function whatIsTheMeaningOfLife() external pure returns(uint256) {
        assembly {
            mstore(0x20,0x0000000000000000000000000000000000000000000000000000000000000042)
            return(0x20, 0x20)
        }
    }
}