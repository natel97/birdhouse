const jsyaml = require("js-yaml");
const fs = require("fs");
const messages = require("../utils/messages");
const parseEntityData = require("./construct/parser/entity");
const EntityMapper = require("./construct/mapper/entity");
const ServiceMapper = require("./construct/mapper/service");
const ControllerMapper = require("./construct/mapper/controller");

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

  return Object.keys(entities).map(key => parseEntityData(entities[key], key));
};

const generateServices = json => {};

const generateControllers = json => {};

const createApplication = (entities, services, controllers) => {
  console.log(JSON.stringify({ entities, services, controllers }, null, 2));
};

// Construct is exported

const construct = async () => {
  const file = readFile();
  const json = await convertToYaml(file);
  const entities = generateEntities(json);
  const services = generateServices(json);
  const controllers = generateControllers(json);
  return createApplication(entities, services, controllers);
};

module.exports = construct;
