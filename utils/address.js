const { toChecksumAddress } = require('ethereum-checksum-address');
const { byteArray2hexStr } = require('@tronscan/client/src/utils/bytes');
const { decode58Check, pkToAddress, genPriKey } = require('@tronscan/client/src/utils/crypto');
const { generateAccount } = require('@tronscan/client/src/utils/account');

const addressToHex = (base58Address) => {
  return toChecksumAddress('0x' + byteArray2hexStr(decode58Check(base58Address)).substring(2)).replace('0x', '41');
};

const genAddress = () => {
  return generateAccount();
};

module.exports = {
  genPriKey,
  addressToHex,
  pkToAddress,
  genAddress,
};
