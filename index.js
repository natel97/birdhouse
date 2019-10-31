#! /usr/bin/env node

const { NO_COMMAND, FAILED } = require("./src/utils/messages");
const commandList = require("./src/command");

const [, , ...args] = process.argv;

if (commandList[args[0]]) {
  try {
    return commandList[args[0]]();
  } catch (e) {
    return FAILED(e);
  }
}

return NO_COMMAND();
