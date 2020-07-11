import React from 'react';
import Drawer, {
  DrawerHeader,
  DrawerTitle,
  DrawerContent
} from '@material/react-drawer';
import "@material/react-drawer/dist/drawer.css";
import './menu.css';
import "@material/react-drawer/dist/drawer.css";
import icon from './pizza-icon.png';
import MenuContent from './menuContent.js';
import "@material/react-drawer/dist/drawer.css";



export default class Menu extends React.Component {
  render(){
    return (
      <Drawer className='menu' 
      modal 
      open={this.props.open}
      onClose={this.props.onClose}>
        <DrawerHeader>
          <DrawerTitle tag='h2'>
            PIZZERIA
          </DrawerTitle>
          <img src={icon} alt="" className='menu__image'></img>
        </DrawerHeader>
        <DrawerContent tag='nav'>
            <MenuContent close={this.props.onClose}/>
        </DrawerContent>
        
      </Drawer>
    )
  }
}
