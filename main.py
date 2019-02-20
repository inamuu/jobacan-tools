import os
import time
from selenium import webdriver

driver = webdriver.Chrome(executable_path='/Applications/chromedriver')

def main():
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
    time.sleep(1)
    driver.quit()

if __name__ == "__main__": main()
