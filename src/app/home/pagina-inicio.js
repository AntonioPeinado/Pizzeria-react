import React from 'react';
import './pagina-inicio.css';
import icon from './pizza-icon.png';
class HomePage extends React.Component{
   
  
    render(){
        return (
          <React.Fragment>
            <div className="pizza-inicio">
              <img src={icon} alt=""></img>
            </div>
            <div>
              <h2 className="pizza-inicio__dialogo">
                Pizzeria-react: primer equipo
              </h2>
            </div>
          </React.Fragment>
        );
    }
}
export default HomePage;