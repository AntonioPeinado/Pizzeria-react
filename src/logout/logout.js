import React from 'react';
import { withRouter } from 'react-router-dom';
import authService from '../auth/auth-service';
import Button from '@material/react-button';

import MaterialIcon from '@material/react-material-icon';
import '@material/react-material-icon/dist/material-icon.css';

import 'material-design-icons/iconfont/material-icons.css';

function Logout(props){

    const onLogout = async () => {
        authService.logout().then(() => {
            props.history.replace('/login');
        });
    }

    return <Button unelevated icon={<MaterialIcon title="Logout" icon='power_settings_new'/>} onClick={onLogout}></Button>

}

export default withRouter(Logout);
