const axios = require('axios');
const { getFullNodeAPI } = require('../helpers/network');

const proposalCreate = async ({ owner_address, parameters }) => {
  return axios
    .post(getFullNodeAPI() + '/wallet/proposalcreate', {
      owner_address,
      parameters,
    })
    .then((res) => res.data);
};

const proposalApprove = async ({ owner_address, proposal_id, is_add_approval }) => {
  return axios
    .post(getFullNodeAPI() + '/wallet/proposalapprove', {
      owner_address,
      proposal_id,
      is_add_approval,
    })
    .then((res) => res.data);
};

const proposalDelete = async ({ owner_address, proposal_id }) => {
  return axios
    .post(getFullNodeAPI() + '/wallet/proposaldelete', {
      owner_address,
      proposal_id,
    })
    .then((res) => res.data);
};

module.exports = {
  proposalCreate,
  proposalApprove,
  proposalDelete,
};
