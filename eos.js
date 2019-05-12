module.exports = async addr => {
  return /[.abcdefghijklmnopqrstuvwxyz12345]{12}$/i.test(addr);
}
