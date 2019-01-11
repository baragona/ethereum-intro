
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
        var abi_filename = process.argv[2];
        var contract_address = process.argv[3];
        var abi_json  = JSON.parse(fs.readFileSync(abi_filename,'utf-8'));
        //console.log('got ABI json:', abi_json);

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
