import {randomWallet} from "./utils/ethereum"
import {ipfs} from "./utils/ipfs"
import { stringify } from "querystring"


function storeUserInfo(userInfo){

    var IPFSHash = uploadToIPFS(JSON.stringify(userInfo))

}


function uploadToIPFS(userInfo: string){

    ipfs.files.add(Buffer.from(JSON.stringify(userInfo)), res=>)
    
    .then(res => {
      const hash = res[0].hash
      console.log('added data hash:', hash)
      return ipfs.files.cat(hash)
    })
    .then(output => {  
        
        JSON.parse(output) 
    
    })


}


// To use only for test purpose
// Goerli contract : 0xad6B068d465adbb2056fC6ec10c40616Bc7B3D35
function uploadToEthereum(userInfo: string): string{
    return ""
}

