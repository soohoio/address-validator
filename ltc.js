module.exports = async addr => {
  // it's for mainnet addresses
  // if testnet addresses need to be included, use regex below
  // /^[LM3Q2mn][a-km-zA-HJ-NP-Z1-9]{26,33}$/
  return /^[LM3][a-km-zA-HJ-NP-Z1-9]{26,33}$/i.test(addr);
};
