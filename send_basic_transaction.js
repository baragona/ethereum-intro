// send from one account to another

var sender = eth.accounts[0];
var receiver = eth.accounts[1];
var amount = web3.toWei(0.01, "ether");
eth.sendTransaction({from:sender, to:receiver, value: amount});
