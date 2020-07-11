import React from 'react';
import '@material/react-list/dist/list.css';
import List, {ListItem} from '@material/react-list';
import pizzaService from '../pizza-service';
import PizzaCard from './pizza-card';
import './pizza-list.css'

export default class PizzaList extends React.Component {
      state = {pizzas: []}; 

    componentDidMount(){
          this._getPizzas();
         }    
    async _getPizzas(){
        const pizzas = await pizzaService.getAll();
        this.setState({pizzas});
    } 
    render() {
          return (
            <List className="pizza-list">
                {this.state.pizzas.map((pizza)=> {
                    return (
                        <ListItem className="pizza-list__item" key={pizza.id}>
                            <PizzaCard pizza={pizza}/>
                        </ListItem>
                        )})}
            </List>
          )}      
    }