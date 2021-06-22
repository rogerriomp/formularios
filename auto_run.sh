#!/bin/bash
screen -S "PYTHON-SERVER-BACKEND" -d -m python ./backend/teste-flask-api.py

screen -S "REACT-SERVER" -d -m npm start