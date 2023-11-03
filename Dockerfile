FROM oven/bun:1
WORKDIR /app
COPY ./backend ./backend
COPY package.json bun.lockb ./
RUN bun install
RUN bun run install-b-packages

ARG PORT
EXPOSE ${PORT:-8888}
CMD [ "bun", "run", "start" ]

