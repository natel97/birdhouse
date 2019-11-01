const util = require("util");
const exec = util.promisify(require("child_process").exec);

const nesting = async () => {
  console.log("will be installing nest");
  // await exec("npm i -g @nestjs/cli");
  // await exec("nest new .");
  console.log("Installing Dependencies");
  await exec("yarn");
  console.log("Good to go! Run docker-compose up --build to start 'er up!");
  // await exec("docker-compose up --build");
};

module.exports = nesting;
