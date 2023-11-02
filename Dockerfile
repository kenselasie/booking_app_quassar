FROM node:18 AS builder
WORKDIR /app
COPY ./frontend ./frontend
WORKDIR /app/frontend
RUN yarn install

FROM oven/bun:1
WORKDIR /app
COPY --from=builder /app/frontend ./frontend
COPY ./backend ./backend
COPY package.json bun.lockb ./
RUN bun install

# WORKDIR /app/backend
# RUN bun install

ARG PORT
EXPOSE ${PORT:-8888}
CMD [ "bun", "run", "build" ]

