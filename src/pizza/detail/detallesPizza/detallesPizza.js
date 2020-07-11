import React from 'react';
import Card, { CardPrimaryContent, CardMedia } from '@material/react-card';
import '@material/react-card/dist/card.css'; 
import '@material/react-list/dist/list.css';
import './detallesPizza.css';
import List, {ListItem} from '@material/react-list';
import config from '../../../core/config';
function img(pizza){
    return config.baseURL + pizza.img;
}

function getPrice(pizza){
    let price = 0;
    for(let ingredient of pizza.ingredients){
       price = ingredient.price
    } 
    return price;
    
}

export default function DetallesPizza(props){
  const pizza = props.pizza;
    return (
        <div className="detalles-pizza" >
            <Card outlined className="pizza-detalles__card">
                <CardPrimaryContent>
                    <div className="pizza-detalles__text">
                        <h2>{pizza.name}</h2> 
                    </div>
                    <CardMedia square imageUrl={img(pizza)} />
                    <div className="pizza-detalles__price"> Precio: {getPrice(pizza)} €</div>
                </CardPrimaryContent>
            </Card>
            <div className="pizza-detalles__ingredients">
                <p>Ingredientes</p>
                <List className="pizza-detalles__ingredients__nameprice">
                   {pizza.ingredients.map((ingredient)=>{
                       return(
                           <ListItem key={ingredient.id}>
                             <div>
                                 <span>{ingredient.name}</span>
                                 <spam>{ingredient.price}</spam>
                             </div>  
                           </ListItem>
                        );
                    })}
                </List>  
            </div>
        </div>
    )
}

