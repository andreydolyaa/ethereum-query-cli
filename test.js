import { Web3 } from "web3";


const web3 = new Web3("https://eth.llamarpc.com");

const test = await web3.eth.getBlock("19907335")

console.log(test);
