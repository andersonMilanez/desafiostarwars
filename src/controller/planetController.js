class PlanetController
{
    // constructor(planetRepository, swapiService, error){
    //     this._planetRepository = planetRepository
    //     this._swapiService = swapiService
    //     this._error = error
    // }

    constructor (WsApiStarWars, planetDao, error)
    {
        this._WsApiStarWars = WsApiStarWars;
        this._planetDao = planetDao;
        this._error = error;
    }

    lerTodosPlanetas(req, resp)
    {
        try
        {
            console.log('[PlanetController] - Buscando todos os planetas de Star Wars');
            this._planetDao.lerTodosPlanetas()
                .then(planets => planets.length ? resp.status(200).json(planets) : resp.status(200).json({}))

        }
        catch(error)
        {
            this._error.catchError(error, resp)
        }
    }

    inserir(req, resp)
    {
        try
        {
            var form = req.body;
            var arrErros = [];

            if(!this._ehFormPreenchido(form, arrErros))
            {
                resp.status(400).send(this._responseMessage(arrErros));
                return;
            }
            this._cmdIncluirPlaneta(form, resp);
        }
        catch(error)
        {
            this._error.catchError(error, resp)
        }
    }

    buscar(req, resp)
    {
        try
        {
            const { id } = req.params;
            const { nome } = req.params;

            if( this._planetDao.ehIdValido(id) )
            {
                this._planetDao.buscarPlanetaPeloId(id)
                    .then(planet => 
                        {
                            if( planet )
                                resp.status(200).json(planet);
                            else
                                resp.status(404).json({})
                        }
                    );
            }
            else if( nome )
                this._planetDao.buscarPlanetaPeloNome(nome)
                .then(planets => 
                    {
                        if( planets.length > 0 )
                            resp.status(200).json(planets);
                        else
                            resp.status(404).json({});
                    }
                );
            else
            {
                resp.status(400).send(this._responseMessage(`O parâmetro é inválido.`));
                return;
            }

        }
        catch(error)
        {
            this._error.catchError(error, resp);
        }
    }

    excluir(req, resp)
    {
        try
        {
            const { id } = req.params;
            this._excluirPlaneta(id, resp);
        }
        catch(error)
        {
            this._error.catchError(error, resp);
        }

        
    }

    _responseMessage(msg) 
    {
        return {"msg" : msg}
    }

    _ehFormPreenchido(form, arrErros)
    {
        if(!form.nome)
            arrErros.push('É necessário informar o nome do planeta');
        
        if(!form.clima)
            arrErros.push('É necessário informar o clima do planeta');
        
        if(!form.terreno)
            arrErros.push('É necessário informar o terreno do planeta');

        if (arrErros.length == 0 )
            return true;
        else
            return false;
    }

    _cmdIncluirPlaneta(planet, resp)
    {
        console.log(`[PlanetController] - Incluindo ${planet.nome} `);
        this._WsApiStarWars.getQuantidadeAparicoesPlanetaEmFilmes(planet)
            .then(participacaoes => 
                {
                    this._planetDao.incluirPlaneta(planet, participacaoes);
                }
            )
            .then(() =>
                {
                    resp.status(200).json(this._responseMessage(`Planeta ${planet.nome} incluido com sucesso`))
                }
            );
    }

    _excluirPlaneta(idPlaneta, resp)
    {        
        console.log(`[PlanetController] - Excluindo objeto planeta ID ${idPlaneta}`);
        
        this._planetDao.excluirPlaneta(idPlaneta)
            .then(result => 
                {
                    console.log(`Objeto excluído ${result}`);
                    if (result)
                        resp.status(200).json(this._responseMessage(`Planeta de id ${idPlaneta} excluído com sucesso`));
                    else
                        resp.status(404).json({});
                }
            );

    }

}
module.exports = () => PlanetController;
