import React, {Component} from 'react';
import {Route, Switch, Redirect, BrowserRouter, Link } from 'react-router-dom';
import { Menu, Icon, Layout } from 'antd';
import CadSucesso from './CadSucesso'
import Selecionar from './Selecionar'


export class Routes extends Component {
    state = {
        theme: 'dark',
        current: '1',
      };
    
      changeTheme = value => {
        this.setState({
          theme: value ? 'dark' : 'light',
        });
      };
      handleClick = e => {
        console.log('click ', e);
        this.setState({
          current: e.key,
        });
      };

    render() {
        return (
                <Switch>
                    <Route exact path='/' component={Selecionar}/>
                    <Route exact path='/CadSucesso' component={CadSucesso}/>
                    <Route path="*" component={() => <h1>Page not found</h1>} />

                </Switch>


        )
    }
};

export default Routes;