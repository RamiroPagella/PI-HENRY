const axios = require("axios");
const server = require("../src/server.js");
const { Country, conn } = require("../src/db.js");
const data = require('../data.js');

const PORT = 3001;

//////////////////////////

conn
  .sync({ force: true })
  .then(() => {
    server.listen(PORT, async () => {
      console.log(`Server listening on port ${PORT}`);

      if (await Country.count() <= 0) {
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
