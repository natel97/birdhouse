const generatePackage = name => `{
    "name": "${name}",
    "version": "0.0.1",
    "description": "A lonely bird house",
    "author": "Birds everywhere",
    "license": "MIT",
    "scripts": {
      "build": "tsc -p tsconfig.build.json",
      "format": "prettier --write \\"src/**/*.ts\\"",
      "start": "ts-node -r tsconfig-paths/register src/main.ts",
      "start:dev": "concurrently --handle-input \\"wait-on dist/main.js && nodemon\\" \\"tsc -w -p tsconfig.build.json\\" ",
      "start:debug": "nodemon --config nodemon-debug.json",
      "prestart:prod": "rimraf dist && npm run build",
      "start:prod": "node dist/main.js",
      "lint": "tslint -p tsconfig.json -c tslint.json",
      "test": "jest",
      "test:watch": "jest --watch",
      "test:cov": "jest --coverage",
      "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
      "test:e2e": "jest --config ./test/jest-e2e.json"
    },
    "dependencies": {
      "@nestjs/common": "^6.0.0",
      "@nestjs/core": "^6.0.0",
      "@nestjs/platform-express": "^6.7.2",
      "@nestjs/swagger": "^3.1.0",
      "@nestjs/typeorm": "^6.1.3",
      "pg": "^7.11.0",
      "reflect-metadata": "^0.1.13",
      "rimraf": "^2.6.2",
      "rxjs": "^6.3.3",
      "swagger-ui-express": "^4.0.7",
      "typeorm": "^0.2.18"
    },
    "devDependencies": {
      "@nestjs/testing": "^6.0.0",
      "@types/express": "^4.17.1",
      "@types/jest": "^23.3.13",
      "@types/node": "^12.6.8",
      "@types/supertest": "^2.0.7",
      "concurrently": "^4.1.0",
      "jest": "^23.6.0",
      "nodemon": "^1.18.9",
      "prettier": "^1.15.3",
      "supertest": "^3.4.1",
      "ts-jest": "24.0.2",
      "ts-node": "8.1.0",
      "tsconfig-paths": "3.8.0",
      "tslint": "5.16.0",
      "typescript": "3.4.3",
      "wait-on": "^3.2.0"
    },
    "jest": {
      "moduleFileExtensions": [
        "js",
        "json",
        "ts"
      ],
      "rootDir": "src",
      "testRegex": ".spec.ts$",
      "transform": {
        "^.+\\\\.(t|j)s$": "ts-jest"
      },
      "coverageDirectory": "../coverage",
      "testEnvironment": "node"
    }
  }
  `;

module.exports = generatePackage;
