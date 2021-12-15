const inquirer = require("inquirer");
const Web3 = require('web3');
const inquirerFilePath = require('inquirer-file-path')
const fs = require('fs');

inquirer.registerPrompt('filePath', inquirerFilePath);

var web3 = new Web3(Web3.givenProvider)
const questions = [
  {
    type: "password",
    name: "privateKey",
    message: "What's your private key:",
  },
  {
    type: "password",
    name: "password",
    message: "Input password:",
  },
  {
    type: 'text',
    name: 'path',
    message: 'Enter a path to store',
    default: `${process.cwd()}/keystore.json`,
  }
];

const runner = async () => {
  try {
    const { privateKey, password,path } = await inquirer.prompt(questions);
    const keystore = web3.eth.accounts.encrypt('0x' + privateKey, password);

    fs.writeFileSync(path, JSON.stringify(keystore, null, 2));

  } catch (error) {
    console.error(error.message);
    return process.exit();
  }
};

module.exports = {
  runner,
};
