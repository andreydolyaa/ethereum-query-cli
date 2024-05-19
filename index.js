import inquirer from "inquirer";
import { ascii, constsList } from "./constants.js";
import {
  getBlockDetailsByNumber,
  getLastBlockNumber,
  getWalletBalance,
} from "./query.js";

const cli = async () => {
  const options = [
    constsList.GET_LAST_BLOCK_NUMBER,
    constsList.GET_BLOCK_DETAILS,
    constsList.GET_WALLET_BALANCE,
  ];

  const selected = await inquirer.prompt({
    type: "list",
    name: "option",
    message: ascii() + '\n Select an option:',
    choices: options,
  });

  const promptOptions = {
    [constsList.GET_LAST_BLOCK_NUMBER]: async () => {
      await getLastBlockNumber();
    },
    [constsList.GET_BLOCK_DETAILS]: async () => {
      await getBlockDetailsByNumber();
    },
    [constsList.GET_WALLET_BALANCE]: async () => {
      await getWalletBalance();
    },
  };

  await promptOptions[selected.option]();
};

cli();
