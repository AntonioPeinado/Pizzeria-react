import React from 'react';
import TopAppBar, {
    TopAppBarIcon,
    TopAppBarRow,
    TopAppBarSection,
    TopAppBarTitle,
} from '@material/react-top-app-bar';
import MaterialIcon from '@material/react-material-icon';
import '@material/react-top-app-bar/dist/top-app-bar.css';
import '@material/react-material-icon/dist/material-icon.css';

import Logout from '../../logout/logout.js'

export default class Header extends React.Component {

    render() {
        return (
            <TopAppBar>
                <TopAppBarRow>
                    <TopAppBarSection align='start'>
                        <TopAppBarIcon navIcon tabIndex={0}>
                            <MaterialIcon hasRipple icon='menu' onClick={this.props.onClick} />
                        </TopAppBarIcon>
                    </TopAppBarSection>
                    <TopAppBarSection align='center'>
                        <TopAppBarTitle>Pizzeria</TopAppBarTitle>
                    </TopAppBarSection>
                    <TopAppBarSection align='end'>
                        <Logout></Logout>
                    </TopAppBarSection>
                </TopAppBarRow>
            </TopAppBar>
        )
    }
}
