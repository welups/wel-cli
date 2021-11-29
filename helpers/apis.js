const axios = require("axios");
const { getFullNodeAPI } = require("./network");

const broadcastTransaction = async ({ visible, ...signedTransaction }) => {
  return axios
    .post(
      getFullNodeAPI() + "/wallet/broadcasttransaction",
      signedTransaction
    )
    .then((res) => {
      console.log(res.data);
      return res.data;
    });
};

const getTransactionSign = async ({ transaction, privateKey }) => {
  return axios
    .post(getFullNodeAPI() + "/wallet/gettransactionsign", {
      transaction,
      privateKey,
    })
    .then((res) => res.data);
};

const triggerSmartContract = async ({
  owner_address,
  contract_address,
  function_selector,
  parameter,
}) => {
  return axios
    .post(getFullNodeAPI() + "/wallet/triggerconstantcontract", {
      owner_address,
      contract_address,
      function_selector,
      parameter,
      // call_value: 0,
      fee_limit: 1000000000,
      // call_token_value: 0,
    })
    .then((res) => res.data);
};

const signAndBroadcast = async (transaction, privateKey) => {
  const sign = await getTransactionSign({
    transaction,
    privateKey,
  });
  console.log("sign", sign);
  return broadcastTransaction(sign);
};

module.exports = {
  signAndBroadcast,
  triggerSmartContract,
  getTransactionSign,
  broadcastTransaction
};
