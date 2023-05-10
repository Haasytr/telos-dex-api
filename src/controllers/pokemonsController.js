const PokemonModel = require('../model/pokemon.model')

const create = async (req, res) => {
  const { name, attack, defense, speed, hp, type1, type2, is_legendary } = req.body

  const pokemonAlreadyExists = await PokemonModel.findOne({ name: name })

  if (pokemonAlreadyExists) {
    return res.status(400).json({
      error: '@pokemons/create',
      message: 'Pokemon already exists'
    })
  }

  const pokedex_number = await PokemonModel.countDocuments() + 1

  try {
    const pokemon = await PokemonModel.create({
      name,
      attack,
      defense,
      speed,
      pokedex_number,
      hp,
      type1,
      type2,
      is_legendary,
    })

    return res.status(201).json(pokemon)
  } catch (err) {
    return res.status(400).json({
      error: '@pokemons/create',
      message: err.message || 'Failed to create pokemon'
    })
  }
}

const list = async (req, res) => {
  const queryParams = req.query

  try {
    const pokemons = await PokemonModel.find(queryParams)

    return res.json(pokemons)
  } catch (err) {
    return res.status(400).json({
      error: '@pokemons/list',
      message: err.message || "failed to list pokemons"
    })
  }
}

const listById = async (req, res) => {
  const { id } = req.params

  try {
    const pokemon = await PokemonModel.findById(id)

    return res.json(pokemon)
  } catch (err) {
    return res.status(400).json({
      error: '@pokemons/listById',
      message: err.message || "failed to list pokemon"
    })
  }
}

const update = async (req, res) => {
  const { id } = req.params
  const { name, attack, defense, speed, hp, type1, type2, is_legendary } = req.body

  try {
    const updatedPokemon = {
      name,
      attack,
      defense,
      speed,
      type1,
      type2,
      hp,
      is_legendary
    }

    if (!updatedPokemon) {
      throw new Error()
    }

    await PokemonModel.findByIdAndUpdate(id, updatedPokemon)

    return res.json(pokemon)
  } catch (err) {
    return res.status(400).json({
      error: '@pokemons/update',
      message: err.message || "failed to update pokemon"
    })
  }
}

const remove = async (req, res) => {
  const { id } = req.params

  try {
    const pokemonDeleted = await PokemonModel.findByIdAndRemove(id)

    if (!pokemonDeleted) {
      return res.status(400).json({
        error: '@pokemons/remove',
        message: "invalid pokemon id"
      })
    }

    return res.status(204).json({})
  } catch (err) {
    return res.status(400).json({
      error: '@pokemon/remove',
      message: err.message || "error deleting the pokemon"
    })
  }

}

module.exports = {
  list,
  create,
  update,
  remove,
  listById
}