const CryptoBoard = artifacts.require("./CryptoBoard");
 
module.exports = (deployer) => {
  deployer.deploy(CryptoBoard);
};