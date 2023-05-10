const TreinerModel = require('../model/treiner.model')
const PokemonModel = require('../model/pokemon.model');

const create = async (req, res) => {
  const { name, age, location, is_leader, badges, speciality, pokemons } = req.body

  try {
    const pokemonsDetailed = await PokemonModel.find({
      '_id': {
        $in: pokemons
      }
    });

    if (pokemonsDetailed.length == 0) {
      return res.status(400).json({
        error: '@treiners/create',
        message: "Hey! Wait! Wild Pokémon live in tall grass! You need your own Pokémon for your protection"
      })
    }

    const treiner = await TreinerModel.create({
      name,
      age,
      location,
      is_leader,
      badges,
      speciality,
      pokemons: pokemonsDetailed
    })

    return res.status(201).json(treiner)
  } catch (err) {
    return res.status(400).json({
      error: '@treiners/create',
      message: err.message || 'Failed to create treiner'
    })
  }
}

const list = async (req, res) => {
  const queryParams = req.query

  try {
    const treiners = await TreinerModel.find(queryParams)

    return res.json(treiners)
  } catch (err) {
    return res.status(400).json({
      error: '@treiners/list',
      message: err.message || 'Failed to list treiners'
    })
  }
}

const listById = async (req, res) => {
  const { id } = req.params

  try {
    const pokemon = await TreinerModel.findById(id)

    return res.json(pokemon)
  } catch (err) {
    return res.status(400).json({
      error: '@treiners/listById',
      message: err.message || "failed to list treiner"
    })
  }
}

const update = async (req, res) => {
  const { id } = req.params
  const { name, age, location, is_leader, badges, speciality, pokemons } = req.body

  try {
    const treinerExists = await TreinerModel.findById(id)

    if (!treinerExists) {
      return res.status(400).json({
        error: "@treiners/update",
        message: `Treiner not found ${id}`
      })
    }

    const pokemonsDetailed = await PokemonModel.find({
      '_id': {
        $in: pokemons
      }
    });

    const updatedTreiner = {
      name,
      age,
      location,
      is_leader,
      badges,
      speciality,
      pokemons: pokemons ? pokemonsDetailed : undefined
    }

    if (!updatedTreiner) {
      throw new Error()
    }

    await TreinerModel.findByIdAndUpdate(id, updatedTreiner)

    return res.json(updatedTreiner)
  } catch (err) {
    return res.status(400).json({
      error: '@treiners/update',
      message: err.message || 'Failed to update treiner'
    })
  }
}

const remove = async (req, res) => {
  const { id } = req.params

  try {
    const deletedTreiner = await TreinerModel.findByIdAndRemove(id)

    if (!deletedTreiner) {
      return res.status(400).json({
        error: '@pokemons/remove',
        message: "invalid treiner id"
      })
    }

    return res.json({})
  } catch (err) {
    return res.status(400).json({
      error: '@treiner/remove',
      message: err.message || "error deleting the treiner"
    })
  }
}

module.exports = {
  list,
  create,
  update,
  remove,
  listById,
}