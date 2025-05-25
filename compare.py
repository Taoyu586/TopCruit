import os
import json
import requests
import traceback
from flask import Flask, Blueprint, request, session, render_template, flash, redirect, url_for
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)



@app.route('/compare_candidates', methods=['GET'])
# def compare_candidates():


