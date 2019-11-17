const store = require('../src/storage/store')
const ethereum = require('../src/storage/ethereum')
const ipfs = require('../src/storage/ipfs')


let listUser = [
    { "id": "0", "name": "Ulysse", "job": "coder"},
    { "id": "1", "name": "Jean", "job": "athlete"},
    { "id": "2", "name": "Julien", "job": "researcher"},
    { "id": "3", "name": "Gaspard", "job": "backend"}

]

var dummies_db_hash = []
var dummies_db_loaded = []



exports.uploadDummies = () =>{
    for (var i = 0; i < listUser.length; i++) {
        dummies_db_hash[0] =  store.storeUserData(listUser[0])
    }
}


exports.loadDummies = () => {
    for (var i = 0; i < dummies_db_hash.length; i++) {
        dummies_db_loaded[0] =  ipfs.readUserInfoFromIPFS(dummies_db[0])
    }
}




