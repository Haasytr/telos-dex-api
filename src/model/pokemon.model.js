const { default: mongoose } = require("mongoose");

const PokemonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  pokedex_number: {
    type: Number,
  },
  attack: {
    type: Number,
    required: true,
  },
  defense: {
    type: Number,
    required: true,
  },
  speed: {
    type: Number,
    required: true,
  },
  hp: {
    type: Number,
    required: true,
  },
  type1: {
    type: String,
    required: true,
  },
  type2: {
    type: String,
  },
  is_legendary: {
    type: Boolean,
    default: false
  },
})

module.exports = mongoose.model('pokemons', PokemonSchema)