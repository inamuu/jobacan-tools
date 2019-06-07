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
MAILADDR = os.environ.get('JOBCANEMAIL')
LOGINPASS = os.environ.get('JOBCANPASSWORD')

@click.group()
def subcommand():
    pass

def jobcanlogin():
    driver = webdriver.Chrome(executable_path='/Applications/chromedriver')
    driver.get('https://id.jobcan.jp/users/sign_in?app_key=atd&redirect_to=https://ssl.jobcan.jp/jbcoauth/callback')

    if 'MAILADDR' is None or 'LOGINPASS' is None:
      print('認証情報をセットしてください。')
      return

    id = driver.find_element_by_id("user_email")
    id.send_keys(MAILADDR)
    password = driver.find_element_by_id("user_password")
    password.send_keys(LOGINPASS)
    element = driver.find_element_by_name("commit")
    element.click()
    return driver

@subcommand.command(help='打刻')
def touch():
    try:
        driver = jobcanlogin()
        status = driver.find_element_by_id('working_status').text
        if status == '未出勤':
            push = driver.find_element_by_name("adit_item")
            push.click()
            print('打刻しました')
        elif status == '退室中':
            print('既に退室済みです')
        else:
            print('既に打刻済みです')
    except:
        print('打刻に失敗しました')
    driver.quit()
    return

@subcommand.command(help='打刻エラーチェック')
def checkerr():
    print('打刻エラーをチェックします')
    try:
        driver = jobcanlogin()
        time.sleep(5)
        tableid = driver.find_element_by_id('top_info_area').text
        print(tableid)
    except:
        print('エラーチェックに失敗しました')
    driver.quit()
    return

def main():
    subcommand()

if __name__ == "__main__": main()
