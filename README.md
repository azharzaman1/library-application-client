# MERN Stack Library Application (Frontend)

**Backend Repo**: [https://github.com/azharzaman1/library-application-server](https://github.com/azharzaman1/library-application-server)

## How to test & use (Front-end)

Run to clone project on your machine:\
`git clone https://github.com/azharzaman1/library-application-client.git`\

Navigate to project directory\
`cd library-application-client`\

Install deps by running;\
`npm i` or `npm install`

Once project dependencies are install, simple run:\
`npm run dev`

Now, **`development server`** should be running at;\
`localhost:3000`

<br />

## How to test & use (Back-end)

Run to clone project on your machine:\
`git clone https://github.com/azharzaman1/library-application-server.git`

Navigate to project directory\
`cd library-application-server`

Install deps by running;\
`npm i` or `npm install`

Once project dependencies are install, simple run:\
`npm run dev`

Now, **`server`** must be running at;\
`localhost:3500`

<br />

## How to test & use (Auth)

Open localhost:3000 in browser, application homepage shoud be visible\
Click login in header, and login as admin with

(email:**admin@lib.com** and password:**admin**)

As admin, you will have complete control on the application.

In the header now you can Switch between accounts to test role based functionalities, on different pages.

<br />

## Used technologies

---

### MERN Stack

• <b>M</b>ongoDB\
• <b>E</b>xpressJs\
• <b>R</b>eactJs\
• <b>N</b>odeJs

<br/>

### Frontend

• ReactJs\
• Mui(Material UI)\
• Tailwind CSS\
• Redux<br/>

<br/>

### Backend

• NodeJs\
• ExpressJs\
• JWT\
• MongoDB

<br/>

### APIs & Async

• ExpressJs REST APIs\
• Axios\
• React Query

<br/>

## Features

---

### Frontend

• Can **add, view, delete, update** books in libaray\
• Can **add, view, delete, update** students in libaray

<br/>

### Backend

• **Completely Secure Authentication** with **JWT** auth\
• **Roles Based Prevented Routes** with **JWT** auth\
• **MVC** (Modal, View, Controller) followed ExpressJs routing\
• **API** fully follows Restful API criterias

<br />

### AUTH

• **Roles Based highly secure authetication** with **JWT**\
• Trusted Device, Remember me feature \
• Server Resources are **protected** completely to particular roles\
• Only **ADMIN** can add, update and delete books and students,\
• **Students** and **User** role can only view books\
• Simple **User** role can only view books, not students profiles

**NOTE**

### Auth test credentials:

**Admin Account:**\
email: admin@lib.com\
password: admin

**Student Account:**\
email: student@lib.com\
password: student

**User Account:**\
email: user@lib.com\
password: user
