require("dotenv").config();
const inquirer = require("inquirer");
const { setFullNodeAPI } = require("./helpers/network");

const questions = [
  {
    type: "rawlist",
    name: "network",
    message: "What's network you want to work with?",
    choices: [
      {
        name: "Main net",
        value: "MainNet",
      },
      {
        name: "Test net",
        value: "TestNet",
      },
      {
        name: "Dev net",
        value: "DevNet",
      },
    ],
  },
  {
    type: "rawlist",
    name: "command",
    message: "What's command you want to run?",
    choices: [
      {
        name: "Generate random wallet",
        value: "generate.wallet",
      },
      {
        name: "Set account name",
        value: "set.account.name",
      },
      {
        name: "Witness set brokerage",
        value: "set.brokerage",
      },
      {
        name: "Approve proposal",
        value: "approve.proposal",
      },
      {
        name: "Create keystore",
        value: "create-keystore",
      },
    ],
  },
];

(async () => {
  const { command, network } = await inquirer.prompt(questions);
  switch (network) {
    case "MainNet":
        setFullNodeAPI('http://13.213.231.230:16667')
      break;
    case "TestNet":
        setFullNodeAPI('http://172.104.51.182:16667')
      break;
  }

  const {runner} = require('./commands/'+command);

  await runner();

})();
