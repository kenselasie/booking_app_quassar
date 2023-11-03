import express from "express";
import cors from "cors";
import routes from "./src/routes";
import databaseConnection from "./src/config/db";
import bodyParser from 'body-parser'
import helmet from 'helmet'
import path from 'path'

const app = express();
app.use(helmet());

// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(routes);
// app.use(express.static(path.join(__dirname, '../frontend/dist/spa')));
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist/', 'index.html'));
// });

await databaseConnection();

const PORT = process.env.PORT || 8888;
const serve = () =>
  app.listen(PORT, () => {
    console.info(`App started at http://localhost:${PORT}`);
  });

serve();
