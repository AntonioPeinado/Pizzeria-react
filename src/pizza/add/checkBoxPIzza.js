import React from 'react'

import List, { ListItem, ListItemText } from '@material/react-list';
import Checkbox from '@material/react-checkbox';
import '@material/react-list/dist/list.css';
import "@material/react-checkbox/dist/checkbox.css";

export default function CheckBoxPizza(props) {

    return (
        <List            
            checkboxList
            selectedIndex={props.selectedIndex}
            handleSelect={(activatedIndex,allSelected) => props.handleSelect(allSelected)} //handleSelect={(allSelected) => props.handleSelect(allSelected)}
        >
            {props.ingredientes.map((ingrediente, i) => {
                return (
                    <ListItem key={ingrediente.id}>
                        {/* si selectedIndex contiene el indice acutual */}
                        {/* [1,3] 0 -> false */}
                        <Checkbox checked={props.selectedIndex.includes(i)}/>
                        <ListItemText primaryText={ingrediente.name} />
                    </ListItem>
                )
            })}
        </List>
    )
}