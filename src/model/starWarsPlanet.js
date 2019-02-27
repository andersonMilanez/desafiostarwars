const mongoose = require('mongoose');

const StarWarsPlanet = {
    nome: 'string',
    clima: 'string',
    terreno: 'string',
    participacoes: 'number',
  };
  
  const schema = new mongoose.Schema(StarWarsPlanet);
  const starWarsPlanet = mongoose.model('planet', schema);
  
  module.exports = { starWarsPlanet };
  