pragma solidity ^0.8.0;

contract HackPreservation {
  // stores a timestamp 
  address public slot0;
  address public slot1;
  uint public storedTime;  

  function setTime(uint _time) public {
    storedTime = _time;
  }
}