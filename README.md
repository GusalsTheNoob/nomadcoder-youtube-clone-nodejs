# nomadcoder-youtube-clone-nodejs
A clone coding project available at nomadcoders.co

## Study Notes

### NPM(Node Package Manager): The NodeJS Package Managing Utility
- `npm init`: make a new project and create `package.json`
- `package.json` is a light-weighted method of exchaing dependency infos
- make sure `node_modules` and `package.json` is `gitignore`d.
- `scripts` of `package.json` concisely manage frequently used scripts. (ex: `start`: `node index.js`)

### Nodemon: Automation of Debugging Environment
- `npm install nodemon -D`
- `start` script becomes `nodemon --exec ... --delay 2`

### Babel: Translator of ES6 code to standard codes
- `npm install @babel/node`
- `npm install @babel/preset-env`
- `npm install @babel/core`
- `.babelrc` configuration: `"presets" : ["@babel/preset-env"]`
- requires `start` script to be `babel-node index.js`
- concise arrow function expression, import expression, etc.

### ExpressJS: The NodeJS Framework controlling web app server\
#### Basics
- `npm install express`
- import & export:
  - import: `const express = require("express");` (`import express from "express"` using Babel)
  - export: `export default ~`, `export const ~`
- creating an app: `const app = express();`
- designating a port: `app.listen(PORTNUM, CALLBACKFUNC);`
- listening is the last thing to do!
#### Routing: Directing users to other pages
- GETting a page: `app.get(ROUTE, CALLBACKFUNC)`
- making a grouped router: `app.use(ROUTE, express.Router())`
- Middlewares: Functions between the router and the callbackfunc (Need `next()` to move on)
  - Global Deployment: `app.use()`
  - Local Deployment: Inside `app.get()`
  - Representative middlewares: `morgan`(Logging), `helmet`(Basic Securities), `cookieParser`(Cookie Handling), `bodyParser`(Form Handling)
- Basic Structure:
  - @ app.js: `app.use` to make routers
  - @ routes.js: Store raw values and convert it to `routes` object
  - @ routers/*.js: Specific routers (`express.Router`) are configurated