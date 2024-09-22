ARG VARIANT=1-22-bookworm
FROM mcr.microsoft.com/devcontainers/javascript-node:${VARIANT}

WORKDIR /usr/src/app

RUN apt-get update
RUN su node -c "npm install -g pnpm typescript ts-node"
RUN su node -c "npm install -g @nrwl/cli"
RUN su node -c "npm install -g get-graphql-schema @nestjs/cli@10.4.5"
# Exponer el puerto de nestjs
EXPOSE 3000
# Exponer el puerto de postgres
EXPOSE 5432