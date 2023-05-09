const Router = require('express')

const pokemonsRoutes = require('./pokemons.route')
const treinersRoutes = require('./treiners.route')

const rootRouter = Router();

rootRouter.use('/pokemons', pokemonsRoutes);
rootRouter.use('/treiners', treinersRoutes);

module.exports = rootRouter 