# 노마드코더 클론코딩 팀 프로젝트

## 팀원
- 동태완
- 이재철
- 이병길
- 박재빈

## Git
- 웹 : <https://github.com/LEEJAECHEOL/nomad_clone_web>
- 앱 : <https://github.com/qwq140/nomad-clone-app>
- 서버 : <https://github.com/LEEJAECHEOL/nomadCloneProject-bachend>

## PPT
<https://drive.google.com/file/d/1ofteccsHds765LtgQAxYyiI3h58RF-Bt/view?usp=sharing>

## 영상
<https://youtu.be/oUQMyUYTCfg>

## Backend

### 의존성
- Spring Boot DevTools
- Lombok
- Spring Data JPA
- MySQL Driver
- Spring Security
- Spring Web

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>

<dependency>
	<groupId>com.auth0</groupId>
	<artifactId>java-jwt</artifactId>
	<version>3.10.3</version>
</dependency>

<dependency>
   <groupId>org.qlrm</groupId>
   <artifactId>qlrm</artifactId>
   <version>2.1.1</version>
</dependency>
```

### DB 생성

```sql
create user 'nomad'@'%' identified by '1234';
GRANT ALL PRIVILEGES ON *.* TO 'nomad'@'%';
create database nomad;
use nomad;
```

### yml 설정

```yml
server:
  port: 8080
  servlet:
    context-path: /
    encoding:
      charset: UTF-8
      enabled: true
      force: true
                                                                                                                     
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/nomad?serverTimezone=Asia/Seoul
    username: nomad
    password: 1234

  jpa:
    hibernate:
      ddl-auto: update  #create update none
      naming:
        physical-strategy: org.hibernate.boot.model.naming.PhysicalNamingStrategyStandardImpl
    show-sql: true
    properties:
      hibernate.format_sql: true

  jackson:
    serialization:
      fail-on-empty-beans: false
 
  servlet:
    multipart:
      max-file-size: 10MB
      max-request-size: 10MB
      enabled: true
           
file:
  path: C:/Users/Dong/Desktop/NomadWork/nomadCloneProject-bachend/src/main/resources/uploads/
```

### 모델
- Community
- Courses
- MyError
- Faq
- MyFile
- Likes
- Pay
- Tech
- User
- Video

### E-R 다이어그램
![image](https://user-images.githubusercontent.com/74044232/115498393-71a86980-a2a8-11eb-8652-46186c1189c3.png)

### 시큐리티
![image](https://user-images.githubusercontent.com/74044232/115498047-c4355600-a2a7-11eb-894a-0eb0bbc7ed58.png)

### 배치 프로그램
![image](https://user-images.githubusercontent.com/74044232/115498580-cd72f280-a2a8-11eb-8c96-ab36074acf8b.png)

![image](https://user-images.githubusercontent.com/74044232/115498606-d8c61e00-a2a8-11eb-9fc5-b7eb3d29fdd5.png)

![image](https://user-images.githubusercontent.com/74044232/115498658-ef6c7500-a2a8-11eb-8833-dda533f2ee3a.png)

## Web

### 메인페이지
![image](https://user-images.githubusercontent.com/74044232/115499128-d44e3500-a2a9-11eb-9cf0-845055ce4a9d.png)

- Course 리스트 최대 6개까지 나타냄
- Challenges 기능 구현 x

### Courses
![image](https://user-images.githubusercontent.com/74044232/115499267-1b3c2a80-a2aa-11eb-93d4-fb333321f12e.png)

- Courses 모든 리스트를 나타냄
- Level, Price, Tech에 따라 필터링 가능

```java
@Component
@RequiredArgsConstructor
public class CoursesQuery {
	
	private final EntityManager em;
	
	public List<CoursesFilterPreviewRespDto> findByFilter(String level, String isFree) {
		StringBuffer sb = new StringBuffer();
		sb.append("SELECT id, previewImage, title, subTitle, level, tech, price, videoId FROM courses ");
		if(level != "") {
			sb.append("WHERE level = '" + level + "' ");
		}else {
			if(isFree != "") {
				sb.append("WHERE ");
			}
		}
		if(isFree.equals("true")) {
			if(level != "") {
				sb.append("AND price = 0 ");
			}else {
				sb.append("price = 0 ");
			}
		}else if(isFree.equals("false")) {
			if(level != "") {
				sb.append("AND price != 0 ");
			}else {
				sb.append("price != 0 ");
			}
			
		}
		
	    Query query = em.createNativeQuery(sb.toString());
	    JpaResultMapper result  = new JpaResultMapper();
		return result.list(query, CoursesFilterPreviewRespDto.class);
	}

}
```

### CoursesDetail
![image](https://user-images.githubusercontent.com/74044232/115499538-90a7fb00-a2aa-11eb-905c-6152248ea1be.png)

- 해당 강의를 결제하기 전에 사용자에게 강의에 대한 정보를 제공
- 무료 강의인 경우 버튼 클릭 시 바로 등록
- 유료 강의인 경우 버튼 클릭 시 결제 페이지로 이동하여 결제를 진행

### Communty
![image](https://user-images.githubusercontent.com/74044232/115499803-0744f880-a2ab-11eb-91af-8827c46deaf4.png)

- 카테고리에 따라 분류가 가능하고 최신순, 인기순으로 나열이 가능
- 관리자계정의 경우 카테고리 등록 가능
- 좋아요 기능
- 글쓰기 기능

### CommunityDetail
![image](https://user-images.githubusercontent.com/74044232/115499990-6efb4380-a2ab-11eb-91a2-6f34d5e5997e.png)

- 게시글의 내용을 보는 페이지
- 댓글 작성, 삭제가 가능

### FAQ
![image](https://user-images.githubusercontent.com/74044232/115500067-96eaa700-a2ab-11eb-8582-5f6d9d06b18c.png)

![image](https://user-images.githubusercontent.com/74044232/115500098-a23dd280-a2ab-11eb-966f-6c8fe8ae65a4.png)

### 대시보드
![image](https://user-images.githubusercontent.com/74044232/115500164-c00b3780-a2ab-11eb-9950-2230e1aad73e.png)

### 프로필 수정
![image](https://user-images.githubusercontent.com/74044232/115500216-d44f3480-a2ab-11eb-8349-4084ebea8022.png)

### 커리큘럼 등록
![image](https://user-images.githubusercontent.com/74044232/115500274-f1840300-a2ab-11eb-8dc3-aa739e4e4d9c.png)

![image](https://user-images.githubusercontent.com/74044232/115500313-0791c380-a2ac-11eb-8a58-8e06e0ec669d.png)

### Tech 관리
![image](https://user-images.githubusercontent.com/74044232/115500364-209a7480-a2ac-11eb-82a5-ccfcc857ecb3.png)

### 코스 등록
![image](https://user-images.githubusercontent.com/74044232/115500410-327c1780-a2ac-11eb-873f-69b56ff72943.png)

### 결제 리스트(관리자)
![image](https://user-images.githubusercontent.com/74044232/115500471-4de72280-a2ac-11eb-9427-e876f36c315e.png)

### 비디오
![image](https://user-images.githubusercontent.com/74044232/115500513-5f302f00-a2ac-11eb-8341-1dddec223c00.png)

- Vimeo API 사용

### 챗봇
![image](https://user-images.githubusercontent.com/74044232/115500587-87b82900-a2ac-11eb-95ce-935ce7c59db2.png)

- 실시간 1:1 문의
- 채널톡 API 사용


## APP

### 메인, 로그인, 네비게이션
![image](https://user-images.githubusercontent.com/74044232/115500681-c352f300-a2ac-11eb-9867-b8bae56e95b1.png)

- 로그인은 구글 로그인만 가능

### Courses
![image](https://user-images.githubusercontent.com/74044232/115500740-df569480-a2ac-11eb-907d-d7c4e81275fb.png)

### CoursesDetail
![image](https://user-images.githubusercontent.com/74044232/115501550-60faf200-a2ae-11eb-87b6-216a08ac7325.png)

![image](https://user-images.githubusercontent.com/74044232/115501584-7112d180-a2ae-11eb-831d-e5c0c1396c75.png)

![image](https://user-images.githubusercontent.com/74044232/115501609-7bcd6680-a2ae-11eb-8c8e-7a0cfca1fd6a.png)

### Payment
![image](https://user-images.githubusercontent.com/74044232/115501643-8c7ddc80-a2ae-11eb-80b9-a68d787112b6.png)

### DashBoard
![image](https://user-images.githubusercontent.com/74044232/115500794-feedbd00-a2ac-11eb-8aa2-bec14ee57fb2.png)

### Community
![image](https://user-images.githubusercontent.com/74044232/115501370-111c2b00-a2ae-11eb-90de-116474041158.png)

### FAQ
![image](https://user-images.githubusercontent.com/74044232/115501445-30b35380-a2ae-11eb-80de-d2a4625f6b8e.png)

### Video
![image](https://user-images.githubusercontent.com/74044232/115501727-b20ae600-a2ae-11eb-8e65-6d0e291d4212.png)

### Edit Profile
![image](https://user-images.githubusercontent.com/74044232/115501763-bfc06b80-a2ae-11eb-93f4-ded1c50cee18.png)

### 챗봇
![image](https://user-images.githubusercontent.com/74044232/115501824-d8c91c80-a2ae-11eb-9447-f96b0f07045c.png)