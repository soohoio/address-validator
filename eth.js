const sha3 = require('crypto-js/sha3');

module.exports = async addr => {
  if (!/^(0x)?[0-9a-f]{40}$/i.test(addr)) {
    return false;
  }

  addr = addr.replace('0x', '');
  let addrHash = sha3(addr.toLowerCase(), {
    outputLength: 256
  }).toString();

  return [...addr].every((c, i) => {
    return (
      (parseInt(addrHash[i], 16) > 7 && c.toUpperCase() === c) ||
      (parseInt(addrHash[i], 16) <= 7 && c.toLowerCase() === c)
    );
  })
  // maybe add validate routine for ICAP address
  // https://ethereum.stackexchange.com/questions/1374/how-can-i-check-if-an-ethereum-address-is-valid
};
