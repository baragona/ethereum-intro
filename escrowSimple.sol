// Deploy:


// CHAIN=rinkeby node deploy_contract.js escrowSimple.sol EscrowSimple '["seller address","arbiter address"]'
// The Buyer creates the contract.
// Then the buyer sends some ether to the contract addr
// Then --
//      The buyer OR the arbiter release the ether to the seller.
//      OR - the seller OR the arbiter refunds the ether back to the buyer



pragma solidity >=0.4.22 <0.6.0;

/**

// From https://github.com/JackBekket/escrow-eth/blob/master/contracts/EscrowSimple.sol

// ojotoxy edited to work with newer solidity

/// @author SergeyPonomarev(JackBekket)

buyer = initiator
seller = executor

Simple Escrow service without hard-modifiers and state VALUES

**/



contract EscrowSimple {

  //set variables
  address payable public buyer;
  address payable public seller;
  address public arbiter;

  //constructor runs once
  constructor(address payable _seller, address payable _arbiter) public payable {
    buyer = msg.sender;
    seller = _seller;
    arbiter = _arbiter;
  }

  //make payment to seller
  function payoutToSeller() public {
    require(msg.sender == buyer || msg.sender == arbiter);
    seller.transfer(address(this).balance);
  }

  //refund transaction
  function refundToBuyer() public {
    require(msg.sender == seller || msg.sender == arbiter);
    buyer.transfer(address(this).balance);
  }

  //query for balance
  function getBalance() public view returns (uint256) {
    return address(this).balance;
  }

  // fallback function so one can add funds to the contract after creation
  function () external payable {}

}
