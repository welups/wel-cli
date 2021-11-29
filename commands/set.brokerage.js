const inquirer = require("inquirer");
const crypto = require("@tronscan/client/src/utils/crypto");
const { addressToHex } = require("../utils/address");
const stringToHex = require("string-hex");
const { signAndBroadcast } = require("../helpers/apis");
const { updateBrokerage } = require("./../apis/witness");

const questions = [
  {
    type: "password",
    name: "privateKey",
    message: "What's owner private key:",
  },
  {
    type: "number",
    name: "brokerage",
    message: "Brokerage",
  },
];

const runner = async () => {
  try {
    const { privateKey, brokerage } = await inquirer.prompt(questions);

    const owner = crypto.pkToAddress(privateKey);
    const owner_address = owner.startsWith("41") ? owner : addressToHex(owner);

    const transaction = await updateBrokerage({
      owner_address,
      brokerage,
    });

    const result = await signAndBroadcast(transaction, privateKey);
    console.log(result);

    return process.exit();
  } catch (error) {
    console.error(error.message);
    return process.exit();
  }
};

module.exports = {
  runner,
};
