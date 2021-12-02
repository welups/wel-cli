const { genAddress } = require("../utils/address");

const runner = async () => {
  const address = genAddress();
  console.log(JSON.stringify(address, null, 2));
};

module.exports = {
  runner,
};
