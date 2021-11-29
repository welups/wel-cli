const axios = require('axios');
const { getFullNodeAPI } = require('../helpers/network');

const updateBrokerage = async ({ owner_address, brokerage }) => {
  return axios
    .post(getFullNodeAPI() + '/wallet/updateBrokerage', {
      owner_address,
      brokerage,
    })
    .then((res) => res.data);
};

module.exports = {
  updateBrokerage,
};
