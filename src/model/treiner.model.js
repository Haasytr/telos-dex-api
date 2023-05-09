const { default: mongoose } = require("mongoose");

const TreinerModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  is_leader: {
    type: Boolean,
    required: true,
  },
  badges: {
    type: Array,
  },
  speciality: {
    type: String,
    required: true,
  },
  pokemons: {
    type: Array,
    required: true,
  },
})

module.exports = mongoose.model('treiners', TreinerModel)