const inquirer = require("inquirer");
const crypto = require("@tronscan/client/src/utils/crypto");
const { addressToHex } = require("../utils/address");
const stringToHex = require("string-hex");
const { getTransactionSign } = require("../helpers/apis");
const { broadcastTransaction } = require("../helpers/apis");
const { updateAccount } = require("../apis/info");

const questions = [
  {
    type: "password",
    name: "privateKey",
    message: "What's owner private key:",
  },
  {
    type: "input",
    name: "name",
    message: "Name of account",
  },
];

const runner = async () => {
  try {
    const { privateKey, name } = await inquirer.prompt(questions);

    const owner = crypto.pkToAddress(privateKey);
    const owner_address = owner.startsWith("41") ? owner : addressToHex(owner);

    console.log(owner)
    console.log(owner_address)
    const transaction = await updateAccount({
      owner_address,
      account_name: stringToHex(name),
    });

    const sign = await getTransactionSign({
      transaction,
      privateKey,
    });

    await broadcastTransaction(sign);

    return process.exit();
  } catch (error) {
    console.error(error.message);
    return process.exit();
  }
};

module.exports = {
  runner,
};
