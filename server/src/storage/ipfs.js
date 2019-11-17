const IPFS = require('ipfs-api');

ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

exports.uploadToIPFS = (userInfo) => {
    ipfs.files.add(Buffer.from(JSON.stringify(userInfo)))
    .then(res => {
        const hash = res[0].hash
        console.log('added data hash:', hash)
        return hash
    });
}

exports.readUserInfoFromIPFS = (hash) => {
    ipfs.files.cat(hash).then(output => {
        const userInfo = JSON.parse(output)
        console.log('retrieved data:', userInfo)
        return userInfo
      });
}
