const axios = require('axios');
const { getFullNodeAPI } = require('../helpers/network');

const updateAccount = async ({ owner_address, account_name }) => {
  return axios
    .post(getFullNodeAPI() + '/wallet/updateaccount', {
      owner_address,
      account_name,
      // visible: true,
    })
    .then((res) => res.data);
};

module.exports = {
  updateAccount,
};
