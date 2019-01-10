// send from one account 0 to account 1 to another

var { web3, Web3 } = require('./local_geth_connect');
var eth = web3.eth;



(async function(){
    try{
        console.log('getting accounts..');
        var accounts = await eth.getAccounts();
        var sender = accounts[0];
        var receiver = accounts[1];

        var amount = web3.utils.toWei("0.001", "ether");
        var tx = await eth.sendTransaction({from:sender, to:receiver, value: amount});
        console.log('sent transaction',tx);
        process.exit();

    }catch(e){
        console.log('caught error', e);
        process.exit();
    }

})();









