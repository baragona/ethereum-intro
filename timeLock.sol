pragma solidity >=0.4.22 <0.6.0;

// CHAIN=rinkeby node deploy_contract.js timeLock.sol TimeLock

contract TimeLock {

  address payable public staker;
  bool public funded;
  uint256 fundedAtBlockNum;

  //constructor runs once
  constructor() public  {
    staker = msg.sender;
    funded = false;
  }

  function giveItBack() public {
    require(funded==true);
    require(msg.sender == staker);
    require(block.number > (fundedAtBlockNum+20)); // require the funds to be locked for about 5 minutes, or 20 blocks...
    staker.transfer(address(this).balance);
  }

  // fallback function so one can add funds to the contract after creation
  function () external payable {
      require(funded==false);
      require(msg.sender == staker);
      funded = true;
      fundedAtBlockNum = block.number;
  }

  function isFunded () public view returns (bool) {
      return funded;
  }
  //query for balance
  function getBalance() public view returns (uint256) {
    return address(this).balance;
  }
  function fundedBlockNum () public view returns (uint256) {
      return fundedAtBlockNum;
  }
}
