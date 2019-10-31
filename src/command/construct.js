const jsyaml = require("js-yaml");
const fs = require("fs");
const messages = require("../utils/messages");

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
  console.log(json);
  return json;
};

const generateEntities = json => {};

const generateServices = json => {};

const generateControllers = json => {};

const createApplication = (entities, services, controllers) => {};

const construct = async () => {
  const file = readFile();
  const json = convertToYaml(file);
  const entities = generateEntities(json);
  const services = generateServices(json);
  const controllers = generateControllers(json);
  return createApplication(entities, services, controllers);
};

module.exports = construct;
