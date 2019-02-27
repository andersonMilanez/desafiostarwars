const mongoose = require('mongoose');


class PlanetDao
{
    constructor()
    {
        this._starWarsPlanet = mongoose.model('planet')
        this._excludedFields = { __v: false }
    }

    lerTodosPlanetas()
    {
        return this._starWarsPlanet.find({}, this._excludedFields);
    }

    incluirPlaneta(planet, participacoes) {

        return new Promise((resolve, reject) => {
            let planetModel = new this._starWarsPlanet();
            
            planetModel.nome            = planet.nome;
            planetModel.clima           = planet.clima;
            planetModel.terreno         = planet.terreno;
            planetModel.participacoes   = participacoes;

            planetModel.save(erro => erro ? reject(erro) : resolve())

         })
    }

    buscarPlanetaPeloId(id)
    {
        console.log(`[planetDao] - Buscando objeto planeta ID: ${id}`);
        return this._starWarsPlanet.findOne({_id : id}, this._excludedFields);
    }

    buscarPlanetaPeloNome(nome)
    {
        console.log(`[planetDao] - Buscando objeto planeta Nome: ${nome}`);
        return new Promise((resolve, reject) =>{
            this._starWarsPlanet.find({nome}, this._excludedFields)
                .then(planets => resolve(planets.map(planet => Object.assign({}, planet._doc))));
        });
    }

    excluirPlaneta(idPlaneta)
    {
        console.log(`[planetDao] - Excluindo objeto planeta ID ${idPlaneta}`);
        return this._starWarsPlanet.findOneAndDelete({ _id : idPlaneta });
    }

    ehIdValido(id)
    {
        return mongoose.Types.ObjectId.isValid(id);
    }

}

module.exports = () => PlanetDao;