module.exports = app => {
    const clientes = require("../controllers/cliente.controller.js");
  
    let router = require("express").Router();
  
    // Create a new Tutorial
    //router.post("/", clientes.create);
  
    // Retrieve all clientes
    router.get("/", clientes.buscaTodosClientes);
  
    // Retrieve all published clientes
    //router.get("/published", clientes.findAllPublished);
  
    // Retrieve a single Tutorial with id
    //router.get("/:id", clientes.findOne);
  
    // Update a Tutorial with id
    //router.put("/:id", clientes.update);
  
    // Delete a Tutorial with id
    //router.delete("/:id", clientes.delete);
  
    // Delete all clientes
    //router.delete("/", clientes.deleteAll);
  
    app.use('/api/clientes', router);
  };