#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
from os.path import join, dirname
from dotenv import load_dotenv

import time
import sys
from selenium import webdriver

import click

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

@click.group()
def subcommand():
    pass

@subcommand.command(help='打刻')
def touch():
    if 'JOBCANEMAIL' not in os.environ:
      print('環境変数（JOBCANEMAIL）をセットしてください。')
      sys.exit()
    elif 'JOBCANPASSWORD' not in os.environ:
      print('環境変数（JOBCANPASSWORD）をセットしてください。')
      sys.exit()

    driver = webdriver.Chrome(executable_path='/Applications/chromedriver')
    driver.get('https://id.jobcan.jp/users/sign_in?app_key=atd&redirect_to=https://ssl.jobcan.jp/jbcoauth/callback')
    time.sleep(1)

    id = driver.find_element_by_id("user_email")
    id.send_keys(os.environ['JOBCANEMAIL'])
    password = driver.find_element_by_id("user_password")
    password.send_keys(os.environ['JOBCANPASSWORD'])
    element = driver.find_element_by_name("commit")
    element.click()

    push = driver.find_element_by_name("adit_item")
    push.click()
    time.sleep(2)
    driver.quit()

@subcommand.command(help='test')
def test():
    print('test')

def main():
    subcommand()

if __name__ == "__main__": main()
