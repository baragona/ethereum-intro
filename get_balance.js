const homedir = require('os').homedir();

var Web3 = require('web3');
var net = require('net');

var web3 = new Web3(homedir+'/Library/Ethereum/geth.ipc', net);
var eth = web3.eth;

(async function(){
    try{
        console.log('getting accounts..');
        var accounts = await eth.getAccounts();
        for (var acct of accounts){
            var balance = await eth.getBalance(acct);
            console.log(`balance of ${acct}:  ${web3.utils.fromWei(balance, "ether")} ` );
        }

        process.exit();

    }catch(e){
        console.log('caught error', e);
    }

})();




