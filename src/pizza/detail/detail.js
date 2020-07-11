import React from "react";
import { withRouter } from "react-router-dom";
import pizzaService from "../pizza-service";
import { CommentList, AddComments } from "../../comment";
import DetallesPizza from "./detallesPizza/detallesPizza";
import "./detail.css";
class PizzaDetail extends React.Component {
  state = {
    pizza: null,
    error: null,
  };
  componentDidMount() {
    this._getPizza();
  }
  async _getPizza() {
    const id = this.props.match.params.id;
    try {
      const pizza = await pizzaService.get(id, {
        include: ["ingredients", "comments", "comments.user"],
      });
      this.setState({ pizza });
    } catch (err) {
      this._onGetPizzaError(err);
    }
  }
  _onGetPizzaError(error) {
    if (error.status === 404) {
      this.props.history.replace("/not-found");
    } else {
      this.setState({ error });
    }
  }
  _renderPizza() {
    const { pizza } = this.state;
    return (
      <div className="pizza-detail">
        <DetallesPizza pizza={pizza} />
        <div className="pizza-detail__comments">
          <AddComments pizzaId={pizza.id} />
          <CommentList comments={pizza.comments} />
        </div>
      </div>
    );
  }
  _renderError() {
    return (
      <div>No se ha podido recuperar la pizza intentelo en unos minutos</div>
    );
  }
  render() {
    if (this.state.error) {
      return this._renderError();
    }
    if (this.state.pizza) {
      return this._renderPizza();
    }
    return <div>Loading...</div>;
  }
}

export default withRouter(PizzaDetail);

// pizzas/12 -> esa pizza existe pintas la info los comentarios y el form de comentarios
// pizzas/4567895687 -> no existe vamos a not-found
// pizzas/12 -> te da un 500 pues le dices al usuario que lo sentimos y no esta disponible la pagina
