const util = require('util');
const exec = util.promisify(require('child_process').exec);

const nesting = async (name) => {
  // console.log('will be installing nest');
  // await exec("npm i -g @nestjs/cli");
  // await exec("nest new .");
  await exec(`mv ${process.cwd()}/erd.png ${process.cwd()}/${name}/docs/db.png`);
  console.log('Installing Dependencies');
  await exec('yarn');
  console.log(`Good to go! cd into ./${name} and execute "docker-compose up --build" to start 'er up!`);
  console.log(
    'Note: ER Diagram is generated with the ERD package. For relational data and more, install Haskel and use https://github.com/BurntSushi/erd on the .er file in /docs'
  );
  // await exec("docker-compose up --build");
};

module.exports = nesting;
