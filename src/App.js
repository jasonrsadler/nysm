import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import TopNav from './TopNav';
export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <TopNav />
          <Routes />            
        </div>
      </BrowserRouter>
    );
  }
}
 