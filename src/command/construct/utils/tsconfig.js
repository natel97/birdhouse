const tsconfig = build =>
  build
    ? `{
    "extends": "./tsconfig.json",
    "exclude": ["node_modules", "test", "dist", "**/*spec.ts"]
  }
  `
    : `{
    "compilerOptions": {
      "module": "commonjs",
      "declaration": true,
      "removeComments": true,
      "emitDecoratorMetadata": true,
      "experimentalDecorators": true,
      "target": "es2017",
      "sourceMap": true,
      "outDir": "./dist",
      "baseUrl": "./",
      "incremental": true
    },
    "exclude": ["node_modules", "dist"]
  }`;

module.exports = tsconfig;
