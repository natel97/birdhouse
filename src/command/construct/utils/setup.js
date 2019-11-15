const docker = require('./docker');
const dockerCompose = require('./dockerCompose');
const pkg = require('./package');
const main = require('./main');
const appModule = require('./appModule');
const tsconfig = require('./tsconfig');
const fs = require('fs');

const setup = ({ name, entities }) => {
  kabobName = name.replace('-', '').toLowerCase();
  fs.writeFileSync(`${process.cwd()}/${name}/dockerfile`, docker(false));
  fs.writeFileSync(`${process.cwd()}/${name}/local.dockerfile`, docker(true));
  fs.writeFileSync(`${process.cwd()}/${name}/docker-compose.yml`, dockerCompose(kabobName));
  fs.writeFileSync(`${process.cwd()}/${name}/package.json`, pkg(kabobName));
  fs.writeFileSync(`${process.cwd()}/${name}/src/main.ts`, main(kabobName));
  fs.writeFileSync(`${process.cwd()}/${name}/src/app.module.ts`, appModule(Object.keys(entities)));
  fs.writeFileSync(`${process.cwd()}/${name}/tsconfig.json`, tsconfig(false));
  fs.writeFileSync(`${process.cwd()}/${name}/tsconfig.build.json`, tsconfig(true));
};

module.exports = setup;
