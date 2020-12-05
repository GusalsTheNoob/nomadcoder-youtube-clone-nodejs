# nomadcoder-youtube-clone-nodejs
A clone coding project available at nomadcoders.co

## Study Notes

### NPM(Node Package Manager): The NodeJS Pacakge Managing Utility
- `npm init`: make a new project and create `package.json`
- `package.json` is a light-weighted method of exchaing dependency infos
- make sure `node_modules` and `package.json` is `gitignore`d.
- `scripts` of `package.json` concisely manage frequently used scripts. (ex: `start`: `node index.js`)

### ExpressJS: The NodeJS Framework controlling web app server\
#### Basics
- `npm install express`
- import: `const express = require("express");`
- creating an app: `const app = express();`
- designating a port: `app.listen(PORTNUM, CALLBACKFUNC);`
- listening is the last thing to do!
#### Routing: Directing users to other pages
- GETting a page: `app.get(ROUTE, CALLBACKFUNC)`
