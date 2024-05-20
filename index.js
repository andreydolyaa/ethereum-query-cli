import inquirer from "inquirer";
import { ascii, optionsList } from "./constants.js";
import {
  getBlockDetailsByNumber,
  getLastBlockNumber,
  getNumberOfTransactionsOnBlock,
  getWalletBalance,
} from "./query.js";

const cli = async () => {
  const options = [
    optionsList.GET_LAST_BLOCK_NUMBER,
    optionsList.GET_BLOCK_DETAILS,
    optionsList.GET_WALLET_BALANCE,
    optionsList.GET_NUMBER_OF_TRANSACTIONS_ON_BLOCK,
  ];

  const selected = await inquirer.prompt({
    type: "list",
    name: "option",
    message: ascii() + "\n Select an option:",
    choices: options,
  });

  const promptOptions = {
    [optionsList.GET_LAST_BLOCK_NUMBER]: async () => {
      await getLastBlockNumber();
    },
    [optionsList.GET_BLOCK_DETAILS]: async () => {
      await getBlockDetailsByNumber();
    },
    [optionsList.GET_WALLET_BALANCE]: async () => {
      await getWalletBalance();
    },
    [optionsList.GET_NUMBER_OF_TRANSACTIONS_ON_BLOCK]: async () => {
      await getNumberOfTransactionsOnBlock();
    },
  };

  await promptOptions[selected.option]();
};

cli();
