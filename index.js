require("dotenv").config();
const inquirer = require("inquirer");
const { setFullNodeAPI } = require("./helpers/network");

const questions = [
  {
    type: "rawlist",
    name: "network",
    message: "What's command you want to run?",
    choices: [
      {
        name: "Main net",
        value: "MainNet",
      },
      {
        name: "Test net",
        value: "TestNet",
      },
    ],
  },
  {
    type: "rawlist",
    name: "command",
    message: "What's command you want to run?",
    choices: [
      {
        name: "Set account name",
        value: "set.account.name",
      },
      {
        name: "Transfer WEL",
        value: "Transfer WEL",
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
