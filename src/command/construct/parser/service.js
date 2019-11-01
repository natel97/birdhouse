const upper = word => word.charAt(0).toUpperCase() + word.slice(1);

const serviceParser = (name, entity) => {
  return `
    import { Injectable, Dependencies } from '@nestjs/common';
    import ${upper(name)}Entity from './${name}.entity';
    import { getRepositoryToken, InjectRepository } from '@nestjs/typeorm';
    import { Repository } from 'typeorm';
    
    @Injectable()
    @Dependencies(getRepositoryToken(${upper(name)}Entity))
    export default class ${upper(name)}Service {

    constructor(
        @InjectRepository(${upper(name)}Entity)
        private readonly ${name}Repository: Repository<${upper(name)}Entity>,
        ) {}

      async update${upper(name)} (id: string, ${name}: ${upper(
    name
  )}Entity): Promise<any> {
        return await this.${name}Repository.update(id, ${name});
      }
    
      async getAll${upper(name)}(): Promise<${upper(name)}Entity[]> {
        return this.${name}Repository.find();
      }
    
      async getSingle${upper(name)}(id: string): Promise<${upper(name)}Entity> {
        return this.${name}Repository.findOne(id);
      }
    
      async add${upper(name)} (${name}: ${upper(name)}Entity): Promise<any> {
        return this.${name}Repository.insert(${name}).then(x => x.identifiers);
      }

      async remove${upper(name)} (id: string): Promise<any> {
        return this.${name}Repository.delete(id);
      }
    }
`;
};

module.exports = serviceParser;
