const app               = require('./../app');
const mongoose          = require('mongoose');
const should            = require("should");
const request           = require("supertest");
const chai              = require("chai");
const config            = require('./../config/custom-express');
const DatabaseCleaner   = require('database-cleaner');
const expect = chai.expect;

const planetaGeonosis = 
{
    "nome": "Geonosis",
    "clima": "temperate, arid",
    "terreno": "rock, desert, mountain, barren"
}

const planetaDagobah = 
{
    "nome": "Dagobah",
    "clima": "murky",
    "terreno": "swamp, jungles"
}

const planetaNaboo = 
{
    "_id": "5c770c1c5412194418585c42",
    "nome": "Naboo",
    "clima": "temperate",
    "terreno": "grassy hills, swamps, forests, mountains",
    "participacoes" : 4
}

const planetaAlderaan = 
{
    "nome": "Alderaan",
    "clima": "temperate",
    "terreno": "grasslands, mountains"
}

const planetaSemNome = 
{
    "nome": "",
    "clima": "temperate",
    "terreno": "grassy hills, swamps, forests, mountains",
    "participacoes": 0
}

describe('=====Testando api back-end jogo StarWars=====', () => 
{
    const uri = `mongodb://${config.MONGO.HOST}:${config.MONGO.PORT}/${config.MONGO.DATABASE}`
    let id;

    before(done => {
        if (config.ENVIRONMENT != 'test')
        {
            throw new Error ('É necessário alterar o sistema para o ambiente de teste NODE_ENV=test em config/custom-express');
        }
        done();
    });

    beforeEach(done => {
        mongoose.connect(uri, { useNewUrlParser: true }, (erro,db) => 
        {
            let databaseCleaner = new DatabaseCleaner('mongodb');
            databaseCleaner.clean(mongoose.connection.db,() => 
            {
                db.createCollection('planets',null,(planetError, planetsTest) => 
                {
                    planetsTest.insertOne(planetaNaboo, () => done());
                });
            });
        });
    });

    it('===== Buscando todos os planetas da base', done => {
        const response = [planetaNaboo];

        request(app)
            .get(`/v1/StarWarsPlanet`)
            .timeout(30000)
            .expect(200, response)
            .expect('Content-Type',/json/)
            .end(done);
    });

    console.log(`Incluindo a lista de planetas no universo Star Wars`);

    it(`=====Incluindo o planeta ${planetaGeonosis.nome}=====`, (done) => 
    {
        request(app)
            .post(`/v1/StarWarsPlanet`)
            .send(planetaGeonosis)
            .timeout(30000)
            .expect(200, {'msg': `Planeta ${planetaGeonosis.nome} incluido com sucesso`} )
            .expect('Content-Type', /json/ )
            .end(done);    
    });

    it(`=====Incluindo o planeta ${planetaDagobah.nome}=====`, (done) => 
    {
        request(app)
            .post(`/v1/StarWarsPlanet`)
            .send(planetaDagobah)
            .timeout(30000)
            .expect(200, {'msg': `Planeta ${planetaDagobah.nome} incluido com sucesso`} )
            .expect('Content-Type', /json/ )
            .end(done);    
    });

    it(`=====Incluindo o planeta ${planetaAlderaan.nome}=====`, (done) => 
    {
        request(app)
            .post(`/v1/StarWarsPlanet`)
            .send(planetaAlderaan)
            .timeout(30000)
            .expect(200, {'msg': `Planeta ${planetaAlderaan.nome} incluido com sucesso`} )
            .expect('Content-Type', /json/ )
            .end(done);    
    });

    it(`=====Incluindo o planeta 'SEM NOME'=====`, (done) => 
    {
        request(app)
            .post(`/v1/StarWarsPlanet`)
            .send(planetaSemNome)
            .timeout(30000)
            .expect(400, {'msg': ['É necessário informar o nome do planeta']} )
            .expect('Content-Type', /json/ )
            .end(done);    
    });

    it(`=====Consultando com sucesso um planeto pelo ID=====`, (done) => 
    {
        let response = [planetaNaboo];

        request(app)
            .get(`/v1/StarWarsPlanet/${planetaNaboo._id}`)
            .timeout(30000)
            .expect(200, response)
            .expect('Content-Type',/json/)
            .end(done);
    });

    it(`=====Consultando sem sucesso um planeto pelo ID=====`, (done) => 
    {
        request(app)
            .get(`/v1/StarWarsPlanet/5c7199e273058f220200f654`)
            .timeout(30000)
            .expect(404)
            .expect('Content-Type',/json/)
            .end(done);
    });

    it(`=====Consultando com sucesso um planeto pelo NOME=====`, (done) => 
    {
        let response = [planetaNaboo];

        request(app)
            .get(`/v1/StarWarsPlanet/nome/${planetaNaboo.nome}`)
            .timeout(30000)
            .expect(200, response)
            .expect('Content-Type',/json/)
            .end(done);
    });

    it(`=====Consultando sem sucesso um planeto pelo NOME=====`, (done) => 
    {
        request(app)
            .get(`/v1/StarWarsPlanet/nome/terra`)
            .timeout(30000)
            .expect(404)
            .expect('Content-Type',/json/)
            .end(done);
    });

    it('=====Excluindo um planeta com sucesso=====', done => {
        request(app)
            .delete(`/v1/planet/${planetaNaboo.id}`)
            .timeout(30000)
            .expect(200)
            .expect('Content-Type',/json/)
            .end(done);
    });

    it('=====Excluindo um planeta com sucesso=====', done => {
        request(app)
            .delete('/v1/planet/5c7199e273058f220200f654')
            .timeout(30000)
            .expect(404)
            .expect('Content-Type',/html/)
            .end(done);
    });    
});
