# booking_app

You should have these installed:
1. NodeJS
2. Bun
3. Yarn
4. Docker

install dependencies:

```bash
bun install
```

To run in dev mode:

```bash
bun run dev
```

You will be able to access frontend on `http://localhost:9000`
and backend APIs are hosted on `http://localhost:8888`


To run in build mode:

```bash
bun run build
```
The production ready application will run on `http://localhost:8888`

Alternatively, you can use Docker and Docker compose by running.

```bash
docker-compose up
```
App will run on port 8888

This project was created using `bun init` in bun v1.0.1. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
