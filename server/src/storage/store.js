const ipfs = require("./ipfs")
const ethereum = require("./ethereum")


exports.storeUserData  = (userInfo) => {

    // TODO make it chain
    var hashIPFS = ipfs.uploadToIPFS(userInfo)
    var hashETH = ipfs.storeIdentityToEthereum(address, hashIPFS)

    return hashIPFS

}

exports.readUserData  = (hashIPFS) => {

    // TODO 
    var hashIPFS = ipfs.uploadToIPFS(userInfo)
    var hashETH = ethereum.storeIdentityToEthereum(address, hashIPFS)

    return (hashIPFS,hashETH)

}

