import React from 'react';
import List, {ListItem} from '@material/react-list';
import MenuItem from './menuItem'; 
import MenuOptions from './menu-options';
import '@material/react-list/dist/list.css';

export default class MenuContent extends React.Component {
  render(){
    return(
      <List>
        {MenuOptions.map((option, i)=>{
          return(
            <ListItem key={i} onClick={this.props.close}>
               <MenuItem item={option}></MenuItem>
            </ListItem>
          )
          })}
      </List>
    )
  }
}

