import React from 'react';
import LinearProgress from '@material/react-linear-progress';
import '@material/react-linear-progress/dist/linear-progress.css';
import {bus} from '../../core/bus';

export default class Loading extends React.Component {
  state = {
    requests: 0
  }
  componentDidMount(){
    bus.on('http:request-start', this._onRequestStart);
    bus.on('http:request-end', this._onRequestEnd);
  }
  componentWillUnmount(){
    bus.off('http:request-start', this._onRequestStart);
    bus.off('http:request-end', this._onRequestEnd);
  }
  _onRequestStart = () => {
    this.setState({requests: this.state.requests + 1});
  }
  _onRequestEnd = () => {
    this.setState({requests: this.state.requests - 1});
  }
  render() {
      if (!this.state.requests){
        return null;
      }
      return (
        <LinearProgress/>
      );
  }
}