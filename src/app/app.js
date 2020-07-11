import React from 'react';
import Header from './header/header';
import Menu from './menu/menu';
import { TopAppBarFixedAdjust } from '@material/react-top-app-bar';
import './app.css';
import Content from './content/content';
import Loading from './linear-progress/linear-progress';
export default class App extends React.Component {
  state = { open: false }; //empieza estando cerrado

  _onCloseMenu = () => {
    this.setState({ open: false });
  }
  _toggleMenu = () => {
    this.setState({ open: !this.state.open });
  }

  render() {
    return (
        <div className='app'>
          <Menu open={this.state.open} onClose={this._onCloseMenu}></Menu>
          <Header onClick={this._toggleMenu}></Header>
          <TopAppBarFixedAdjust className="app__content">
            <div className="app__content__inner">
              <Loading></Loading>
              <Content></Content>
            </div>
          </TopAppBarFixedAdjust>
        </div>
    );
  }
}
