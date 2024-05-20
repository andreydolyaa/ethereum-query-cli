import { Web3 } from "web3";
import inquirer from "inquirer";
import util from "util";

const web3 = new Web3("https://eth.llamarpc.com");

// TODO: create custom prompt func to remove duplicates

// check for last created block number

export const getLastBlockNumber = async () => {
  const blockNum = await web3.eth.getBlockNumber();
  return console.log(`Last block number: ${blockNum}`);
};

export const checkExitChar = (value) => {
  if (value.toLowerCase() === "q") return process.exit(0);
  return;
};

// fetch block details by a specific number

export const getBlockDetailsByNumber = async () => {
  const prompt = async () => {
    const { blockNumber } = await inquirer.prompt({
      type: "input",
      name: "blockNumber",
      message: "Enter the block number (or type 'q' to quit):",
      validate: async function (value) {
        checkExitChar(value);
        const isBlockExists = await web3.eth.getBlock(value);
        return !!isBlockExists || "Please enter valid block number.";
      },
    });
    checkExitChar(blockNumber);
    const blockDetails = await web3.eth.getBlock(blockNumber);
    console.log("Block Details: " + util.inspect(blockDetails));
    prompt();
  };
  prompt();
};

// get number of transactions on a block

export const getNumberOfTransactionsOnBlock = async () => {
  const prompt = async () => {
    const { blockNumOrHash } = await inquirer.prompt({
      type: "input",
      name: "blockNumOrHash",
      message: "Enter block number of hash (or type 'q' to quit):",
      validate: async function (value) {
        checkExitChar(value);
        const isBlockExists = await web3.eth.getBlock(value);
        return !!isBlockExists || "Please enter a valid block number or hash.";
      },
    });
    checkExitChar(blockNumOrHash);
    const transactionsCount = await web3.eth.getBlockTransactionCount(blockNumOrHash);
    console.log("Number of transactions on the block: " + transactionsCount);
    prompt();
  };
  prompt();
};

// check wallet balance

export const getWalletBalance = async () => {
  const prompt = async () => {
    const { walletAddress } = await inquirer.prompt({
      type: "input",
      name: "walletAddress",
      message: "Enter wallet address (or type 'q' to quit):",
      validate: async function (value) {
        checkExitChar(value);
        return web3.utils.isAddress(value) || "Please enter a valid address.";
      },
    });
    checkExitChar(walletAddress);
    const balance = await web3.eth.getBalance(walletAddress);
    console.log("ETH Balance: " + convertWeiToEth(balance));
    prompt();
  };
  prompt();
};

const convertWeiToEth = (wei) => {
  return web3.utils.fromWei(wei, "ether");
};
