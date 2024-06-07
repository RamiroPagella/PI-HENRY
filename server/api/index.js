const express = require("express");
const { Country, conn } = require("../src/db.js");
const data = require("../data.js");
const morgan = require("morgan");
const router = require("../src/routes/index.js");
const cors = require('cors');

const PORT = 3001;

//////////////////////////

const server = express();

server.use(morgan("dev"));
server.use(express.json());
server.use(cors());
server.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  next();
});

server.use(router);

conn
  .sync({ force: true })
  .then(() => {
    server.listen(PORT, async () => {
      console.log(`Server listening on port ${PORT}`);

      if ((await Country.count()) <= 0) {
        try {
          const countries = await Country.bulkCreate(data);
        } catch (error) {
          console.log(
            "Error al enviar los paises a la base de datos:",
            error.message
          );
        }
      }
    });
  })
  .catch((error) => console.error(error));

module.exports = server;
