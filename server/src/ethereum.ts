import { ethers } from 'ethers';

let randomWallet = ethers.Wallet.createRandom()
console.log(randomWallet)



export {randomWallet}