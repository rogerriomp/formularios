
import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'
import Routes from './Router';
import {Route, Switch, Redirect, Link } from 'react-router-dom';

class Start extends Component {
    constructor(props) {
      super(props)
      this.state = {
        loading: false,
      }
    }

render(){
    return(
        <div>
            <BrowserRouter>
            <div>
            <Routes />
            </div>
            </BrowserRouter>
            </div>
    )
}
}

export default Start;