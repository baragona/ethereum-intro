var shell = require('shelljs');

function compile(filename){
    console.log('Compiling...');
    var compiledOutput = shell.exec('solc --optimize --combined-json abi,bin,interface '+filename).stdout;
    return compiledOutput;
}

module.exports = {compile:compile};
