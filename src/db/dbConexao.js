const mongoose  = require('mongoose');
const config    = require('./../../config/custom-express');

const uri = `mongodb://${config.MONGO.HOST}:${config.MONGO.PORT}/${config.MONGO.DATABASE}`;

const options = {
  socketTimeoutMS: config.MONGO.TIMEOUT_SOCKET,
  connectTimeoutMS: config.MONGO.TIMEOUT_CONEXAO,
  reconnectTries: config.MONGO.NUM_TENTATIVA_RECONEXAO,
  reconnectInterval: config.MONGO.INTERVAL_RETENTATIVA,
  keepAlive: true,
  autoReconnect: true,
  useNewUrlParser: true,
};

const connectMongodb = () => {
  mongoose.connect(uri, options)
    .then(() => console.debug(`Conectado ao BD ${config.MONGO.DATABASE}`))
    .catch(err => console.log(`Erro ao conectar ao BD ${config.MONGO.DATABASE}`, err));
};

connectMongodb();
