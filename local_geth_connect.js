const homedir = require('os').homedir();

var Web3 = require('web3');
var web3 = new Web3(homedir+'/Library/Ethereum/geth.ipc', require('net'));

module.exports = {
    Web3: Web3,
    web3: web3
};
