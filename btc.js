const jsSHA = require('jssha');
const base58 = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
const bs58 = require('base-x')(base58);

module.exports = async addr => {
  let btcForm = new RegExp("[" + base58 + "]{27,35}$");
  if (!btcForm.test(addr)) {
    return false;
  }

  let decoded = bs58.decode(addr).toString("hex");
  let checksum = decoded.slice(decoded.length-8);
  let origin = decoded.slice(0, decoded.length-8);

  let shaObj = new jsSHA("SHA-256", "HEX");
  shaObj.update(origin);
  let hash = shaObj.getHash("HEX");

  shaObj = new jsSHA("SHA-256", "HEX");
  shaObj.update(hash);
  hash = shaObj.getHash("HEX");

  return hash.slice(0, 8) === checksum;
};
