const inquirer = require("inquirer");
const crypto = require("@tronscan/client/src/utils/crypto");
const { addressToHex } = require("../utils/address");
const stringToHex = require("string-hex");
const { getTransactionSign, signAndBroadcast } = require("../helpers/apis");
const { broadcastTransaction } = require("../helpers/apis");
const { proposalApprove } = require("../apis/proposal");

const questions = [
  {
    type: "password",
    name: "privateKey",
    message: "What's witness private key:",
  },
  {
    type: "number",
    name: "id",
    message: "Input the proposal id:",
  },
  {
    type: "confirm",
    name: "isApprove",
    message: "Do you want to approve?",
  },
];

const runner = async () => {
  try {
    const { privateKey, id, isApprove } = await inquirer.prompt(questions);

    const owner = crypto.pkToAddress(privateKey);
    const owner_address = owner.startsWith("41") ? owner : addressToHex(owner);

    const transaction = await proposalApprove({
      owner_address,
      proposal_id: id,
      is_add_approval: isApprove,
    });

    const result = signAndBroadcast(transaction, privateKey);

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
