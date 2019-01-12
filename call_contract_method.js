
var { web3, Web3 } = require('./local_geth_connect');
var eth = web3.eth;

var {compile} = require('./compiler');

var fs = require('fs');

(async function(){
    try{
        console.log('getting accounts..');
        var accounts = await eth.getAccounts();
        var sender = accounts[0];

        //var filename = process.argv[2];
        //var abi_filename = process.argv[2];
        var contract_address = process.argv[2];
        //var abi_json  = JSON.parse(fs.readFileSync(abi_filename,'utf-8'));
        //console.log('got ABI json:', abi_json);
        var abi_json = [{"constant":false,"inputs":[{"name":"key","type":"uint256"},{"name":"value","type":"uint256"}],"name":"set","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"key","type":"uint256"}],"name":"get","outputs":[{"name":"retVal","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"hashTableValues","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];
        var contractObj = new eth.Contract(abi_json, contract_address, {});

        console.log('loaded contract obj', contractObj);

        // dry run
        //var result = await contractObj.methods.set("1010101", "1234567").call({from: sender});

        // publish
        var result = await contractObj.methods.set("1010101", "1234567").send({from: sender});

        console.log('got result', result);

        process.exit();

    }catch(e){
        console.log('caught error', e);
        process.exit();
    }

})();
