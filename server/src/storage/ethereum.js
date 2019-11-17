const ethers = require('ethers');
const privateKey = require('../storage/keys/keys')
const contractInterace = require('../storage/contracts/interface')

let provider = ethers.getDefaultProvider('goerli');

// Define Owner wallet to push IDS 
exports.wallet = new ethers.Wallet(privateKey,provider);
exports.contract = new ethers.Contract(contractInterace.address,contractInterace.abi,wallet);

// Store IDS with owner accounts
exports.storeIdentityToEthereum = (address, hash) => {
    var txStoreIdentity = contract.storeIdentity(address,hash);

    txStoreIdentity.then(function(transaction){
      console.log(transaction);
    }); 
}


