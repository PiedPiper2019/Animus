const ipfs = require("./ipfs")
const ethereum = require("./ethereum")


exports.storeUserData  = (userInfo) => {

    // TODO make it chain
    var hashIPFS = uploadToIPFS(userInfo)
    var hashETH = storeIdentityToEthereum(address, hashIPFS)

    return hashIPFS

}

exports.readUserData  = (hashIPFS) => {

    // TODO 
    var hashIPFS = uploadToIPFS(userInfo)
    var hashETH = storeIdentityToEthereum(address, hashIPFS)

    return (hashIPFS,hashETH)

}

