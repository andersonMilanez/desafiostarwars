module.exports = (app) => {

    let controller = app.ws.WsStarWarsPlanets.planetController;

    app.route("/v1/StarWarsPlanet")
        .get(controller.lerTodosPlanetas.bind(controller))
        .post(controller.inserir.bind(controller));

    app.route("/v1/StarWarsPlanet/:id")
        .get(controller.buscar.bind(controller))
        .delete(controller.excluir.bind(controller));

    app.route("/v1/StarWarsPlanet/nome/:nome")
        .get(controller.buscar.bind(controller));
}