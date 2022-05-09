const path = require("path");
const fs = require("fs-extra");
const solc = require("solc");


const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath); // removes the folder


const hydroPath = path.resolve(__dirname, "contracts", 'hydroblox.sol');
const hydrotokenPath = path.resolve(__dirname, "contracts", 'hydrobloxtoken.sol');
const smartmeterPath = path.resolve(__dirname, "contracts", 'smartmeter.sol');

const contentHydro = fs.readFileSync(hydroPath, 'utf8');
const contentHydrotoken = fs.readFileSync(hydrotokenPath, 'utf8');
const contentSmartmeter = fs.readFileSync(smartmeterPath, 'utf8');


var input = {
  language: 'Solidity',
  sources: {
    'hydroblox.sol': {
    	content: contentHydro
    },
    'hydrobloxtoken.sol': {
    	content: contentHydrotoken
    },
    'smartmeter.sol': {
    	content: contentSmartmeter
    },
   },
  settings: {
    outputSelection: { '*': { '*': ['*'] } }
  }
};


const output = JSON.parse(
    solc.compile(JSON.stringify(input))
  );
console.log(output);

for (let contract in output) {
    fs.outputJsonSync(
        path.resolve(buildPath, contract + '.json'),
    output[contract]
    );
}

fs.ensureDirSync(buildPath); 
