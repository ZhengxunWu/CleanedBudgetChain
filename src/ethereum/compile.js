const path=require('path');
const solc=require('solc');
const fs=require('fs-extra');

const buildPath=path.resolve(__dirname,'build');
fs.removeSync(buildPath);

const budgetPath = path.resolve(__dirname, 'contract', 'BudgetControl.sol');
const sourceCode=fs.readFileSync(budgetPath, 'utf8');
//compile my solidiy source code->give 2 output, only consider contract prop here
const output=solc.compile(sourceCode, 1).contracts;
//ensure build folder exist, otherwise create the builder folder
fs.ensureDir(buildPath);


for (let contract in output) {

  fs.outputJsonSync(
    //get rid of : with replace 
    path.resolve(buildPath, contract.replace(':', '') + '.json'),

    output[contract]

  );

}