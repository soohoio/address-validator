const bch = require('./bch.js');
const btc = require('./btc.js');
const eos = require('./eos.js');
const eth = require('./eth.js');
const ltc = require('./ltc.js');
const neo = require('./neo.js');
const trx = require('./trx.js');
const xrp = require('./xrp.js');

const currencies = [{
  name: 'bitcoin',
  abbr: 'btc',
  validator: btc
}, {
  name: 'bitcoincash',
  abbr: 'bch',
  validator: bch
}, {
  name: 'eos',
  abbr: 'eos',
  validator: eos
}, {
  name: 'ethereum',
  abbr: 'eth',
  validator: eth
}, {
  name: 'litecoin',
  abbr: 'ltc',
  validator: ltc
}, {
  name: 'neo',
  abbr: 'neo',
  validator: neo
}, {
  name: 'tron',
  abbr: 'trx',
  validator: trx
}, {
  name: 'ripple',
  abbr: 'xrp',
  validator: xrp
}];

module.exports = async (addr, platform) => {
  let currency = currencies.find(e => {
    return e.name === platform || e.abbr === platform;
  });

  if (currency === undefined) {
    throw new Error("Not supported");
  }

  return await currency.validator(addr);
}
