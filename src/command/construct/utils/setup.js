const docker = require("./docker");
const dockerCompose = require("./dockerCompose");
const pkg = require("./package");
const main = require("./main");
const appModule = require("./appModule");
const tsconfig = require("./tsconfig");
const fs = require("fs");

const setup = ({ team, domain, name, entities }) => {
  name = name.replace("-", "").toLowerCase();
  fs.writeFileSync("dockerfile", docker(false));
  fs.writeFileSync("local.dockerfile", docker(true));
  fs.writeFileSync("docker-compose.yml", dockerCompose(name));
  fs.writeFileSync("package.json", pkg(name));
  fs.writeFileSync("src/main.ts", main(name));
  fs.writeFileSync("src/app.module.ts", appModule(Object.keys(entities)));
  fs.writeFileSync("tsconfig.json", tsconfig(false));
  fs.writeFileSync("tsconfig.build.json", tsconfig(true));
};

module.exports = setup;
