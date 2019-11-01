const jsyaml = require("js-yaml");
const fs = require("fs");
const messages = require("../utils/messages");
const parseEntityData = require("./construct/parser/entity");
const parseServiceData = require("./construct/parser/service");
const parseControllerData = require("./construct/parser/controller");
const generateModule = require("./construct/parser/module");
const createSetup = require("./construct/utils/setup");
const nesting = require("../utils/nesting");
const createErFile = require("./construct/utils/er.js");

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

const createApplication = (entities, services, controllers, api) => {
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
    fs.writeFileSync(
      `${process.cwd()}/src/${name}/${name}.module.ts`,
      generateModule(name)
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
  createErFile(json);
  const entities = generateEntities(json);
  const services = generateServices(json);
  const controllers = generateControllers(json);
  createApplication(entities, services, controllers, json.api);
  return nesting();
};

module.exports = construct;
