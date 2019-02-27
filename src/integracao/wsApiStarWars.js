const axios     = require('axios');
const config    = require('./../../config/custom-express');

class WsApiStarWars{
    constructor(error){
        this._host = config.WSAPISTARWARS.HOST
        this._action = config.WSAPISTARWARS.ACTION
        this._error = error
        this._optionsRequest = {
            timeout: config.WSAPISTARWARS.TIMEOUT,
            headers:{Accept:'application/json'}
        };
    }

    getQuantidadeAparicoesPlanetaEmFilmes(planet, resp)
    {
        console.log(`[Integração] - Acessando 'swapi.co' para ler quantidade de aparições
                     do planeta ${planet.nome} em filmes`)
        return axios.get(`${this._host}${this._action}?search=${planet.nome}`, this._optionsRequest)
            .then(response => 
                {
                    var participacoes = response.data.results[0].films.length;
                    console.log (participacoes);
                    return participacoes;
                })
            .catch(error => this._error.catchError(error, resp))
    }
}

module.exports = () => WsApiStarWars