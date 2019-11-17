const server = require('./api/api');
const IPFS = require('./storage/ipfs')

// Activate for test purpose
const dummies = require('./dummies')

const port = 3000;


//IPFS.uploadToIPFS(input)
//IPFS.readUserInfoFromIPFS("QmZwXEkC6Xg1RMSPNFch3J3NTBYPkb2UksoSjBDQBavJos")


dummies.uploadDummies()
dummies.loadDummies()


server.listen(port, () => {
    console.log(`Server listening at ${port}`);
});



