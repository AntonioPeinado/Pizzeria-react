import React from 'react';
import config from '../core/config';

const TOKEN = 'AUTH_TOKEN';
class AuthService extends React.Component {
    get token() {
        return sessionStorage.getItem(TOKEN);
    }
    set token(value) {
        if (!value) {
            this.clearToken();
            return;
        }
        sessionStorage.setItem(TOKEN, value);
    }
    clearToken() {
        sessionStorage.removeItem(TOKEN);
    }
    get isAuthenticated() {
        return Boolean(this.token);
    }
    login(email, password) {
        const userLogin = {
            email,
            password
        };
        return fetch(`${config.apiURL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userLogin),
            credentials: 'include'
        }).then(this._onLoginSuccess).then(this._storeTokenFromBody);
    }
    _onLoginSuccess(res) {
        if (res.status >= 400) {
            throw res;
        }
        return res.json();
    }

    async refresh() {
        // TODO: llamar a /refresh y guardar el nuevo token
        return fetch(`${config.apiURL}/refresh`, {
            method: 'POST',
            credentials: 'include'
        })
            .then(this._onRefresh.bind(this))

        // acordaos de hacer la peticion con credentials: 'include'
        // si /refresh da un 401 -> redirigir al login
    }
    _onRefresh(res) {
        if (res.status >= 400) {
            this.clearToken();
            throw res;
        }
        return res.json().then(this._storeTokenFromBody)
    }
    _storeTokenFromBody = (body) => {
        this.token = body.token;
    }

    async logout() {
        // TODO: llamar a /logout y borrar el token cuidado si nos da un 401
        // tendremos que refrescar y volver a llamar
        await this._callLogout()
            .then(this._onFirstLogout.bind(this))
            .then(this.clearToken())
            .catch(this.clearToken());
    }
    _callLogout() {
        return fetch(`${config.apiURL}/logout`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.token}`
            },
            credentials: 'include'
        });
    }
    _onFirstLogout(res) {
        if (res.status === 401) { //Unauthorized
            return this.refresh().then(this._callLogout);
        }
    }

}
export default new AuthService();