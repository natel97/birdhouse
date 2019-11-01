const upper = word => word.charAt(0).toUpperCase() + word.slice(1);

const moduleParser = name => `import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ${upper(name)}Controller from './${name}.controller';
import ${upper(name)}Service from './${name}.service';
import ${upper(name)}Entity from './${name}.entity';

@Module({
  imports: [TypeOrmModule.forFeature([${upper(name)}Entity])],
  controllers: [${upper(name)}Controller],
  providers: [${upper(name)}Service],
})
export default class ${upper(name)}Module {}`;

module.exports = moduleParser;
