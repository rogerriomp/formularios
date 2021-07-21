import React, { Component } from 'react';
import './CadSucesso.css'
import {Route, Switch, Redirect, BrowserRouter, Link } from 'react-router-dom';


class CadSucesso extends Component {
    constructor(props) {
      super(props)
      this.state = {
        loading: false,
      }
    }

render(){
    return(
        <div class="container">
             <div class="box">
             <div>
            <img class='center' src="http://www.iprev.sc.gov.br/wp-content/uploads/2020/01/logo-iprev-sc.png"></img>
          </div>
          <br/>
          <br/>
          <br/>
          <br/>
          <h1 align='center'><b>Formulário Enviado Com Sucesso!</b></h1>

            </div>
            </div>
    )
}
}

export default CadSucesso;