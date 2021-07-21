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
    { this.state.combo_vazio == '' &&
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
    { this.state.combo_vazio == '' &&
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
    
    { this.state.combo_vazio == '' &&
        <tr>
        <th>
        Certidão de Nascimento e CPF dos filhos havidos da união						
            </th>
        <th>
        <Upload {...props}
        data = {{'token': this.state.token, 'tp_form':'certidao.nascimento.filhos'}}
        >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
            </th>
        </tr>
    }
 
        <tr>
        <th>
        Declaração de Convívio Marital Post Mortem						
            </th>
        <th>
        <Upload {...props}
        data = {{'token': this.state.token, 'tp_form':'declaracao.convivio.posmortem'}}
        >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
            </th>
        </tr>
    
        { this.state.combo_vazio == '' &&
        <tr>
        <th>
        Certidão Declaratória de União Estável/Contrato de União Estável						
            </th>
        <th>
        <Upload {...props}
        data = {{'token': this.state.token, 'tp_form':'certidao.uniao.estavel'}}
        >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
            </th>
        </tr>
        }
    
    
        <tr>
        <th>
        Documentos que comprovem convívio marital (fotos, conta bancária conjunta, <br/>
        correspondência com mesmo endereço, Obs. Devem ser apresentados o maior número possivel de documentos <br/>
        que comprovem a vida em comum, tanto com datas atuais como com datas no inicio da relação, isso será de grande relevância <br/>
        para a análise.)						
            </th>
        <th>
        <Upload {...props}
        data = {{'token': this.state.token, 'tp_form':'comprovante.convivio'}}
        >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
            </th>
        </tr>
        <tr>
        <th>
        Comprovante de residência em nome do(a) Ex-Segurado(a): luz ou água ou telefone (últimos 6 meses)						
            </th>
        <th>
        <Upload {...props}
        data = {{'token': this.state.token, 'tp_form':'comprovante.residencia.exsegurado'}}
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
        data = {{'token': this.state.token, 'tp_form':'comprovante.residencia.requerente'}}
        >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
            </th>
        </tr>
    
    { this.state.combo_vazio == '' &&
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
    
        { this.state.combo_vazio == '' &&
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
        { this.state.combo_vazio == '' &&
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
        { this.state.combo_vazio == '' &&

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
        { this.state.combo_vazio == '' &&
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

{ this.state.combo_vazio == '' &&
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

{ this.state.combo_vazio == '' &&
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

{ this.state.combo_vazio == '' &&
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