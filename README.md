# Web Programming Final Project

## About The Project

As a student in NTU, we find it difficult to register most of the desired courses only by using the official registration system. Most students go to class in person and acquire the additional registration code instead. However, one might have more than one desired courses at the same time. Therefore, a real-time information exchange forum with correctness is necessary.

### Several important features derived:

- Personalization account system with
- Follow or Unfollow course with serial_number
- Detail information of each course
- Real-time Vote system which updates course statics
- Crucial vote problems including:

  1. “priority” of different identities (e.g. department, year)
  2. Maximum number of “people”
  3. The most likely “time” that distribute the registration code

- Real-time Comment system for further detail information exchange
- Timetable of followed courses with best possibility to get registration code
- Mobile device friendly

### Possibly features in the future:

- History page that give static for different semesters
- Import course with more field (e.g. title, number and class_number )

## Built With

This section should list any major frameworks that you built your project using. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

- [npm](https://www.npmjs.com/)

### Frontend

- [React](https://reactjs.org/) - Main framework
- [React Router](https://reactrouter.com/) - Serve different component
- [MATERIAL-UI](https://material-ui.com/) - unify the style
- [socket.io-client](https://www.npmjs.com/package/socket.io-client) - Realtime update for vote and comment

### Backend

#### Database

- [mongodb](https://www.mongodb.com/)
- [redis](https://redis.io/)

#### npm packages

##### Development

- [nodemon](https://www.npmjs.com/package/nodemon) - Auto restart node server after server side modified
- [webpack](https://webpack.js.org/) - Compile bundle js for development and production
- [babel-loader](https://github.com/babel/babel-loader)
- [webpack-cli](https://www.npmjs.com/package/webpack-cli)

##### Packages

- [socket.io](https://socket.io/) - Realtime update vote and comment
- [express](https://expressjs.com/) - For backend apis and serving file
- [express-session](https://www.npmjs.com/package/express-session) - For login cookies and session
- [express-async-handler](https://www.npmjs.com/package/express-async-handler) - For express route async function
- [bcrypt](https://www.npmjs.com/package/bcrypt) - Hash password for safety
- [connect-redis](https://www.npmjs.com/package/connect-redis) - Store sessions
- [mongoose](https://mongoosejs.com) - Store all accounts and courses data

<!-- GETTING STARTED -->

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

## Prerequisites

This is an example of how to list things you need to use the software and how to install them.

- npm
  ```sh
  npm install npm@latest -g
  ```

## Installation

1. Clone the repo
   ```sh
   git clone https://github.com/redxouls/web_final_project.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Install YARN packages
   ```sh
   yarn
   ```
4. Set up your project environment parameters for dbs at `.env`
   ```env
   HTTPS=
   NODE_ENV=
   PORT=
   MONGO_URL=
   REDIS_HOST=
   SESSION_PREFIX=
   ```

<!-- USAGE EXAMPLES -->

## Usage

1. Login :

2. Browse Followed Course :

3. Follow Course :

4. Unfollow Course :

5. Vote for "Rules", "People", "Priority" of when registeting this course :

6. Leave comment :

## File Structure

### Root Directory

```
.
├── asset
├── config
├── dist
├── node_modules
├── scripts
├── server
├── src
├── Dockerfile
├── README.md
├── package-lock.json
├── package.json
├── webpack.config.js
└── yarn.lock

```

### Src side (frontend)

```
src
├── Login
│   └── main.js
├── Mainpage
│   ├── choice.js
│   ├── comment.js
│   ├── dialog.js
│   ├── main.js
│   ├── submit.js
│   ├── title.js
│   └── vote.js
├── Tutorial
│   └── main.js
├── User
│   ├── Courselist
│   │   ├── Addcourse.js
│   │   ├── Courselistitem.js
│   │   └── main.js
│   ├── Startable
│   │   ├── Blankbutton.js
│   │   ├── Coursebutton.js
│   │   ├── Dayblock.js
│   │   ├── Timenum.js
│   │   └── main.js
│   ├── Timetable
│   │   ├── Blankbutton.js
│   │   ├── Coursebutton.js
│   │   ├── Dayblock.js
│   │   ├── Timenum.js
│   │   └── main.js
│   ├── Navigation.js
│   └── main.js
├── App.js
├── index.html
└── index.js

```

- Login - 登入畫面
- Mainpage - 課程頁面
- Tutorial - 教學介面
- User - 用戶選課資訊：全部課程表/精選課程表/已選課列表

### Server Side (backend)

```
server
├── models
│   ├── account.js
│   ├── comment.js
│   ├── course.js
│   ├── course_vote.js
│   ├── following.js
│   └── user_vote.js
├── routes
│   ├── comment.js
│   ├── course.js
│   ├── index.js
│   ├── login.js
│   ├── user.js
│   └── vote.js
├── app.js
├── constants.js
├── db.js
└── socket.js
```

### routes - APIs (with express router):

- login (post & delete)
- user (get & post & delete)
- course (get)
- vote (post)
- comment (post)

### models - Schemas and models for monogodb

### socket.js - emit & on function for socket-io

## Authors

### 第 20 組

- B08901058 陳宏恩
  1. project environment set ups (express, React, webpack, bebel/loader)
  2. database (monogodb & redis)
  3. backend apis (express) & realtime update (socket-io)
  4. scripts to dump courses information, generate account votes and comments
  5. deploy (docker)
- B08902037 王苡涵
  1. frontend (Login, Mainpage)
  2. idea (ideas of the website)
  3. color choosing
  4. realtime statistic (socker-io client)
  5. record demo video
- B08902052 陳富中
  1. frontend (Tutorial, User, Route）
  2. main framework for frontend
  3. gathering images and icons
  4. main css settings
  5. routing at frontend
