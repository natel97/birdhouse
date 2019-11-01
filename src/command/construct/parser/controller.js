const upper = word => word.charAt(0).toUpperCase() + word.slice(1);

const methodMap = {
  GET: name => `
  @ApiImplicitParam({ name: 'id' })
  @Get(':id')
  async getSingle${upper(name)}(@Param() id: string): Promise<${upper(
    name
  )}Entity> {
    return this.${name}Service.getSingle${upper(name)}(id);
  }`,
  INDEX: name => `
  @Get()
  async getAll${upper(name)}(): Promise<${upper(name)}Entity[]> {
  return this.${name}Service.getAll${upper(name)}();
}`,
  PUT: name => `      
  @ApiImplicitParam({ name: 'id' })
  @Put(':id')
  async update${upper(name)}(
    @Param() id,
    @Body() ${name}: ${upper(name)}Entity,
  ): Promise<any> {
      return this.${name}Service.update${upper(name)}(id, ${name});
  }
`,
  DELETE: name => `
  @ApiImplicitParam({ name: 'id' })
  @Delete(':id')
  async remove${upper(name)}(
    @Param() id,
  ): Promise<any> {
      return this.${name}Service.remove${upper(name)}(id);
    }
  
`,
  POST: name => `
  @Post()
  async add${upper(name)} (
    @Body() ${name}: ${upper(name)}Entity,
  ): Promise<any> {
    return this.${name}Service.add${upper(name)}(${name});
  }
`
};

const parseController = (name, entity, methods = []) => {
  return `
  import {
        Controller,
        Get,
        Post,
        Body,
        Param,
        Delete,
        Put,
      } from '@nestjs/common';
      import  ${upper(name)}Service from './${name}.service';
      import  ${upper(name)}Entity from './${name}.entity';
      import { ApiImplicitParam } from '@nestjs/swagger';
      
      @Controller('${name}')
      export default class ${upper(name)}Controller {
        constructor(private readonly ${name}Service: ${upper(name)}Service) {}

        ${methods.map(m => methodMap[m](name)).join("")}
      }
`;
};

module.exports = parseController;
