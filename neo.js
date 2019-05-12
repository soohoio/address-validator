const base58 = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";

module.exports = async addr => {
  let neoForm = new RegExp("A[" + base58 + "]{33}$");
  return neoForm.test(addr);
}
