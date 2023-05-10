const Router = require('express')

const pokemonsController = require("../controllers/pokemonsController")

const pokemonsRoutes = Router()

pokemonsRoutes.route('/')
  .get(pokemonsController.list)
  .post(pokemonsController.create)

pokemonsRoutes.route('/:id')
  .get(pokemonsController.listById)
  .put(pokemonsController.update)
  .delete(pokemonsController.remove)



module.exports = pokemonsRoutes