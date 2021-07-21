import React, { Component, Image } from 'react';
import { Select, Input, DatePicker, Tooltip, Upload, Button, Checkbox, message } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { isCPF, formatToCPF } from 'brazilian-values'
import { InfoCircleOutlined, UserOutlined, UploadOutlined } from '@ant-design/icons';
import './form_main.css'
import jsPDF from 'jspdf';
import {Route, Switch, Redirect, BrowserRouter, Link } from 'react-router-dom';




const { Option } = Select;

const { RangePicker } = DatePicker;

const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';

const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];


// const props = {
    
//     action: 'http://127.0.0.1:5000/file-upload',
//     listType: 'picture',
//     beforeUpload(file) {
        
//       return new Promise(resolve => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onload = () => {
//           const img = document.createElement('img');
//           img.src = reader.result;
//           img.onload = () => {
//             const canvas = document.createElement('canvas');
//             canvas.width = img.naturalWidth;
//             canvas.height = img.naturalHeight;
//             const ctx = canvas.getContext('2d');
//             ctx.drawImage(img, 0, 0);
//             ctx.fillStyle = 'red';
//             ctx.textBaseline = 'middle';
//             ctx.font = '33px Arial';
//             ctx.fillText('Ant Design', 20, 20);
//             canvas.toBlob(resolve);
//           };
//         };
//       });
//     },
//   };

const props = {
    name: 'file',
    multiple: true,
    action: 'http://127.0.0.1:5000/file-upload',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
        
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  


class EXCompanheiro extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            token:"",

            tp_form: 'Companheiro',
            matricula:'',

            status: 'Ag. Atendimento',
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
            ex_servidor_ja_casado:'',

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
            req_ja_casado:'',
            filhos_uniao:'',
            uniao_estavel:'',
            situacao_req:'',
            tp_doc_separacao_divorcio:'',

            // Procurador
            nome_procurador: '',
            cpf_procurador: '',
            rg_procurador: '',
            org_emissor_procurador: '',
            uf_procurador: '',
            telefone_procurador: '',
            email_procurador: '',

            combo_vazio: '!',

            
          
        }
        this.handleChange = this.handleChange.bind(this)
        this.handlechangeCPF = this.handlechangeCPF.bind(this)
        this.handlechangeCPF_req = this.handlechangeCPF_req.bind(this)
        this.handlechangeCPF_procurador = this.handlechangeCPF_procurador.bind(this)
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

                if(this.state.poder !== '' && this.state.procurador_rep !== ''){
                    // lista de anexos obrigatórios - Companheiro
                    let anexos_obrigatorios = [
                        'req.form.iprev',
                        'certidao.obito',
                        'carteira.identidade.req',
                        'carteira.identidade.ins',
                        'cpf.requerente',
                        'cpf.ins',
                        
                        
                        
                        'comprovante.residencia.requerente',
                        'declaracao.acumulacao.beneficios',
                        'comprovante.conta.corrente',
                        
                    ]
                    // Cria lista de anexos obrigatórios
                    if(this.state.poder ===  "Assembléia Legislativa"|| this.state.poder === "Militar" || this.state.poder === "TCE/SC" || this.state.poder === "TJ-SC"){
                        
                        anexos_obrigatorios.push("tres.ultimos.contracheques")
                        anexos_obrigatorios.push('info.exinstituidor')
                        
                    
                    }if(this.state.poder === "Poder Executivo" ||  this.state.poder === "Ministério Público"){
                        anexos_obrigatorios.push("ultimo.contracheque")
                    
                    }if(this.state.servidor_ativo === 'sim'){
                        anexos_obrigatorios.push("seg.ativo.dataobto")
                    
                    }if(this.state.servidor_ativo === 'não'){
                        anexos_obrigatorios.push("seg.inativo.dataobto")
                    
                    }if(this.state.adq_convenio_sc_saude === 'sim'){
                        anexos_obrigatorios.push("form.adesao.scsaude")
                    
                    }if(this.state.req_recebe_pens_aposen === 'sim'){
                        anexos_obrigatorios.push("comprovante.recebi.beneficio")
                    
                    }if(this.state.req_ja_casado === 'sim'){
                        anexos_obrigatorios.push("certidao.casamento.requerente")
                    
                    }if(this.state.ex_servidor_ja_casado === 'sim'){
                        anexos_obrigatorios.push("certidao.casamento")
                    
                    }if(this.state.filhos_uniao === 'sim'){
                        anexos_obrigatorios.push("certidao.nascimento.filhos")
                    
                    }if(this.state.uniao_estavel === 'sim'){
                        anexos_obrigatorios.push("uniao_estavel")
                    
                    }if(this.state.procurador_rep === 'sim'){
                        anexos_obrigatorios.push("doc.identificacao.cpf.procurador")
                        anexos_obrigatorios.push("procuracao.publica.dependente")
                    
                    }
                    // Validação dos campos instituidor
                    
                    
                                if(this.state.nome_seg === '' ||
                                this.state.servidor_ativo === '' ||
                                this.state.dt_nascimento === '' ||
                                this.state.dt_obto === '' ||
                                this.state.dt_emiss_cert_obto === '' ||
                                this.state.cpf === '' ||
                                this.state.matricula === '' ||
                                this.state.rg === '' ||
                                this.state.org_emissor === '' ||
                                this.state.uf === '' ||
                                this.state.endereco === '' ||
                                this.state.cep === '' ||
                                this.state.org_origem === '' ||
                                this.state.sexo === '' ||
                                this.state.cargo === '' ){
                    
                                alert('Os campos relacionados aos dados do Instituidor estão incompletos, complete o preenchimento para realizar o envio' )
                                return;
                    
                             
                    
                                }if(this.state.poder ===  "Assembléia Legislativa"|| this.state.poder === "Militar" || this.state.poder === "TCE/SC" || this.state.poder === "TJ-SC"){
                                if(this.state.patente === '' ||
                                this.state.nivel === '' ||
                                this.state.org_origem === '' ||
                                this.state.ult_salario_contrib === ''
                                ){
                                alert('Os campos relacionados aos dados do Instituidor (OUTROS PODERES) estão incompletos, complete o preenchimento para realizar o envio' )
                                return;
                    
                                
                    
                                }}
                                // Valida preenchimento dados requerente
                                if(this.state.nome_completo_req === ''||
                                this.state.dt_nascimento_req === ''||
                                this.state.telefone_req === ''||
                                this.state.email_req === ''||
                                this.state.cpf_req === ''||
                                this.state.rg_req === ''||
                                this.state.org_emissor_req === ''||
                                this.state.uf_req === ''||
                                this.state.endereco_req === ''||
                                this.state.cep_req === ''||
                                this.state.profissao_req === ''||
                                this.state.conta_banq_req === ''||
                                this.state.adq_convenio_sc_saude === ''||
                                this.state.nome_mae_req === ''||
                                this.state.req_recebe_pens_aposen === ''||
                                this.state.situacao_req ==='' ||
                                this.state.tp_doc_separacao_divorcio === ''
                                
                                ){
                                alert('Os campos relacionados aos dados do Requerente estão incompletos, complete o preenchimento para realizar o envio' )
                                return; 
                    
                                }
                                //Valida campos procurador
                                if(this.state.procurador_rep==='sim'){if(
                                    this.state.nome_procurador === ''||
                                    this.state.cpf_procurador === ''||
                                    this.state.rg_procurador === ''||
                                    this.state.org_emissor_procurador === ''||
                                    this.state.uf_procurador ===''||
                                    this.state.telefone_procurador === ''||
                                    this.state.email_procurador=== ''
                                ){
                                    alert('Os campos relacionados aos dados do Procurador estão incompletos, complete o preenchimento para realizar o envio' )
                                return;
                                }}


                    
                                if(anexos_obrigatorios.every(r=> json.tp_arquivos.includes(r))){
                                    if(anexos_obrigatorios.every(r=> json.tp_arquivos.includes(r))){
                                console.log("Formulário pode ser enviado")
                            
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

                        
//var imgData =  "data:image/jpg;base64, " +  Base64.encode('');

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;

var d = new Date();
var n = d.toLocaleTimeString();


var doc = new jsPDF();
doc.setFontSize(40);
doc.addImage('http://www.sea.sc.gov.br/wp-content/uploads/2019/07/logo-iprev-cliente-acervo.jpg','JPEG', 9,5,20,20);
doc.text(65,25,"Comprovante");
doc.setLineWidth(0.5);
doc.line(0, 30, 220, 30);
doc.line(0, 30, 220, 30);

doc.setFontSize(15);

doc.setFont(undefined, 'bold');
doc.text(20,50,"Nome Requerente:");
//doc.setFontStyle("normal");
doc.text(70,50,this.state.nome_completo_req);

doc.setFont(undefined, 'bold')
doc.text(20,58,"CPF Requerente:");
//doc.setFontStyle("normal");
doc.text(65,58,this.state.cpf_req);

doc.setFont(undefined, 'bold')
doc.text(20,65,"Nome Instituidor:");
//doc.setFontStyle("normal");
doc.text(65,65,this.state.nome_seg);

doc.setFont(undefined, 'bold')
doc.text(20,73,"CPF Instituidor:");
//doc.setFontStyle("normal");
doc.text(65,73,this.state.cpf);

doc.setFont(undefined, 'bold')
doc.text(20,80,"Poder/Orgão:");
//doc.setFontStyle("normal");
doc.text(65,80,this.state.poder);

doc.setFont(undefined, 'bold')
doc.text(20,102,"Data:");
//doc.setFontStyle("normal");
doc.text(35,102, today);

doc.setFont(undefined, 'bold')
doc.text(20,110,"Hora:");
//doc.setFontStyle("normal");
doc.text(35,110,n);

doc.setFont(undefined, 'bold')
doc.text(20,118,"Código de Autenticação:");
//doc.setFontStyle("normal");
doc.text(83,118,this.state.token);
doc.save('comprovante.pdf');

//this.props.history.push('/CadSucesso')
this.props.history.push('/')

                        
                    })
                            
                            }
                                }else{
                                    let lista_ = anexos_obrigatorios.filter( a => !json.tp_arquivos.includes( a ) )
                                    
                                    console.log(lista_, {'l':lista_.join('\n')})
                                    alert('A seguinte lista de documentos deve ser anexada antes do envio: \n -' + lista_.join('\n -'))
                                    return;

                                }
                    
                    
                    
                    }else{
                    alert('Selecione o Poder/Orgão e se possui procurador ou representante')
                    return;
                    
                    }



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
handlechangeCPF_req(e) {
        //console.log(e.target.value)
        //this.setState({ documentId: cpfMask(e.target.value) })
        this.setState({ cpf_req: formatToCPF(e.target.value) })

    }
handlechangeCPF_procurador(e) {
        //console.log(e.target.value)
        //this.setState({ documentId: cpfMask(e.target.value) })
        this.setState({ cpf_procurador: formatToCPF(e.target.value) })

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
{/*                         
                        <th>Dt. Ini.:<Tooltip title="Data de Inicio no serviço público">
                                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                  </Tooltip><br/>
                        <DatePicker style={{ width: 175 }}  format={dateFormatList}
                                    onChange={(e) => {if(e!==null) {this.setState({ 'dt_ini_serv_publi': this.convertData(e._d) })}}} />
                        </th> */}
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



{
    (this.state.poder ===  "Assembléia Legislativa"|| this.state.poder === "Militar" || this.state.poder === "TCE/SC" || this.state.poder === "TJ-SC") &&
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
                                    onChange={(e) => {if(e!==null) {this.setState({ 'dt_ini_serv_publi': this.convertData(e._d) })}}} />
                        </th>


                </table>
</div>
</div>
    }
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
            value={this.state.cpf_req}
            onChange={this.handlechangeCPF_req} 
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
                    <tr>
             <th>
             Situação atual:<br/> 
                        <Select style={{ width: 200 }} onChange={e => {this.setState({situacao_req: e})}}>
      <Option value="casada">Casada</Option>
      <Option value="solteira">Solteira</Option>
      <Option value="viúva">Viúva</Option>
      </Select></th>
      <th>

      Documento de separação/divórcio: <br/>
                        <Select style={{ width: 200 }} onChange={e => {this.setState({tp_doc_separacao_divorcio: e})}}>
      <Option value="Decisão Judicial">Decisão Judicial</Option>
      <Option value="Escritura">Escritura</Option>
      </Select>
      </th>

</tr>
                
        </table>
             
             </div>
{/*Informações do procurador*/}

{this.state.procurador_rep === 'sim' &&
<h1 align='center'>INFORMAÇÕES DO PROCURADOR/CURADOR/TUTOR</h1>}
{ this.state.procurador_rep === 'sim' &&
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
            value={this.state.cpf_procurador}
            onChange={this.handlechangeCPF_procurador} 
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
                    <Input placeholder="Telefone do Procurador" style={{ width: 200 }}
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
        <Upload 
        {...props}
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
        CPF do(a) Requerente
            </th>
        <th>
        <Upload {...props}
        data = {{'token': this.state.token, 'tp_form':'cpf.requerente'}}
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
    { this.state.ex_servidor_ja_casado == 'sim' &&
        <tr>
        <th>
        Certidão de Casamento atualizada pós óbito (frente e verso) do  Ex-Segurado
            </th>
        <th>
        <Upload {...props}
        data = {{'token': this.state.token, 'tp_form':'certidao.casamento'}}
        >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
            </th>
        </tr>
    }
    { this.state.req_ja_casado == 'sim' &&
        <tr>
        <th>
        Certidão de Casamento atualizada pós óbito (frente e verso) do  Requerente						
            </th>
        <th>
        <Upload {...props}
        data = {{'token': this.state.token, 'tp_form':'certidao.casamento.requerente'}}
        >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
            </th>
        </tr>
    }
    { this.state.combo_vazio == '' &&
   
        <tr>
        <th>
        Certidão de Nascimento atualizada pós óbito (frente e verso) do Ex-segurado						
            </th>
        <th>
        <Upload {...props}
        data = {{'token': this.state.token, 'tp_form':'certidao.nascimento.exsegurado'}}
        >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
            </th>
        </tr>
    }
    { this.state.combo_vazio == '' &&
           <tr>
        <th>
        Certidão de Nascimento atualizada pós óbito (frente e verso) do Requerente
            </th>
        <th>
        <Upload {...props}
        data = {{'token': this.state.token, 'tp_form':'certidao.nascimento.requerente'}}
        >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
            </th>
        </tr>
        }
        <tr>
        <th>
        Comprovante de residência em nome do(a) requerente: luz ou água ou telefone (últimos 6 meses)						
            </th>
        <th>
        <Upload {...props}
        data = {{'token': this.state.token, 'tp_form':'comprovante.residencia.requerente'}}
        >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
            </th>
        </tr>
    
    {  (this.state.poder ===  "Assembléia Legislativa"|| this.state.poder === "Militar" || this.state.poder === "TCE/SC" || this.state.poder === "TJ-SC") &&
        <tr>
        <th>
        Informação do(a) instituidor(a) da pensão (quando tratar-se de ex-servidor de órgão externo: <br/>
        Tribunal de Justiça, Tribunal de Contas, etc...), conforme formulário do IPREV
            </th>
        <th>
        <Upload {...props}
        data = {{'token': this.state.token, 'tp_form':'info.exinstituidor'}}
        >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
            </th>
        </tr>}

{ this.state.tp_doc_separacao_divorcio == 'Decisão Judicial' &&
  <tr>
  <th>
  Carta de Sentença com disposição sobre recebimento de pensão alimentícia e ofício ao orgão de origem<br/>
  do instituidor em que conste o nome dos recebedores ou ofício do juiz determinando o desconto:
      </th>
  <th>
  <Upload {...props}
  data = {{'token': this.state.token, 'tp_form':'carta.sentenca.recebimento.pensao'}}
  >
<Button icon={<UploadOutlined />}>Upload</Button>
</Upload>
      </th>
  </tr>

    
}
{ this.state.tp_doc_separacao_divorcio == 'Escritura' &&
  <tr>
  <th>
  Escritura Pública de Dissolução de Sociedade de Fato em que conste a fixação da pensão alimentícia:					
      </th>
  <th>
  <Upload {...props}
  data = {{'token': this.state.token, 'tp_form':'escritura.publica.dissolucao'}}
  >
<Button icon={<UploadOutlined />}>Upload</Button>
</Upload>
      </th>
  </tr>

    
}

{ this.state.combo_vazio == '' &&
  <tr>
  <th>
  Contracheque onde conste o desconto da pensão alimentícia ou comprovantes <br/>de recebimento da pensão alimentícia fixada (se houver):										
      </th>
  <th>
  <Upload {...props}
  data = {{'token': this.state.token, 'tp_form':'contracheque.desconto.pensao'}}
  >
<Button icon={<UploadOutlined />}>Upload</Button>
</Upload>
      </th>
  </tr>

    
}






        { this.state.adq_convenio_sc_saude=='sim' &&  
        <tr>
        <th>
       
        Formulário Adesão SC Saúde (segurado(a) associado(a)						
            </th>
        <th>
        <Upload {...props}
        data = {{'token': this.state.token, 'tp_form':'form.adesao.scsaude'}}
        >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
            </th>
        </tr>
        }
            
        <tr>
        <th>
        Comprovação de Dependência SC Saúde
            </th>
        <th>
        <Upload {...props}
        data = {{'token': this.state.token, 'tp_form':'comprovacao.dependencia.scsaude'}}
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
        data = {{'token': this.state.token, 'tp_form':'comprovante.conta.corrente'}}
        >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
            </th>
        </tr>
    
        { this.state.req_recebe_pens_aposen == 'sim' &&
<tr>
        <th>
        Comprovante de Recebimento de Benefício Previdenciário (não sendo aceito extrato bancário)						
            </th>
        <th>
        <Upload {...props}
        data = {{'token': this.state.token, 'tp_form':'comprovante.recebi.beneficio'}}
        >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
            </th>
        </tr>
        }
{this.state.combo_vazio == '' &&
        <tr>
        
        <th>
        
        Declaração de Benefícios do INSS
            </th>
        <th>
        <Upload {...props}
        data = {{'token': this.state.token, 'tp_form':'declaracao.beneficios.inss'}}
        >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
            </th>
        </tr>
    }
        { this.state.servidor_ativo == 'sim' &&
        <tr>
        <th>
        Segurado ativo à data do óbito: ficha funcional (autenticada pelo órgão expedidor)
            </th>
        <th>
        <Upload {...props}
        data = {{'token': this.state.token, 'tp_form':'seg.ativo.dataobto'}}
        >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
            </th>
        </tr>
        }
        { this.state.servidor_ativo == 'não' &&

        <tr>
        <th>
        Segurado inativo à data do óbito: ato de aposentadoria (autenticado pelo órgão expedidor)
            </th>
        <th>
        <Upload {...props}
        data = {{'token': this.state.token, 'tp_form':'seg.inativo.dataobto'}}
        >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
            </th>
        </tr>
        }
        { (this.state.poder === "Poder Executivo" ||  this.state.poder === "Ministério Público") &&
        <tr>
        <th>
        (01) Último contracheque, caso ex-segurado do Poder Executivo ou Ministério Público
            </th>
        <th>
        <Upload {...props}
        data = {{'token': this.state.token, 'tp_form':'ultimo.contracheque'}}
        >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
            </th>
        </tr>
        }

{ (this.state.poder ===  "Assembléia Legislativa"|| this.state.poder === "Militar" || this.state.poder === "TCE/SC" || this.state.poder === "TJ-SC") &&
        <tr>
        <th>
        (03)Três últimos contracheques (quando tratar-se de ex-servidor de órgão externo: <br/>
        (Tribunal de Justiça, Tribunal de Contas, ALESC)
            </th>
        <th>
        <Upload {...props}
        data = {{'token': this.state.token, 'tp_form':'tres.ultimos.contracheques'}}
        >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
            </th>
        </tr>
}

{ this.state.procurador_rep === 'sim' == '' &&
        <tr>
        <th>
        Procuração Pública (dependente representado por procurador) ou Termo de Curatela <br/>
        (dependente representado por curador) ou Termo de Tutela (dependente representado por Tutor)
            </th>
        <th>
        <Upload {...props}
        data = {{'token': this.state.token, 'tp_form':'procuracao.publica.dependente'}}
        >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
            </th>
        </tr>
}

{ this.state.procurador_rep === 'sim' &&
        <tr>
        <th>
        Documento de identificação e CPF do procurador/curador/tutor
            </th>
        <th>
        <Upload {...props}
        data = {{'token': this.state.token, 'tp_form':'doc.identificacao.cpf.procurador'}}
        >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
            </th>
        </tr>
        }

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

export default EXCompanheiro;