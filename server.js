const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

let corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./src/models");

db.sequelize.sync()
  .then(() => {
    console.log("Banco Sincronizado...");
  })
  .catch((err) => {
    console.log("Falha ao conectar no Banco: " + err.message);
  });

  // simple route
app.get("/", (req, res) => {
  res.json({ message: "Ben vindo a Facil Iptv." });
});

require("./src/routes/cliente.routes")(app);
require("./src/routes/produto.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor está sendo executado na porta ${PORT}.`);
});



