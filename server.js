const app       = require('./app');
const config    = require('./config/custom-express');

app.listen(config.PORT, () => {
    console.log(`Servidor rodando na porta ${config.PORT}`);
});
