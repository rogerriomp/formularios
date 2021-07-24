import React, { Component, Image } from 'react';
import { Select, Input, DatePicker, Tooltip, Upload, Button, Checkbox } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { isCPF, formatToCPF } from 'brazilian-values'
import { InfoCircleOutlined, UserOutlined, UploadOutlined } from '@ant-design/icons';
import './form_main.css'
import form_main from './form_main'
import Formulario from './form_main';
import Conjuge from './conjuge'
import Companheiro from './Companheiro'
import EXCompanheiro from './Ex-Companheiro'
import EXconjuge from './EXconjuge';

import {Route, Switch, Redirect, BrowserRouter, Link } from 'react-router-dom';


const { Option } = Select;

const { RangePicker } = DatePicker;

const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';

const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];


const props = {
    action: 'http://127.0.0.1:5000/file-upload',
    listType: 'picture',
    beforeUpload(file) {
      return new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const img = document.createElement('img');
          img.src = reader.result;
          img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            ctx.fillStyle = 'red';
            ctx.textBaseline = 'middle';
            ctx.font = '33px Arial';
            ctx.fillText('Ant Design', 20, 20);
            canvas.toBlob(resolve);
          };
        };
      });
    },
  };
  


class Selecionar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cpf:'',
            tp_form: '',
            matricula:''
          
        }
        this.handleChange = this.handleChange.bind(this)
        this.handlechangeCPF = this.handlechangeCPF.bind(this)
        this.convertData = this.convertData.bind(this)
        this.upload_arquivos = this.upload_arquivos.bind(this)

    }
upload_arquivos(value){

    console.log('Valores', value)
}

handleChange(value) {
        console.log(`selected ${value}`);
        this.setState({'tp_form':value})
        console.log(this.state.tp_form, 'Tp form esta!!!')
      }
convertData(str) {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [day,mnth,date.getFullYear()].join("/");
    }

handlechangeCPF(e) {
        //console.log(e.target.value)
        //this.setState({ documentId: cpfMask(e.target.value) })
        this.setState({ cpf: formatToCPF(e.target.value) })

    }

    render() {
        return (<div style={{
            'background-color': '#fffff'
          }}>
                        <img class='center' src="http://www.sea.sc.gov.br/wp-content/uploads/2019/07/logo-iprev-cliente-acervo.jpg" 
                        height="300" width="188"/>
                        
                        {/* <img src="BOTAOPROCESSO.png"/> */}

            <h1 align='center'>Formulário para Pedido de Pensão</h1>

         <div> 
    <table align='center'>
        <tr>
            <th>
    Selecione a relação de parentesco com o ex-servidor: <br/>
    <Select style={{ width: 350 }} onChange={e => {this.handleChange(e)}}>
      <Option value="Cônjuje">Cônjuje</Option>
      <Option value="Ex-Cônjuje">Ex-Cônjuje</Option>  
      <Option value="Companheiro">Companheiro</Option> 
      <Option value="Ex-Companheiro">Ex-Companheiro</Option> 
      <Option value="Filho Solteiro Maior Inválido">Filho Solteiro Maior Inválido</Option> 
      <Option value="Filho menor 21">Filho menor 21</Option> 
      <Option value="Genitores">Genitores</Option> 
      <Option value="Enteado solteiro menor 1">Enteado solteiro menor 1</Option> 
      <Option value="Enteado solteiro maior inválido">Enteado solteiro maior inválido</Option> 
      <Option value="Irmão Solteiro maior inválido">Irmão Solteiro maior inválido</Option> 
      <Option value="Irmão Solteiro menor de 21">Irmão Solteiro menor de 21</Option> 
      <Option value="Tutelado menor de 21">Tutelado menor de 21</Option> 

    </Select>
    </th>
    <th>
    {/* <Checkbox style={{ align: 'center', 'vertical-align':'middle', 'vertical-align': 'middle' }}>Procurador / Representante Legal</Checkbox> */}
        </th>
    </tr>
    </table>
           </div>
           <br/>
{this.state.tp_form == 'Cônjuje' &&
<Conjuge/>
    
}
{this.state.tp_form == 'Companheiro' &&
<Companheiro/>
    
}
{this.state.tp_form == 'Ex-Companheiro' &&
<EXCompanheiro/>
    
}
{this.state.tp_form == 'Ex-Cônjuje' &&
  <EXconjuge/>
}
<br/>
<> </>
<> </>
<br/>

    </div>


        )
    }
}

export default Selecionar;