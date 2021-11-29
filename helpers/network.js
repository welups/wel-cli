let fullNodeAPI = "";

const setFullNodeAPI = (url) => {
    fullNodeAPI = url
};

const getFullNodeAPI = () => fullNodeAPI;

module.exports = {
  setFullNodeAPI,
  getFullNodeAPI,
};
