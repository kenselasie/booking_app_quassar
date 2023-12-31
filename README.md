# booking_app

You should have these installed:
1. NodeJS
2. Bun
3. Yarn
4. Docker

install dependencies:

```bash
bun install
bun run install-f-packages
bun run install-b-packages
```
OR

Navigate to frontend folder `cd frontend` and run
```bash
yarn install
```
and
Navigate to backend folder `cd backend` and run
```bash
bun install
```
To run frontend and backend concurrently in dev mode, run this command on the root directory:

```bash
bun run dev
```

You will be able to access frontend on `http://localhost:9000`
and backend APIs are hosted on `http://localhost:8888`



Alternatively, you can use Docker and Docker compose by running.

```bash
docker-compose up
```
App will run on port 8888

The frontend can be built and deployed on vercel, amplify etc. using
```bash
cd frontennd
yarn run build
```


This project was created using `bun init` in bun v1.0.1. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
