const util = require("util");
const exec = util.promisify(require("child_process").exec);

const nesting = async () => {
  console.log("will be installing nest");
  // await exec("npm i -g @nestjs/cli");
  // await exec("nest new .");
};

module.exports = nesting;
