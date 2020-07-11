import React from 'react';
import { Link } from 'react-router-dom';
import  {ListItemGraphic, ListItemText} from '@material/react-list';
import MaterialIcon from '@material/react-material-icon';
import '@material/react-material-icon/dist/material-icon.css';
import '@material/react-list/dist/list.css';
import './menuItem.css';

function MenuItem (props){
    const {link, text, icon} = props.item;
    return(
        <Link to={link} className="menu-item">
            <ListItemGraphic graphic={<MaterialIcon icon={icon}/>}/>
            <ListItemText primaryText={text}/>
        </Link>
    )
}
export default MenuItem