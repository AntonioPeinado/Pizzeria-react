import React from 'react';
import Card, {
  CardPrimaryContent,
  CardMedia,
} from "@material/react-card";
import '@material/react-card/dist/card.css';
import config from '../../core/config';
import { withRouter } from 'react-router-dom';
import './pizza-card.css';

 
  function PizzaCard ({pizza, history}) {
       return (
        <Card outlined className="pizza-card" onClick={() => history.push(`/pizzas/${pizza.id}`)}>
          <CardPrimaryContent>
          <CardMedia square imageUrl={`${config.baseURL}${pizza.img}`}/>
            <p className="pizza-card__text">{pizza.name}</p>
      </CardPrimaryContent>
        </Card>
    )
  }

  export default withRouter(PizzaCard);