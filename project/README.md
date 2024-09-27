## Project setup

1. Instalar
```bash
$ yarn install
```
2. Clonar el archivo ```.env.default``` y crear ```.env```
3. Modificar las variables de entorno
4. Ejecutar el seed ``` http://localhost:3000/api/seed ```
5. Levantar el proyecto

## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Run tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

### Paquetes instalados

1. configurar variables de entorno
```
npm i --save @nestjs/config
```

2. Base de dato
```
npm install --save @nestjs/typeorm typeorm pg
```