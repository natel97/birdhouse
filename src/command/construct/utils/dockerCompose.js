const dockerCompose = name => `
version: '3'
services:
  postgres:
    image: postgres
    environment:
      POSTGRES_PASSWORD: test
    ports:
      - '5432:5432'
  backend:
    container_name: ${name}
    environment:
      - DB_USERNAME=postgres
      - DB_PASSWORD=test
      - DB_NAME=postgres
      - DB_PORT=5432
      - DB_HOST=postgres

    volumes:
      - ./src:/app/src
    build:
      dockerfile: local.dockerfile
      context: .
    depends_on: [postgres]
    ports:
      - '4000:4000'
`;

module.exports = dockerCompose;
