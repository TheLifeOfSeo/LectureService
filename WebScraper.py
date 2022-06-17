from selenium import webdriver
from selenium.webdriver import ActionChains
from selenium.webdriver.common.keys import Keys
from urllib.request import urlopen
from bs4 import BeautifulSoup
import requests
import time
import csv
#import pandas as pd

chromedriver ='C:/Users/82102/Desktop/기초 프로젝트/chromedriver_win32/chromedriver.exe'
driver = webdriver.Chrome(chromedriver)
 
driver.get('https://everytime.kr/login')
driver.find_element_by_name("userid").send_keys("아이디")
driver.find_element_by_name("password").send_keys("비밀번호")
driver.find_element_by_tag_name("input").send_keys(Keys.RETURN)
# 아이디, 패스워드 입력창과 아이디 패스워드 입력하고 로그인 클릭
 
 
 
time.sleep(2)
driver.find_element_by_xpath('//*[@id="menu"]/li[2]/a').click()
time.sleep(2)
driver.find_element_by_css_selector('#container > ul > li.button.search').click()
time.sleep(2)
element = driver.find_elements_by_css_selector("#subjects > div.list > table > tbody > tr")

pre_count= 0

while True:
    element = driver.find_elements_by_css_selector("#subjects > div.list > table > tbody > tr")

    lecture = element[-1]
    driver.execute_script('arguments[0].scrollIntoView(true);',lecture)
    time.sleep(2)

    current_count = len(element)
    if pre_count == current_count:
        break
    pre_count = current_count



#driver.find_element_by_css_selector('#container > ul > li.button.search').click()
 #강의평가로 가는 경로
#driver.find_element_by_css_selector('#container > div:nth-child(4)').click()
# 최근 강의평 경로
res = driver.page_source
soup = BeautifulSoup(res, 'html.parser')
lectures=soup.select("body")
trs = soup.select('#subjects > div.list > table > tbody > tr')

lectures = []
#rate = lecture.select('subjects > div.list > table > tbody > tr > td > a > title')
for tr in trs:
    lecture=[]
    title = tr.find('a', attrs={'class':'star'})
    href = tr.find('a', attrs={'target':'_blank'})
    tds = tr.select('#subjects > div.list > table > tbody > tr > td')
    lecture.append(tds[0].text) 
    lecture.append(tds[1].text)
    lecture.append(tds[2].text) 
    lecture.append(tds[3].text) 
    lecture.append(tds[4].text) 
    lecture.append(tds[5].text) 
    lecture.append(tds[6].text) 
    lecture.append(tds[7].text) 
    lecture.append(tds[8].text)
    lecture.append(tds[9].text) 
    lecture.append(tds[10].text) 
    lecture.append(title['title']) 
    lecture.append(href['href'])
    lectures.append(lecture)
if lectures:
    print("ok")

with open("전체 강의.csv", 'w', encoding='utf-8-sig', newline='') as f:
    writer = csv.writer(f)
    writer.writerow(['강의구분','수강학 년','과목코드','과목명','교수명','수업시간','학점','','','수강인원','수강정원','강의평점'])
    writer.writerows(lectures)
f.close
driver.quit()
