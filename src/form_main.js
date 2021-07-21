import React, { Component, Image } from 'react';
import { Select, Input, DatePicker, Tooltip, Upload, Button, Checkbox } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { isCPF, formatToCPF } from 'brazilian-values'
import { InfoCircleOutlined, UserOutlined, UploadOutlined } from '@ant-design/icons';
import './form_main.css'



const { Option } = Select;

const { RangePicker } = DatePicker;

const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';

const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];


const props = {
    //action: 'http://127.0.0.1:5000/file-upload',
    action: 'http://10.111.10.154:5000/file-upload',
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
  


class Formulario extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            token:"",

            cpf:'',
            tp_form: '',
            matricula:'',

            tp_formulario: '',
            procurador_rep: '',
            poder: '',

            // Executivo
            nome_seg: '',
            servidor_ativo: '',
            dt_nascimento: '',
            dt_obto: '',
            dt_emiss_cert_obto: '',
            dt_ini_serv_publi: '',
            cpf: '',
            matricula: '',
            rg: '',
            org_emissor: '',
            uf: '',
            endereco: '',
            cep: '',
            org_origem: '',
            sexo: '',
            cargo: '',

            // Militar
            patente: '',
            nivel: '',
            org_origem: '',
            gr_nv_ref: '',
            ult_salario_contrib: '',
            temp_contribuicao: '',

            // Requerente
            nome_completo_req: '',
            dt_nascimento_req: '',
            telefone_req: '',
            email_req: '',
            cpf_req: '',
            rg_req: '',
            org_emissor_req: '',
            uf_req: '',
            endereco_req: '',
            cep_req: '',
            profissao_req: '',
            conta_banq_req: '',
            adq_convenio_sc_saude: '',
            nome_mae_req: '',
            req_recebe_pens_aposen: '',

            // Procurador
            nome_procurador: '',
            cpf_procurador: '',
            rg_procurador: '',
            org_emissor_procurador: '',
            uf_procurador: '',
            telefone_procurador: '',
            email_procurador: ''

            
          
        }
        this.handleChange = this.handleChange.bind(this)
        this.handlechangeCPF = this.handlechangeCPF.bind(this)
        this.convertData = this.convertData.bind(this)
        this.upload_arquivos = this.upload_arquivos.bind(this)
        this.enviar = this.enviar.bind(this)

    }

enviar(){
    fetch('/api/lista_file/'+this.state.token, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
          
        },
        body: JSON.stringify({
            'dados': this.state.poder
        })
      })
        .then((r) => r.json())
        .then((json) => {
            console.log(json)
            if(json.lista_arquivos !== null){
                fetch('/api/cad_form', {
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                      
                    },
                    body: JSON.stringify({
                        'dados': this.state
                    })
                  })
                    .then((r) => r.json())
                    .then((json) => {
                        console.log(json)
                        
                    })
                }
        })


}


componentDidMount(){
    var result = '';
for (var i = 8; i > 0; --i) result += (Math.floor(Math.random()*256)).toString(16);
    this.setState({token:result})
    console.log(result,'=====token gerado')
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
                          <div style={{
  'margin-left': '525px'
}}>

<table style={{padding:'10px',margin:'10px'}}>
            {/* <tr>
                <th>
                <Checkbox>Poder Executivo</Checkbox>
                    </th>
                    <th>
                <Checkbox>Assembléia Legislativa</Checkbox>
                    </th>
                    <th>
                <Checkbox>TJ-SC</Checkbox>
                    </th>
                    <th>
                <Checkbox>TCE/SC</Checkbox>
                    </th>
                    <th>
                <Checkbox>Ministério Público</Checkbox>
                    </th>
                    <th>
                <Checkbox>Militar</Checkbox>
                    </th>
                    
                    </tr> */}

<tr>
                        <th>
                        Procurador/Representante:<br/>
                        <Select style={{ width: 200 }} onChange={e => {this.setState({procurador_rep: e})}}>
      <Option value="sim">Sim</Option>
      <Option value="não">Não</Option>
      </Select>


                            </th>
                        <th>
                        Poder:<br/>
                        <Select style={{ width: 200 }} onChange={e => {this.setState({poder: e})}}>
      <Option value="Poder Executivo">Poder Executivo</Option>
      <Option value="Assembléia Legislativa">Assembléia Legislativa</Option>
      <Option value="TJ-SC">TJ-SC</Option>
      <Option value="TCE/SC">TCE/SC</Option>
      <Option value="Ministério Público">Ministério Público</Option>
      <Option value="Militar">Militar</Option>
      </Select>


                            </th>
                        </tr>


              </table>

</div>
              



            <h1 align='center'>DADOS DO INSTITUIDOR (PODER EXECUTIVO - Ex segurado)</h1>
            <div style={{
  'margin-left': '525px'
}}>


              
            <table style={{padding:'10px',margin:'10px'}}>
                <tr>
                    <th>Nome: <br/>
                    <Input 
                    placeholder="Nome" 
                    style={{ width: 550 }}
                    onChange={(e) => { this.setState({ 'nome_seg': e.target.value }) }}
                    />
                        </th>
                        <th>
                        Servidor Ativo:<br/>
                        <Select style={{ width: 200 }} onChange={e => {this.setState({servidor_ativo: e})}}>
      <Option value="sim">Sim</Option>
      <Option value="não">Não</Option>
      </Select>


                            </th>
                        </tr>
                        </table>
                        <table style={{padding:'10px',margin:'10px'}}>
                        <tr>
                        <th>
                                Dt. Nascimento:<br/>
                    <DatePicker style={{ width: 175 }} format={dateFormatList}
                                    onChange={(e) => {if(e!==null) {this.setState({ 'dt_nascimento': this.convertData(e._d) })}}} />
                            </th>
                        <th>Dt. Óbito:<br/>
                        <DatePicker style={{ width: 175 }}  format={dateFormatList}
                                    onChange={(e) => {if(e!==null) {this.setState({ 'dt_obto': this.convertData(e._d) })}}} 
                                    />
                        </th>
                        <th>Dt. Emiss. Cert. Ob.:<Tooltip title="Data da Emissão da Certidão de Óbito">
                                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                  </Tooltip><br/>
                        <DatePicker style={{ width: 175 }}  format={dateFormatList}
                                    onChange={(e) => {if(e!==null) {this.setState({ 'dt_emiss_cert_obto': this.convertData(e._d) })}}} />
                        </th>
                        <th>Dt. Ini.:<Tooltip title="Data de Inicio no serviço público">
                                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                  </Tooltip><br/>
                        <DatePicker style={{ width: 175 }}  format={dateFormatList}
                                    onChange={(e) => {if(e!==null) {this.setState({ 'dt_ini_serv_publi': this.convertData(e._d) })}}} />
                        </th>
                    </tr>
             </table>
             <table style={{padding:'10px',margin:'10px'}}>
             <tr>

<th>CPF: <br/>
<Input placeholder="Insira o CPF"
            maxLength='14'
            name='CPF'
            value={this.state.cpf}
            onChange={this.handlechangeCPF} 
            style={{ width: 250}}
       
            />
    </th>
    <th>
    Matricula:
        <Input placeholder="Insira a matricula"
            onChange={(e) => { this.setState({ 'matricula': e.target.value }) }}
        />
    </th>
    <th>
    RG:
        <Input placeholder="RG"
            onChange={(e) => { this.setState({ 'rg': e.target.value }) }}
        />
    </th>
    </tr>
    </table>
    <table style={{padding:'10px',margin:'10px'}}>
        <tr>
    <th>
    Org. Emissor:<br/>
        <Input placeholder="Org. Emissor"
            style={{ width: 225}}
            onChange={(e) => { this.setState({ 'org_emissor': e.target.value }) }}
        />
    </th>
    <th>
    UF:<br/>
        <Input placeholder="UF"
            style={{ width: 75}}
            onChange={(e) => { this.setState({ 'uf': e.target.value }) }}
        />
    </th>
    </tr>
    </table>
    
    <table style={{padding:'10px',margin:'10px'}}>
        <tr>
        <th>
        Endereço:<br/>
        <Input placeholder="Endereço"
        style={{ width: 400}}
            onChange={(e) => { this.setState({ 'endereco': e.target.value }) }}
        />
    </th>
    <th>
        CEP:<br/>
        <Input placeholder="CEP"
        style={{ width: 150}}
            onChange={(e) => { this.setState({ 'cep': e.target.value }) }}
        />
    </th>
            </tr>
        </table>

        <table style={{padding:'10px',margin:'10px'}}>
            <tr>
            <th>
        Org. de Origem :<br/>
        <Input placeholder="Org. de Origem"
        style={{ width: 200}}
            onChange={(e) => { this.setState({ 'org_origem': e.target.value }) }}
        />
    </th>

            <th>
    Sexo:<br/>
    <Select style={{ width: 150 }} onChange={(e) => {this.setState({'sexo':e})}}>
      <Option value="masculino">Masculino</Option>
      <Option value="feminino">Feminino</Option>  
    </Select>
    </th>
    <th>
        Cargo:<br/>
        <Input placeholder="cargo"
        style={{ width: 250}}
            onChange={(e) => { this.setState({ 'cargo': e.target.value }) }}
        />
    </th>
                </tr>

        </table>
             
             </div>

    
{/* Formulario outros */}




<div>
<h1 align='center'>DADOS DO INSTITUIDOR: EX-SEGURADO (OUTROS PODERES OU MILITAR)</h1>
<div style={{
  'margin-left': '525px'
}}>

<table style={{padding:'10px',margin:'10px'}}>
                <tr>
                <th>Cargo/Patente(se militar): <br/>
                    <Input placeholder="Cargo/Patente" style={{ width: 450 }}
                    onChange={(e) => { this.setState({ 'patente': e.target.value }) }}
                    />
                        </th>
                     </tr>   
                    <tr>
                        <th>Nível: <br/>
                    <Input placeholder="Nível" style={{ width: 450 }}
                    onChange={(e) => { this.setState({ 'nivel': e.target.value }) }}
                    />
                        </th>
                    </tr>
                    <tr>    
                        <th>Órgão de origem: <br/>
                    <Input placeholder="Órgão de origem" style={{ width: 450 }}
                    onChange={(e) => { this.setState({ 'org_origem': e.target.value }) }}
                    />
                        </th>
                    </tr>
                    <tr>
                        <th>Gr/NV/Ref: <br/>
                    <Input placeholder="Gr/NV/Ref" style={{ width: 450 }}
                    onChange={(e) => { this.setState({ 'gr_nv_ref': e.target.value }) }}
                    />
                        </th>
                    </tr>
                    <tr>
                        <th>Ultimo sálario de contribuição: <br/>
                    <Input placeholder="Ultimo sálario de contribuição" style={{ width: 150 }}
                    onChange={(e) => { this.setState({ 'ult_salario_contrib': e.target.value }) }}
                    />
                        </th>
                        </tr>
                    <tr>
                    
                        <th>Tempo de contribuição: <br/>
                    <Input placeholder="Tempo de contribuição" style={{ width: 450 }}
                    onChange={(e) => { this.setState({ 'temp_contribuicao': e.target.value }) }}
                    />
                        </th>
                        </tr>

                        <th>Dt. Ini.:<Tooltip title="Data de Inicio no serviço público">
                                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                  </Tooltip><br/>
                        <DatePicker style={{ width: 175 }}  format={dateFormatList}
                                    onChange={(e) => {if(e!==null) {this.setState({ 'dt_inicio_servico': this.convertData(e._d) })}}} />
                        </th>


                </table>
</div>
</div>

{/*Informações Requerente*/}
<h1 align='center'>INFORMAÇÕES REQUERENTES</h1>
<div style={{
  'margin-left': '525px'
}}>
            <table style={{padding:'10px',margin:'10px'}}>
                <tr>
                    <th>Nome completo do requerente: <br/>
                    <Input placeholder="Nome" style={{ width: 450 }}
                    onChange={(e) => { this.setState({ 'nome_completo_req': e.target.value }) }}
                    />
                        </th>
                        <th>
                                Dt. Nascimento:<br/>
                    <DatePicker format={dateFormatList}
                                    onChange={(e) => {if(e!==null) {this.setState({ 'dt_nascimento_req': this.convertData(e._d) })}}} />
                            </th>
                            </tr>
                            </table>
                           <table style={{padding:'10px',margin:'10px'}}>
                            <tr>
                            <th>Telefone do Requerente: <br/>
                    <Input placeholder="Telefone do Requerente" style={{ width: 200 }}
                    onChange={(e) => { this.setState({ 'telefone_req': e.target.value }) }}
                    />
                        </th>
                        <th>E-mail: <br/>
                    <Input placeholder="E-mail" style={{ width: 350 }}
                    onChange={(e) => { this.setState({ 'email_req': e.target.value }) }}
                    />
                        </th>
                    </tr>
             </table>
             <table style={{padding:'10px',margin:'10px'}}>
             <tr>

<th>CPF: <br/>
<Input placeholder="Insira o CPF"
            maxLength='14'
            name='CPF'
            value={this.state.cpf}
            onChange={this.handlechangeCPF} 
            style={{ width: 250}}
       
            />
    </th>
    <th>
    RG:
        <Input placeholder="RG"
            onChange={(e) => { this.setState({ 'rg_req': e.target.value }) }}
        />
    </th>
    <th>
    Org. Emissor:<br/>
        <Input placeholder="Org. Emissor"
            style={{ width: 225}}
            onChange={(e) => { this.setState({ 'org_emissor_req': e.target.value }) }}
        />
    </th>
    <th>
    UF:<br/>
        <Input placeholder="UF"
            style={{ width: 75}}
            onChange={(e) => { this.setState({ 'uf_req': e.target.value }) }}
        />
    </th>
    </tr>
    </table>
    
    <table style={{padding:'10px',margin:'10px'}}>
        <tr>
        <th>
        Endereço:<br/>
        <Input placeholder="Endereço"
        style={{ width: 400}}
            onChange={(e) => { this.setState({ 'endereco_req': e.target.value }) }}
        />
    </th>
    <th>
        CEP:<br/>
        <Input placeholder="CEP"
        style={{ width: 150}}
            onChange={(e) => { this.setState({ 'cep_req': e.target.value }) }}
        />
    </th>
            </tr>
        </table>

        <table style={{padding:'10px',margin:'10px'}}>
            <tr>
    <th>
        Profissão:<br/>
        <Input placeholder="cargo"
        style={{ width: 250}}
            onChange={(e) => { this.setState({ 'profissao_req': e.target.value }) }}
        />
    </th>
    <th>
        Dados conta bancaria individual:<br/>
        <Input placeholder="Dados conta bancaria individual"
        style={{ width: 300}}
            onChange={(e) => { this.setState({ 'conta_banq_req': e.target.value }) }}
        />
    </th>
    <th>
        Deseja adquirir
        convênio SC-SAÚDE?:<br/>
        <Select style={{ width: 150 }} onChange={e => {this.setState({adq_convenio_sc_saude:e})}}>
      <Option value="sim">Sim</Option>
      <Option value="não">Não</Option>  
    </Select>
    </th>
                </tr>
                <tr>
                <th>
        Nome da Mãe:<br/>
        <Input placeholder="Dados conta bancaria individual"
        style={{ width: 300}}
            onChange={(e) => { this.setState({ 'nome_mae_req': e.target.value }) }}
        />
    </th>
    <th>
        Requerente Recebe pensão ou Aposentadoria?:<br/>
        <Select style={{ width: 150 }} onChange={e => {this.setState({req_recebe_pens_aposen:e})}}>
      <Option value="sim">Sim</Option>
      <Option value="não">Não</Option>  
    </Select>
    </th>
                    </tr>
                

        </table>
             
             </div>
{/*Informações do procurador*/}

{this.state.procurador_rep === 'sim' &&
<h1 align='center'>INFORMAÇÕES DO PROCURADOR/CURADOR/TUTOR</h1>}
{ 
<div style={{
  'margin-left': '525px'
}}>
            <table style={{padding:'10px',margin:'10px'}} >
            <tr>
                    <th>Nome: <br/>
                    <Input placeholder="Nome" style={{ width: 450 }}
                    onChange={(e) => { this.setState({ 'nome_procurador': e.target.value }) }}
                    />
                        </th>
                        </tr>
                        </table>
                        <table style={{padding:'10px',margin:'10px'}}>
                        <tr>
                        <th>CPF: <br/>
<Input placeholder="Insira o CPF"
            maxLength='14'
            name='CPF'
            value={this.state.cpf}
            onChange={this.handlechangeCPF} 
            style={{ width: 250}}
       
            />
    </th>
    <th>
    RG/OAB:
        <Input placeholder="RG"
            onChange={(e) => { this.setState({ 'rg_procurador': e.target.value }) }}
        />
    </th>
    <th>
    Org. Emissor:<br/>
        <Input placeholder="Org. Emissor"
            style={{ width: 225}}
            onChange={(e) => { this.setState({ 'org_emissor_procurador': e.target.value }) }}
        />
    </th>
    <th>
    UF:<br/>
        <Input placeholder="UF"
            style={{ width: 75}}
            onChange={(e) => { this.setState({ 'uf_procurador': e.target.value }) }}
        />
    </th>
                            </tr>
                            </table>
                            <table style={{padding:'10px',margin:'10px'}}>
                            <tr>
                            <th>Telefone do procurador: <br/>
                    <Input placeholder="Telefone do Requerente" style={{ width: 200 }}
                    onChange={(e) => { this.setState({ 'telefone_procurador': e.target.value }) }}
                    />
                        </th>
                        <th>E-mail: <br/>
                    <Input placeholder="E-mail" style={{ width: 350 }}
                     onChange={(e) => { this.setState({ 'email_procurador': e.target.value }) }}
                    />
                        </th>
                    </tr>
                </table>
    </div>
    }
{/*Anexos*/}
<h1 align='center'>Anexos</h1>
<div style={{
  'margin-left': '525px'
}}>

<table style={{padding:'10px',margin:'10px'}} border="1" >
    <tr>
        <th>
            Requerimento de Pensão Preenchido e Assinado (cfe. formulário IPREV)
            </th>
        <th>
        <Upload {...props}
        data = {{'token': this.state.token, 'tp_form':'req.form.iprev'}}
        onChange={this.upload_arquivos("Requerimento form. Iprev")}
        >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
            </th>
        </tr>
        <tr>
        <th>
        Certidão de Óbito do Ex-Segurado(a)/Instituidor(a)
            </th>
        <th>
        <Upload {...props}
        data = {{'token': this.state.token, 'tp_form':'certidao.obito'}}>
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
            </th>
        </tr>
        <tr>
        <th>
        Carteira de Identidade e/ou Carteira de Motorista do(a) Requerente
            </th>
        <th>
        <Upload {...props}
        data = {{'token': this.state.token, 'tp_form':'carteira.identidade.req'}}
        >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
            </th>
        </tr>
        <tr>
        <th>
        Carteira de Identidade e/ou Carteira de Motorista do(a) Ex-Segurado(a)/Instituidor(a)
            </th>
        <th>
        <Upload {...props}
        data = {{'token': this.state.token, 'tp_form':'carteira.identidade.ins'}}
        >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
            </th>
        </tr>
        <tr>
        <th>
        CPF do(a) Ex-Segurado(a)/Instituidor(a)
            </th>
        <th>
        <Upload {...props}
        data = {{'token': this.state.token, 'tp_form':'cpf.ins'}}
        >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
            </th>
        </tr>
        <tr>
        <th>
        Certidão de Casamento atualizada pós óbito (frente e verso)
            </th>
        <th>
        <Upload {...props}
        data = {{'token': this.state.token, 'tp_form':'certidao.casamento'}}
        >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
            </th>
        </tr>
        <tr>
        <th>
        Comprovante de residência em nome do(a) requerente: luz ou água ou telefone (últimos 6 meses)
            </th>
        <th>
        <Upload {...props}
        data = {{'token': this.state.token, 'tp_form':'comprovante.residencia.req'}}
        >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
            </th>
        </tr>
        <tr>
        <th>
        Comprovante de residência em nome do(a)Ex-Segurado(a):  luz ou água ou telefone (últimos 6 meses)
            </th>
        <th>
        <Upload {...props}
        data = {{'token': this.state.token, 'tp_form':'comprovante.residencia.ins'}}
        >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
            </th>
        </tr>
        <tr>
        <th>
        Informação do(a) instituidor(a) da pensão (quando tratar-se de ex-servidor de órgão externo: <br/>
        Tribunal de Justiça, Tribunal de Contas, etc...), conforme formulário do IPREV
            </th>
        <th>
        <Upload {...props}
        data = {{'token': this.state.token, 'tp_form':'informa.inst.ext'}}
        >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
            </th>
        </tr>
        <tr>
        <th>
        Formulário Adesão SC Saúde (segurado(a) associado(a)
            </th>
        <th>
        <Upload {...props}
        data = {{'token': this.state.token, 'tp_form':'formulario.sc.saude'}}
        >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
            </th>
        </tr>
        <tr>
        <th>
        Declaração de Acumulação de benefícios (cfe modelo IPREV)
            </th>
        <th>
        <Upload {...props}
        data = {{'token': this.state.token, 'tp_form':'declaracao.acumulacao.beneficios'}}
        >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
            </th>
        </tr>
        <tr>
        <th>
        Comprovação de Conta Corrente Individual no Banco do Brasil (ag. c/c)(Contrato ou Declaração do Banco)
            </th>
        <th>
        <Upload {...props}
        data = {{'token': this.state.token, 'tp_form':'comprovante.cc'}}
        >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
            </th>
        </tr>
        <tr>
        <th>
        Comprovante de Recebimento de Benefício Previdenciário (não sendo aceito extrato bancário)
            </th>
        <th>
        <Upload {...props}
        data = {{'token': this.state.token, 'tp_form':'comprovante.recebimento.beneficio'}}
        >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
            </th>
        </tr>
        <tr>
        <th>
        Declaração de Benefícios do INSS
            </th>
        <th>
        <Upload {...props}
        data = {{'token': this.state.token, 'tp_form':'declaracao.inss'}}
        >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
            </th>
        </tr>
        <tr>
        <th>
        Segurado ativo à data do óbito: ficha funcional (autenticada pelo órgão expedidor)
            </th>
        <th>
        <Upload {...props}
        data = {{'token': this.state.token, 'tp_form':'ficha.funcional'}}
        >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
            </th>
        </tr>
        <tr>
        <th>
        Segurado inativo à data do óbito: ato de aposentadoria (autenticado pelo órgão expedidor)
            </th>
        <th>
        <Upload {...props}
        data = {{'token': this.state.token, 'tp_form':'segurado.inativo.dt.obto'}}
        >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
            </th>
        </tr>
        <tr>
        <th>
        Três últimos contracheques (quando tratar-se de ex-servidor de órgão externo: <br/>
        (Tribunal de Justiça, Tribunal de Contas, etc...)
            </th>
        <th>
        <Upload {...props}
        data = {{'token': this.state.token, 'tp_form':'contracheques'}}
        >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
            </th>
        </tr>
        <tr>
        <th>
        Procuração Pública (dependente representado por procurador) ou Termo de Curatela  <br/>
        (dependente representado por curador) ou Termo de Tutela (dependente representado por Tutor)
            </th>
        <th>
        <Upload {...props}
        data = {{'token': this.state.token, 'tp_form':'procuracao'}}
        >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
            </th>
        </tr>
        <tr>
        <th>
        Documento de identificação e CPF do procurador/curador/tutor
            </th>
        <th>
        <Upload {...props}
        data = {{'token': this.state.token, 'tp_form':'identificacao.cpf'}}
        >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
            </th>
        </tr>
    </table>


    </div>

    <div  style={{
  'margin-left': '850px'
}}>
    <Button type="primary" danger size={'large'} align='center'>
          Voltar
        </Button>
        <>  </>
    <Button type="primary" size={'large'} align='center' onClick={this.enviar}>
          Enviar
        </Button>
<br/>
<> </>
<> </>
<br/>
</div>
        </div>
        )
    }
}

export default Formulario;