#1. 셀레니움 이용하여 에브리타임 강의평 각 부분 항목 구분하며 크롤링
#2. SQL 기반 DB에 저장 (JSON 사용가능하면 JSON 사용하기)
#3. 파이선에서 필요한 데이터 불러와 출력
#4. 웹 기반으로 사용자에게 보여주기 (그래프, 도표 등)

from selenium import webdriver
#드라이버 초기화
driver = webdriver.Chrome("/usr/local/bin/chromedriver")
#URL 얻기
driver.get("http://blog.naver.com/lynn1128")