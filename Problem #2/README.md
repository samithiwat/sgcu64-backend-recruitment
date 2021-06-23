# โจทย์ข้อที่ 2: Chula Chana

## วัตถุประสงค์

- เพื่อทดสอบความรู้ความเข้าใจในการเขียนโปรแกรมเบื้องต้น
- เพื่อทดสอบความสามารถในการจัดการข้อมูลที่ได้รับมา ตั้งแต่การจัดเก็บไปจนถึงการค้นข้อมูล ได้อย่างถูกต้องและแม่นยำ

## รายละเอียด

<p align="center">
  <img src="https://i.imgur.com/ixmHtMU.png" />
  <br />
  (ภาพหน้าเว็บ CU Check In)
</p>

&emsp; CU Check In เป็น Web Application ที่ทาง ISD SGCU63 ทำขึ้นเพื่อทำการ Track จำนวนคนในพื้นที่ ในช่วงอีเวนท์ลอยกระทงจุฬาฯ ในปีที่ผ่านมา ซึ่งใน app ผู้ใช้จะต้องสแกน QR Code ที่หน้างานลอยกระทง และกรอกเบอร์โทรศัพท์ เพื่อCheck in แล้วจึงจะสามารถเข้างานได้ และสามารถแสกน QR Code เพื่อ Check out เมื่อจะออกจากงาน

&emsp; ใน 1 ปีถัดมา ตัวคุณเองพบว่า Web Application ดังกล่าวของ ISD SGCU63 มี User Experience ที่ใช้งานยาก จึงได้ทำการเขียนโปรแกรม Chula Chana (จุฬาฯ ชนะ) เพื่อแข่งขันกับ CU Check In และ ไทยชนะ เพื่อที่จะก้าวขึ้นเป็นที่หนึ่งของ Tracking Application ของประเทศไทยให้ได้เล้ย

```
Welcome to Chula Chana!!!
Available commands:
  1. Check in user
  2. Check out user
  3. Print people count
Please input any number: 1
-----------------------------------------------------------------
Check in
Enter phone number: 0855555555
  1. Mahamakut Building
  2. Sara Phra Kaew
  3. CU Sport Complex
  4. Sanum Juub
  5. Samyan Mitr Town
Select the place: 3
Checking in 0855555555 into CU Sport Complex
-----------------------------------------------------------------
Welcome to Chula Chana!!!
Available commands:
  1. Check in user
  2. Check out user
  3. Print people count
Please input any number: 3
-----------------------------------------------------------------
Current Population
  1. Mahamakut Building: 20
  2. Sara Phra Kaew: 9
  3. CU Sport Complex: 35
  4. Sanum Juub: 2
  5. Samyan Mitr Town: 17
-----------------------------------------------------------------
Welcome to Chula Chana!!!
Available commands:
  1. Check in user
  2. Check out user
  3. Print people count
Please input any number: 3
```

<p align="center">
  (ตัวอย่าง UI อันสวยงามของโปรแกรมจุฬาฯ ชนะ)
</p>

&emsp; โดยจุฬาฯ ชนะ ที่คุณจะสร้างขึ้นนั้น เป็นโปรแกรมง่าย ๆ บนคอมพิวเตอร์ ที่สามารถรับข้อมูลเป็นเบอร์โทรศัพท์ เพื่อ Check in หรือ Check out ในพื้นที่ไหนก็ได้ที่ตั้งค่าไว้ พร้อมทั้งสามารถดูจำนวนคนที่อยู่ในพื้นที่ต่าง ๆ ได้ และแสดงผลออกมาทาง Standard Output ดังเช่นตามในรูปข้างต้น

&emsp; ทั้งนี้รูปแบบการรับข้อมูลเข้าหรือการแสดงผลนั้นผู้สมัครสามารถออกแบบเป็นอย่างไรก็ได้ตามความเหมาะสม ไม่มีความจำเป็นจะต้องเขียนเหมือนแบบในตัวอย่างข้างต้นเพียงแต่จะมี Feature บางประการที่จำเป็นจะต้องมีอยู่ในโปรแกรมของคุณดังนี้

## Features ที่ต้องมี

1. **Check in**

   - Input มีสองอย่าง
     1. เบอร์โทรศัพท์ (สมมติว่าผู้ใช้กรอกถูก Format ได้เลย)
     2. พื้นที่ที่ต้องการ Check in (สามารถ Hard Code ลงไปใน Source Code ได้)
   - **ไม่จำเป็น** ต้องมี Output แต่อาจมีได้ เพื่อการใช้งานที่ง่ายขึ้น
   - ในกรณีที่เบอร์โทรศัพท์นั้น เคย Check in อยู่ในพื้นที่ที่ Check in ไว้อยู่แล้ว แล้วจะต้องทราบได้ว่าเป็นคนเดียวกัน และไม่ส่งผลอะไรต่อจำนวนคนในพื้นที่นั้น
   - ในกรณีที่เบอร์โทรศัพท์นั้น เคย Check in อยู่ในพื้นที่อื่น ไม่ใช่พื้นที่ที่กำลังจะ Check in ขอให้เข้าใจว่าผู้ใช้ลืม Check out พื้นที่เดิม จะต้องน าเบอร์โทรศัพท์นั้น ออกจากพื้นที่เก่า แล้วนำมาใส่พื้นที่ใหม่ (แสดงว่าจำนวนคนในพื้นที่เก่าจะต้องลดลง และจำนวนคนในพื้นที่ใหม่จะต้องมากขึ้น)
   - ในสองกรณีข้างต้น สามารถแจ้งเตือนผู้ใช้ให้รู้ตัวหรือไม่ก็ได้ แล้วแต่ออกแบบ

2. **Check out**

   - Input มีอย่างเดียวคือเบอร์โทรศัพท์
   - **ไม่จำเป็น** ต้องมีข้อมูลส่งออก แต่อาจมีได้ เพื่อการใช้งานที่ง่ายขึ้น
   - การ Check out จะต้องตรวจสอบว่า เบอร์โทรศัพท์นั้น ๆ อยู่ในพื้นที่ใด แล้วจึง Check out ออกจากพื้นที่นั้นให้โดยอัตโนมัติ (แสดงว่าจำนวนคนในพื้นที่ที่ผู้ใช้เคยอยู่ต้องลดลง)
   - ในกรณีที่เบอร์โทรศัพท์นั้นไม่ได้ถูก Check in อยู่พื้นที่ใด ไม่จำเป็นต้องทาอะไรใด ๆ สามารถแจ้งเตือนผู้ใช้ให้รู้ตัวหรือไม่ก็ได้ แล้วแต่ออกแบบ

3. **แสดงผลจำนวนคนในแต่ละพื้นที่**

   - ไม่มี Input เพิ่มเติม
   - Output จะต้องแสดงจำนวนคนในแต่ละพื้นที่ใน Format ที่เข้าใจง่าย

&emsp; สำหรับจำนวนสถานที่ที่ให้ผู้ใช้งานใช้ได้นั้น สามารถ Hard Code ลงไปในโปรแกรมได้เลย เพียงแต่ต้องมี **อย่างน้อย 5 สถานที่** หรือสามารถทำเป็น Dynamic (เพิ่มลดได้) ซึ่งก็คือมี Feature สำหรับให้ผู้ใช้สามารถเพิ่มสถานที่เองได้

&emsp; Feature อื่น ๆ นอกจากที่กล่าวมาข้างต้น เป็นสิ่งที่ไม่ได้บังคับ สามารถทำเพิ่มได้ หากอยากโชว์ของ

<br/>

# Applicant Section

## Requirement

- Java JDK 15.0.2 + (I'm not sure older version will work?)
  > [you can download here](https://www.oracle.com/java/technologies/javase/jdk15-archive-downloads.html)

## Feature

- Create user and location database if it doesn't exist.
- Save registered user and registered location to the database
  (If you reopen Chula Chana again it will load users and locations data from the database).
- Register a user by phone number if user doesn't exist in database.
- Register a location by name if location doesn't exist in database.
- Unique phone number in database.
- Check in user by phone number.
- Check out user by phone number.
- Show numbers of people in all registered location.
- Search user by phone number.

## Manual

### Open Program

1. Make sure you install java JDK version 15.0.2 or later (I'm not sure that older version will work :|)
2. Open cmd / terminal
3. Enter command

   ```
      cd <program directory>/Problem #2
   ```

   ```
      java -jar ChulaChana.jar
   ```

### In Program

---

### Create a Database

- If you open a program for the first time you will see text
  <br/>
  `Not found user's database creating new one...`
  <br/>
  `Not found location's database creating new one...`
  <br/>
  don't be worry, it is creating a database for you :)
  <br/>

### Main menu

- When you enter Chula Chana you will see main menu and avaliable command.

  <br/>

  ```
  ---------------------------------------------
  Welcome to Chula Chana!!!
  Avaliable commands
    1. Check in user
    2. Check out user
    3. Print people count
    4. Search user via phone number
    type "END" to terminate program
  Please enter command number : <command number>
  ---------------------------------------------
  ```

**NOTE** If you enter an invalid command the program will print an error message.

  <br/>
  
  **Example error message**

```
  ============================
          ***ERROR***
  Invalid Command!
  Press ENTER to continue...
  ============================
```

<br/>

### Register a User

- When you checking in. If your phone number doesn't exist in database
  Chula Chana will let you register by enter phone number and username

  <br/>

  ```
  ---------------------------------------------
    New one? registering...
    Enter your username (more than 5 character) : <your prefered username>
  ---------------------------------------------
  ```

  **NOTE 1** your username must more than 5 character to complete the user register process.<br/>
  **Example error message**

  <br/>

  ```
  ============================
          ***ERROR***
  Username must more than 5 character
  Press ENTER to continue...
  ============================
  ```

  <br/>

  **NOTE 2** If you get any error you will return to main menu and you will loss the process.
  <br/>

### Register a Location

- When you checking in. If in database doesn't has any registered location, you input the location doesn't exist in database or you enter "ADD" command Chula Chana will let you register location by enter the location's name.

  <br/>

  **NOTE 1** The location name must not same as the registered location in database and more than 5 character to complete the location register process.

  <br/>

  **Example error message**

  <br/>

  ```
  ============================
          ***ERROR***
  This location is already existed!
  Press ENTER to continue...
  ============================
  ```

  <br/>

  **NOTE 2** If you get any error you will return to main menu and you will loss the process.

  <br/>

### Check in

- If you enter command "1" (Check in) in the main menu
  Chula Chana will request your phone number to check in and then it will let you select location to check in.
- When finished check in or get an error you will return to the main menu.

  <br/>

  **NOTE 1** If your phone number dosen't exist in database Chula Chana will let you register.

  <br/>

  ```
  ---------------------------------------------
  New one? registering...
  Enter your username (more than 5 character) : <your prefered username>
  ---------------------------------------------
  ```

  <br/>

  **NOTE 2** If you enter for the first time,
  enter location doesn't exist in database or enter "ADD" command Chula Chana will let you register a location.
  <br>

  ```
  ---------------------------------------------
  Not have any checked in location yet.
  Please enter location name to register new location : <location name>
  ---------------------------------------------
  ```

  ```
  ---------------------------------------------
  Not found location registering...
  Enter location name to register : <location name>
  ---------------------------------------------
  ```

  ```
  ---------------------------------------------
  Enter location name to register (more than 5 character) : <location name>
  ---------------------------------------------
  ```

    <br/>

### Check out

- If you enter command "2" (Check out) in the main menu
  Chula Chana will request your phone number to check out from current location.
  <br/>
  **NOTE** if you are currently not check in at any locaiton Chula Chana will tell you that you are not at any location.

  ```
  ---------------------------------------------
    Check Out
    Enter your phone number : <your phone number>
  ---------------------------------------------
  ```

  <br/>

### Show the number of users in locations

- If you enter command "3" (Print people count) in the main menu
  Chula Chana will show Location list and the number of users in each location.

  <br/>

  **Example output**

  ```
  -----------------------------------------
  Current Population
    1. Home Sweet Home: 0
    2. Chulalongkorn University: 0
  -----------------------------------------
  ```

<br/>

### Search user via phone number

- If you enter command "4" in main menu
  Chula Chana will requst a phone number
  to search for a user.

  <br/>

  **Example output**

  ```
  ---------------------------------------------
    Username : someone
    Phone Number : 088XXXXXXX
    Current at : Not check in yet
  ---------------------------------------------
  ```

  ```
  ---------------------------------------------
    Username : someone
    Phone Number : 088XXXXXXX
    Current at : Chulalongkorn University
  ---------------------------------------------
  ```

  ```
  ---------------------------------------------
  Not found that user
  Press ENTER to continue
  ---------------------------------------------
  ```

<br>

### Exit Program

- If you enter "END" command Chula Chana will terminate.
