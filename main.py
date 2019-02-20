import time
from selenium import webdriver

driver = webdriver.Chrome(executable_path='/Applications/chromedriver')

def main():
    driver.get('https://www.google.com/')
    time.sleep(3)
    search_box = driver.find_element_by_name("q")
    search_box.send_keys('ChromeDriver')
    search_box.submit()
    time.sleep(3)
    driver.quit()

if __name__ == "__main__": main()
