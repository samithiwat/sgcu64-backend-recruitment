# โจทย์ข้อที่ 3: API

## วัตถุประสงค์

- วัดความรู้พื้นฐานในการออกแบบ API Endpoint
- วัดความรู้พื้นฐานในการเลือกใช้ HTTP Methods, Status Codes
- เพื่อประเมินความสามารถในการแก้ปัญหาของผู้สมัคร

## รายละเอียด

&emsp; บริษัท SGCU ใช้วิธีการเขียนข้อมูลของพนักงานไว้ในที่สมุดบันทึกมาโดยตลอด คุณและทีม Developer ของบริษัท SGCU ได้มองเห็นถึงปัญหาของวิธีการดังกล่าว จึงต้องการที่จะเปลี่ยนระบบจัดการข้อมูลพนักงานบริษัท ไปเป็นแบบ online เพื่อที่จะเปลี่ยนระบบนี้ให้ทันสมัยยิ่งขึ้น สามารถเก็บและแก้ไขข้อมูลได้ง่ายขึ้น คุณจึงยื่นเรื่องให้แก่ท่านประธาน

&emsp; จากการเสนอข้อมูลให้ประธานบริษัท เขาได้ถูกใจข้อเสนอดังกล่าวเป็นอย่างมาก จึงได้ร้องขอให้คุณและทีม Developer พัฒนาเว็บไซต์เว็บไซต์ดังกล่าวขึ้นเพื่อมาใช้งาน คุณซึ่งเป็นหนึ่งในทีมได้รับหน้าที่ในการ**วางแผนและออกแบบ** API เพื่อที่จะให้เว็บไซต์สามารถทำงานได้อย่างราบรื่น

1. Endpoint Path (เช่น /user ฯลฯ)
2. HTTP Method (เช่น GET POST PUT DELETE ฯลฯ)
3. Headers (ถ้ามีนอกเหนือจาก header ทั่วไป เช่น Authorization)
4. Request Body (ถ้ามี) อาจเป็นในรูปแบบ plain text หรือ JSON
5. Request Params (ถ้ามี)
6. Request Query (ถ้ามี)
7. Response Body (ถ้ามี) อาจเป็นในรูปแบบ plain text หรือ JSON
8. Response Status Codes เป็นต้น เช่น (200, 400, 401, 403, 404, 500)

## งานของคุณ

&emsp; ออกแบบ API Documentation ที่ใช้ในระบบนี้เพื่อให้สามารถทำตาม requirements ที่ระบุไว้ด้านล่างได้ โดยแต่ละ API Endpoint (URL) ขอให้อธิบายให้ละเอียดที่สุด เช่น

&emsp; **เป็นไปได้ที่ 1 endpoint จะมีได้หลาย response ขึ้นอยู่กับความเป็นไปได้ที่เกิดขึ้น ขอให้ระบุให้ครบถ้วนที่สุด ลองดูตัวอย่างด้านล่าง**

## ลักษณะการจัดเก็บข้อมูลพนักงาน

1. id: เลขประจำตัวพนักงาน (string)
2. password : รหัสผ่านซึ่งใช้ในการ login (string)
3. firstName: ชื่อจริงของพนักงาน (string)
4. lastName: นามสกุลของพนักกงาน (string)
5. salary: เงินเดือนของพนักงาน (number)
6. role: ตำแหน่งของพนักงาน (string) **(optional)**

## Features ที่ต้องมี

### Minimum Requirements

1. สามารถเพิ่มพนักงานใหม่เข้าไปในระบบได้ (Create)
2. สามารถดูข้อมูลของพนักงานทุกคนได้ (Read)
3. สามารถแก้ไขข้อมูลของพนักงานได้ เช่นชื่อ-สกุล ตำแหน่ง และเงินเดือนของพนักงานได้ (Update)
4. สามารถลบข้อมูลพนักงานในระบบได้ (Delete)
5. สามารถค้นหาพนักงานโดยใช้ ชื่อ นามสกุล หรือ ตำแหน่งได้

### Optional

1. สามารถเข้าสู่ระบบได้ (โดยใช้ เลขพนักงาน, รหัสผ่าน)
2. สามารถแบ่งแยก user ออกเป็น 2 role คือ Employee กับ HR ดังนี้

Employee

1. สามารถ login ด้วย username และ password ได้
2. สามารถแก้ไข password ของตนเองได้
3. สามารถดูข้อมูลของตนเองได้ (นั่นคือ API มีวิธีระบุตัวตนว่าใครเป็นคนยิง API)
4. **ไม่สามารถ** ทำสิ่งที่ระบุไว้ 5 ข้อด้านบนได้ (ให้เฉพาะ HR ใช้งานเท่านั้น)

HR

1. ทำสิ่งที่ employee ทำได้
2. **สามารถ** สิ่งที่ระบุไว้ 5 ข้อด้านบนได้ (ให้เฉพาะ HR ใช้งานเท่านั้น)

### Tips

1. โจทย์ข้อนี้ไม่ต้องการให้ทำ API นั้นขึ้นมาจริงๆ เพียงแต่ออกแบบ API Endpoints ขึ้นมาเท่านั้น (แต่หากต้องการเขียน code backend ขึ้นมาจริง ๆ ก็สามารถทำได้)
2. **การออกแบบ API Documentation ไม่มีถูกผิด** สามารถสร้าง API Documentation ขึ้นมาแบบไหนก็ได้ เช่น text file, PDF, Swagger และอื่นๆ ที่สามารถแสดงข้อมูลได้อย่างถูกต้องและครบถ้วน
3. **การตรวจจะพิจารณาจากความเหมาะสมในการเลือกใช้ชื่อ Path, HTTP Method, Status Codes รวมถึงอื่น ๆ ตาม Convention ทั่วไปด้วย** สามารถศึกษาเพิ่มเติมได้เองเลย
4. HTTP Methods สามารถศึกษาเพิ่มเติมได้ที่
   ([https://www.restapitutorial.com/lessons/httpmethods.html](https://www.restapitutorial.com/lessons/httpmethods.html))
5. Status Codes สามารถศึกษาเพิ่มเติมได้ที่
   ([https://developer.mozilla.org/en-US/docs/Web/HTTP/Status](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status))
   ไม่จำเป็นต้องใช้หรือทราบทั้งหมด ที่ใช้ประจำมีไม่กี่อัน เช่น 200, 201, 301, 400, 401, 403, 404, 500, 503
6. การทำ Authorization (login, user identification) สามารถเลือกใช้วิธีใดก็ได้ เช่น JWT (JSON Web Token), session, หรือแม้แต่ HTTP Basic Auth
7. สำหรับ Authorization Header สามารถศึกษาเพิ่มเติมได้ที่
   ([https://www.loginradius.com/blog/async/everything-you-want-to-know-about-authorization-headers/](https://www.loginradius.com/blog/async/everything-you-want-to-know-about-authorization-headers/))
8. **หากสงสัยโจทย์ในส่วนใด สามารถติดต่อสอบถามได้ที่ isd.sgcu64@gmail.com เสมอ**

<br/>

### ตัวอย่าง API Documentation

#### ทำแบบ Text

- Create task

  - Description: Creates a task with the given input. Returns the instance of the task stored in database. Task must have both name and deadline.
  - Path: /task
  - Method: POST
  - Headers: ไม่มีเพิ่มเติม
  - Request Body: JSON
    ```js
    {
      "name": "Buy chicken",
      "deadline": "21/07/2021"
    }
    ```
  - Request Params: ไม่มี
  - Request Query: ไม่มี
  - Responses
    - Successful task creation
      - Response Body: JSON
      ```json
      {
        "id": 1,
        "name": "Buy chicken",
        "deadline": "21/07/2021"
      }
      ```
      - Status Code: 200 OK
    - Incorrect request body
      - Response Body: JSON
      ```json
      {
        "message": "name or deadline does not exist."
      }
      ```
      - Status Code: 400 Bad Request

#### ทำแบบ Swagger (Spec ที่แสดงอาจไม่ตรงกับ UI ยกมาเพื่อให้เห็นภาพเฉย ๆ)

![image](https://user-images.githubusercontent.com/24814968/121923165-db069f00-cd64-11eb-9098-539c2e1734a9.png)

OpenAPI Spec

![image](https://user-images.githubusercontent.com/24814968/121923206-e5289d80-cd64-11eb-950d-8391bcdc27e0.png)

Swagger UI

# Applicant Section

## Requirement

- Npm or Yarn

  > I would recommend yarn<br>

  > > [download nodejs and npm](https://nodejs.org/en/)

  > > [download yarn](https://classic.yarnpkg.com/en/docs/install/#windows-stable)

## Feature

- An API Documentation.
- User can login and get their access token for authorization.
- Can **CREATE** **UPDATE** **DELETE** and **READ** user's information
- **ONLY** Role HR can do all task via this API.
- Employee still can change their _own_ password and get their information from this API.

## Set Up Project

1. Download all requirement
2. Open cmd / terminal
3. Run commands

  <br/>
  
  ```
  cd <program directory>/Problem #3
  ```
  **For npm**
  ```
  npm install
  ```
  ```
  npm run build
  ```
  ```
  npm run start
  ```
  **For yarn**
  ```
  yarn install
  ```
  ```
  yarn run build
  ```
  ```
  yarn run start
  ```
<br/>

## Note

- Before getting start I have to tell you that I have some problem with the TypeOrm library and I can't do migration the database. So, I solve problem by push the user data to store array.

## CAUTION

- If you restart the service all of the users information will loss except the mock user that I have hard code in the service please carefully.

## Manual

---

### Go to API Doc Page

- When you run all of the above commands the servcie should start. Go to url `http://localhost:3000/api` and you will see API Docs page.

    <br/>

  **Example**

    <br/>

  ![alt text](https://github.com/samithiwat/sgcu64-backend-recruitment/blob/PicAndDemo/index_page.PNG?raw=true)

### Get Access Token

- To get an access token you must login first

  <br/>

  **_I have already provided some mock up user for you_**

  | uid | Password    | Firstname | Lastname   | Role       | Salary |
  | --- | ----------- | --------- | ---------- | ---------- | ------ |
  | "1" | "!password" | "user1"   | "HR"       | "HR"       | 50000  |
  | "2" | "!password" | "user2"   | "employee" | "employee" | 30000  |

  <br/>

  **_You can also create more mock user by the [factory](#factory)_**

  <br/>

- Click at _auth/authorize_

  ![alt_text](https://github.com/samithiwat/sgcu64-backend-recruitment/blob/PicAndDemo/Auth.PNG?raw=true)

<br/>

- Enter uid and password

  ![alt_text](https://github.com/samithiwat/sgcu64-backend-recruitment/blob/PicAndDemo/AuthExample.PNG?raw=true)

<br/>

- And you will get _response code 201_ with an access token.

  ![alt_text](https://github.com/samithiwat/sgcu64-backend-recruitment/blob/PicAndDemo/AuthTokenExample.PNG?raw=true)

<br/>

**NOTE** The token will expire in 1 hour. If it expired you need to login and request the access token again to use the service.

<br/>

### Use Access Token

- After you got an access token you need to copy for authorization

  ![alt_text](https://github.com/samithiwat/sgcu64-backend-recruitment/blob/PicAndDemo/UseTokenExample.PNG?raw=true)

<br/>

- Go to top of the page and look for **_locked icon_** with description `Authorize` at the top right.

  ![alt_text](https://github.com/samithiwat/sgcu64-backend-recruitment/blob/PicAndDemo/Authorization_button.PNG?raw=true)

<br/>

- After you open it, it will pop up an authorization page

  ![alt_text](https://github.com/samithiwat/sgcu64-backend-recruitment/blob/PicAndDemo/Authorization_popup.PNG?raw=true)

<br/>

- Enter your access token and then click authorize

  ![alt_text](https://github.com/samithiwat/sgcu64-backend-recruitment/blob/PicAndDemo/UseTokenExample2.PNG?raw=true)

  <br/>

  **_Now you ready to use the service_**

<br/>

**NOTE** Press the log out button in authorize pop up to log out from the service but the token can still use until it expire.

<br/>

### How to call API

- #### **Example 1** : Get your information.

  If you have already logged in and finished the authorization. You can click at _/officers/me_ to get your information.

  ![alt_text](https://github.com/samithiwat/sgcu64-backend-recruitment/blob/PicAndDemo/Me1.PNG?raw=true)

  <br/>

  Click **_try this_** and then click _**execute**_.

  ![alt_text](https://github.com/samithiwat/sgcu64-backend-recruitment/blob/PicAndDemo/TryItout.PNG?raw=true)

  <br/>

  ![alt_text](https://github.com/samithiwat/sgcu64-backend-recruitment/blob/PicAndDemo/Execute.PNG?raw=true)

  <br/>

  You will recieve a **_response_** like this.

  ![alt_text](https://github.com/samithiwat/sgcu64-backend-recruitment/blob/PicAndDemo/MeResponse.PNG?raw=true)

  <br/>

  If you scoll down a little bit you can see all possible **_response_**.

  ![alt_text](https://github.com/samithiwat/sgcu64-backend-recruitment/blob/PicAndDemo/MeResponse2.PNG?raw=true)

- #### **Example 2** : Update a user account.

  If you have already **_logged in_** and your role is **_HR_**.
  You can update user almost all of their info **_except_** uid and password **_(can't update the others password)_** at _/officers/{id}_ by **PATCH Method**

  ![alt_text](https://github.com/samithiwat/sgcu64-backend-recruitment/blob/PicAndDemo/Update.PNG?raw=true)

  <br/>

  Enter information that you want to update and uid of the user that you want to update at reqeust params (**_CAUTION_** the uid that can't be change so don't put in the request body if you still enter it will response error code **_400 Bad Request_**)

  ![alt_text](https://github.com/samithiwat/sgcu64-backend-recruitment/blob/PicAndDemo/UpdateInput2.PNG?raw=true)

  <br/>

  If not have any problem it will response code **_200 OK_** with updated user information.

  ![alt_text](https://github.com/samithiwat/sgcu64-backend-recruitment/blob/PicAndDemo/UpdateResponseOK.PNG?raw=true)

  <br/>

  But if you change the others password (Now I logged in as user1) or you **_Role_** are not **_HR_**.

  ![alt_text](https://github.com/samithiwat/sgcu64-backend-recruitment/blob/PicAndDemo/UpdateInput3.PNG?raw=true)

  <br/>

  It will response an error code **_403 Forbidden_** back to you.

  ![alt_text](https://github.com/samithiwat/sgcu64-backend-recruitment/blob/PicAndDemo/UpdateResponseForbidden.PNG?raw=true)

  <br/>

  You can also see all possible response if you scoll down a little bit.

  ![alt_text](https://github.com/samithiwat/sgcu64-backend-recruitment/blob/PicAndDemo/UpdatePossibleResponse.PNG?raw=true)

  <br/>

  **_I think this is enough tutorial and I hope you have fun with SGCU API Doc :)_**

### Factory

- #### ** This part use to mock up user information for testing only not consider as a main system so I don't put an authorization with this thing **

- If you want to add more mock user data you can use _officers/factory/{amount}_ to generate a mock user data as you needed

- Firstly click at _officers/factory/{amount}_ then input some amount of user that you want

  ![alt_text](https://github.com/samithiwat/sgcu64-backend-recruitment/blob/PicAndDemo/Factory.PNG?raw=true)

  <br/>

- It will return an array of all users and response code **_200 OK_** **_(This response is the only one that included password in user info)_**

  ![alt_text](https://github.com/samithiwat/sgcu64-backend-recruitment/blob/PicAndDemo/FactoryResponse.PNG?raw=true)

  <br/>

  **_Have Fun =)_**

### Schema

- You can see all schema of user that this service use at the bottom of the web page.

  ![alt_text](https://github.com/samithiwat/sgcu64-backend-recruitment/blob/PicAndDemo/Schema1.PNG?raw=true)

  <br/>

- When you click at it, will show a detail of the schema

  ![alt_text](https://github.com/samithiwat/sgcu64-backend-recruitment/blob/PicAndDemo/Schema2.PNG?raw=true)

  <br/>
