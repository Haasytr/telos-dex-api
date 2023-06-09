const Router = require('express')

const treinersController = require("../controllers/treinersController")

const treinersRoutes = Router()

treinersRoutes.route('/')
  .post(treinersController.create)
  .get(treinersController.list)

treinersRoutes.route('/:id')
  .get(treinersController.listById)
  .put(treinersController.update)
  .delete(treinersController.remove)

module.exports = treinersRoutes