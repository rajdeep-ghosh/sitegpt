FROM node:22-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable pnpm

WORKDIR /home/app

COPY package.json pnpm-* ./

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile


FROM base AS builder

COPY --from=base /home/app/node_modules /home/app/node_modules
COPY . .

RUN pnpm run build

EXPOSE 3000

CMD [ "pnpm", "start" ]
