// publish a contract from account 0

var { web3, Web3 } = require('./local_geth_connect');
var eth = web3.eth;

var fs = require('fs');
var shell = require('shelljs');

function compile(filename){
    console.log('Compiling...');
    var compiledOutput = shell.exec('solc --optimize --combined-json abi,bin,interface '+filename).stdout;
    return compiledOutput;
}


(async function(){
    try{
        console.log('getting accounts..');
        var accounts = await eth.getAccounts();
        var sender = accounts[0];

        //var filename = process.argv[2];
        var filename = process.argv[2];
        var classname = process.argv[3];

        var contract_name = filename+":"+classname;

        var contractCompiled = JSON.parse(compile(filename));

        console.log('loaded compiled contract ', contractCompiled);

        var abi_json  = contractCompiled.contracts[contract_name].abi;
        console.log('got ABI json:', abi_json);

        var contractObj = new eth.Contract(JSON.parse(abi_json), {});

        console.log('publishing contract...');

        var newContractInstance = await contractObj.deploy({  data: "0x" + contractCompiled.contracts[contract_name].bin})
            .send({from: sender, gas: 4700000})
            .on('error', function(error){ console.log('error deploying', error) })
            .on('transactionHash', function(transactionHash){ console.log('got tx hash', transactionHash) })
            .on('receipt', function(receipt){
               console.log('got contract address', receipt.contractAddress) // contains the new contract address
            })
            .on('confirmation', function(confirmationNumber, receipt){ console.log('got confirmation'); });

        console.log('Contract published! ', newContractInstance);


        process.exit();

    }catch(e){
        console.log('caught error', e);
        process.exit();
    }

})();









