const jsyaml = require("js-yaml");
const fs = require("fs");
const messages = require("../utils/messages");
const parseEntityData = require("./construct/parser/entity");
const parseServiceData = require("./construct/parser/service");
const parseControllerData = require("./construct/parser/controller");
const captain = require("./construct/utils/captain");
const docker = require("./construct/utils/docker");
const drone = require("./construct/utils/drone");
const dockerCompose = require("./construct/utils/dockerCompose");

const readFile = () => {
  const location = process.cwd() + "/.birdhouse.yml";
  if (!fs.existsSync(location)) {
    messages.FILE_NOT_FOUND();
    throw "ERROR";
  }

  const file = fs.readFileSync(location);
  return file;
};

const convertToYaml = async file => {
  const error = "";
  const json = await jsyaml.load(file, { onWarning: e => (error = e) });

  if (error) {
    console.log(error);
    throw error;
  }
  console.log(JSON.stringify(json, null, 2));
  return json;
};

const generateEntities = json => {
  if (!json || !json.api || !json.api.entities) {
    console.log("schema error");
    throw "YAML does not match schema. Entities not found";
  }

  const entities = json.api.entities;

  const map = {};

  Object.keys(entities).forEach(
    key => (map[key] = parseEntityData(entities[key], key))
  );

  return map;
};

const generateServices = json => {
  const entities = json.api.entities;

  const map = {};
  Object.keys(entities).forEach(
    e => (map[e] = parseServiceData(e, entities[e]))
  );

  return map;
};

const generateControllers = json => {
  const { entities, routes } = json.api;
  const hash = {};
  Object.keys(entities).forEach(
    key => (hash[key] = parseControllerData(key, entities[key], routes[key]))
  );
  return hash;
};

const createSetup = ({ team, domain, name }) => {
  name = name.replace("-", "").toLowerCase();
  fs.writeFileSync(".captain.yml", captain(name, domain, team));
  fs.writeFileSync("dockerfile", docker(false));
  fs.writeFileSync("local.dockerfile", docker(true));
  fs.writeFileSync("docker-compose.yml", dockerCompose(name));
  fs.writeFileSync(".drone.yml", drone(name));
};

const createApplication = (entities, services, controllers, api) => {
  console.log(JSON.stringify({ entities, services, controllers }, null, 2));
  fs.mkdirSync(`${process.cwd()}/src`);

  createSetup(api);

  Object.keys(entities).forEach(name => {
    try {
      fs.mkdirSync(`${process.cwd()}/src/${name}`);
    } catch (e) {}
    fs.writeFileSync(
      `${process.cwd()}/src/${name}/${name}.entity.ts`,
      entities[name]
    );
  });
  Object.keys(services).forEach(name => {
    try {
      fs.mkdirSync(`${process.cwd()}/src/${name}`);
    } catch (e) {}
    fs.writeFileSync(
      `${process.cwd()}/src/${name}/${name}.service.ts`,
      services[name]
    );
  });
  Object.keys(controllers).forEach(name => {
    try {
      fs.mkdirSync(`${process.cwd()}/src/${name}`);
    } catch (e) {}
    fs.writeFileSync(
      `${process.cwd()}/src/${name}/${name}.controller.ts`,
      controllers[name]
    );
  });
};

// Construct is exported

const construct = async () => {
  const file = readFile();
  const json = await convertToYaml(file);
  const entities = generateEntities(json);
  const services = generateServices(json);
  const controllers = generateControllers(json);
  return createApplication(entities, services, controllers, json.api);
};

module.exports = construct;
