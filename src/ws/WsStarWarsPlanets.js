module.exports = (app) =>
{
    return{
        get planetController()
        {
            return new app.controller.planetController(this.wsApiStarWars, this.planetDao, this.error);
        },

        get planetDao()
        {
            return new app.dao.planetDao();
        },

        get wsApiStarWars(){
            return new app.integracao.wsApiStarWars(this.error);
        },

        get error()
        {
            return new app.util.trataErrors();
        }
    }
}