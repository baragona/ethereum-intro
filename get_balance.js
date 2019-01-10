var { web3, Web3 } = require('./local_geth_connect');
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




