const docker = local => `
FROM node:alpine
ADD package.json yarn.lock tsconfig.json ${
  local ? "tsconfig.build.json" : ""
} /app/${
  !local
    ? `
ADD src /app/src`
    : ""
}
RUN yarn
WORKDIR /app
EXPOSE 4000
ENTRYPOINT yarn start${local ? ":dev" : ""}

`;
module.exports = docker;
