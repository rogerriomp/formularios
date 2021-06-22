#!/usr/bin/env python
# coding: utf-8

# In[215]:


import os
from flask_cors import CORS, cross_origin
from flask_restful import Resource, reqparse
from flask import Flask, request, redirect, jsonify
import json
from flask import Flask
from flask_cors import CORS
from app import app
from werkzeug.utils import secure_filename
import sqlite3
import pandas as pd
import ast


conn = sqlite3.connect('form_controler.db')
cur = conn.cursor()


# In[216]:


dados = reqparse.RequestParser()
dados.add_argument('usuario', type=str)
dados.add_argument('cpf', action='append')
dados.add_argument('estado', action='append')
dados.add_argument('cadastra_atendimento', action='append')
dados.add_argument('cadastro_pessoa', action='append')
dados.add_argument('dt_inicio', action='append')
dados.add_argument('dt_fim', action='append')
dados.add_argument('n_atendimento', action='append')
dados.add_argument('edita_atendimento', action='append')
dados.add_argument('token', action='append')
dados.add_argument('senha', action='append')
dados.add_argument('BuscaPessoa', action='append')
dados.add_argument('agendamento', action='append')
dados.add_argument('dados', action='append')
dados.add_argument('formulario', action='append')



app.config['SECRET_KEY'] = "secret key"
app.config['CORS_HEADERS'] = 'Content-Type'



app = Flask(__name__)
cors = CORS(app, resources={r"/file-upload": {"origins": "*"}})
# cors = CORS(app, resources={r"/*": {"origins": "*"}})

# cors = CORS(app, resources={r"/file-upload": {"origins": "http://localhost:2000"}})

ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'csv', 'bib', 'word', 'xlsx', 'xls', 'doc', 'docx'])


# In[217]:


def controler_files(dados):
    print(dados, '----dados-----')

    #try:
    with sqlite3.connect("form_controler.db") as con:
        cur = con.cursor()
        cur.execute("INSERT INTO anexos (token,arquivo,nm_file) VALUES(?, ?, ?)", (dados['token'], dados['arquivo'], dados['nm_file']))
        con.commit()
    r = {'status': 'doc registrado no sistema'}, 200
    #except:
    #    r = {'status': 'Erro ao inserir o tp_doc no banco de controle'}, 400
    return r


# In[218]:


@app.route('/cad_form', methods=['GET', 'POST'])
def cad_():
    post = dados.parse_args()
    d = post['dados']
    print(d, type(d[0]),'dados_total do form----------------------')
    dic = ast.literal_eval(d[0])
    df = pd.DataFrame(dic, index=[0])
    
    
    with sqlite3.connect("form_controler.db") as conec:
        df.to_sql(name='FORM_DATA', con=conec, if_exists='append', index=False)
        conec.commit()
        
    
    print(df)
    
    r = {'resultado': 'Cadastro Realizado com sucesso'}, 200
    
    return r


# In[219]:


@app.route('/lista_file/<string:token>', methods=['GET', 'POST'])
def retorna_lista_files(token):
    t = token
    print(t,'---------TOKEN')
    post = dados.parse_args()
    d = post['dados']
    print(d, 'estes são os dados recebidos')
    with sqlite3.connect("form_controler.db") as con:
        cur = con.cursor()
        cur.execute("select * from anexos where token='"+t+"'")
        records = cur.fetchall()
        
    r = {'lista_arquivos': [{'token':token, 'arquivo':tp_arq, 'nm_file': nm_file} for token,tp_arq, nm_file in records], 'tp_arquivos': list(set([tp_arq for token,tp_arq, nm_file in records]))}, 200
    return r


# In[220]:


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def create_folder(name):
    path = './ARQUIVOS/'+name+'/' #'/home/aquino/Documentos/Projetos/CANDIDATOS/ARQUIVOS/'+name+'/'
    try:
        os.mkdir(path)
    except OSError:
        print("Creation of the directory %s failed" % path)
    else:
        print("Successfully created the directory %s " % path)
    return path


# In[221]:


@app.route('/file-upload', methods=['POST', 'OPTIONS'])
@cross_origin(origin="http://localhost:3000",headers=['Content- Type','Authorization'])
# @cross_origin(origin="http://localhost:2000",headers=['Content- Type','Authorization'])
def upload_file():
    
    
    print(dados)
    # check if the post request has the file part
    print(request)
    token = request.form.get('token')
    tp_form = request.form.get('tp_form')
    list_files = [i.filename for i in request.files.getlist("file")]
    print(type(token), '---------token')
    
    
    
    print(controler_files({'token':token,'arquivo':tp_form, 'nm_file': str(list_files[0])}))
    #print(tp_form, '----tp_form')
    usuario = token#request.form.get('id_sessao')
    # print(usuario,'-------REQ')

    if 'file' not in request.files:
        resp = jsonify({'message' : 'No file part in the request'})
        resp.status_code = 400
        return resp

    list_files = request.files.getlist("file")
    #print(list_files)

    for file in list_files:
        print(file)
        if file.filename == '':
            resp = jsonify({'message' : 'No file selected for uploading'})
            resp.status_code = 400


        if file and allowed_file(file.filename):
            caminho = create_folder(usuario)
            filename = secure_filename(file.filename)
            file.save(os.path.join(caminho, filename))
            resp = jsonify({'message' : 'File successfully uploaded'})
            resp.status_code = 201

        else:
            resp = jsonify({'message' : 'Allowed file types are txt, pdf, png, jpg, jpeg, gif'})
            resp.status_code = 400
    return  resp


# In[ ]:



if __name__ == "__main__":
    #app.run(host="0.0.0.0", debug=True)
    # app.run(host="192.168.0.103", debug=True)
    app.run(debug=False)


# In[ ]:




