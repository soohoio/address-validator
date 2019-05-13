const jsSHA = require('jssha');
const base32 = "qpzry9x8gf2tvdw0s3jn54khce6mua7l";
const bs32 = require('base-x')(base32);
const btc = require('./btc.js');

function polyMod(data) {
  let c = 1n;
  data.forEach(d => {
    let c0 = c >> 35n;
    c = ((c & 0x07ffffffffn) << 5n) ^ BigInt(d);

    if (c0 & 0x01n) c ^= 0x98f2bc8e61n;
    if (c0 & 0x02n) c ^= 0x79b76d99e2n;
    if (c0 & 0x04n) c ^= 0xf33e5fb3c4n;
    if (c0 & 0x08n) c ^= 0xae2eabe2a8n;
    if (c0 & 0x10n) c ^= 0x1e4f43e470n;
  });

  return c ^ 1n;
}

module.exports = async addr => {
  if (!addr.includes(":")) {
    let ret = await btc(addr);
    return ret;
  }

  if (addr !== addr.toLowerCase() && addr !== addr.toUpperCase()) {
    return false;
  }

  let splitAddr = addr.toLowerCase().split(":");
  let prefix = splitAddr[0];
  let payload = bs32.decode(splitAddr[1]);

  let prefixUint5 = [];
  [...prefix].forEach((c, i) => {
    prefixUint5.push(c.charCodeAt(0) & 31);
  });

  let payloadUint5 = [];
  let bits = splitAddr[1].length*5 % 8;
  if (bits == 0) {
    bits = 8;
  }

  payload.reduce((acc, cur) => {
    let rem = (acc << 8) | cur;
    bits += 8;
    let t = Math.floor(bits/5);
    while (t--) {
      payloadUint5.push((rem >> (5*t + bits%5)) & 31);
    }
    bits %= 5;
    return rem;
  });

  let dataUint5 = prefixUint5.concat(0, payloadUint5);

  return polyMod(dataUint5) == 0n;
};
