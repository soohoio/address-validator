const jsSHA = require('jssha');
const base58xrp = "rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz";
const bs58xrp = require('base-x')(base58xrp);

module.exports = async addr => {
  let xrpForm = new RegExp("r[" + base58xrp + "]{27,35}$");
  if (!xrpForm.test(addr)) {
    return false;
  }

  let decoded = bs58xrp.decode(addr).toString("hex");
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
