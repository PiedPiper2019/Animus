import { ethers } from 'ethers'

let provider = ethers.getDefaultProvider('goerli')


let randomWallet = ethers.Wallet.createRandom()
console.log(randomWallet)



export {randomWallet}