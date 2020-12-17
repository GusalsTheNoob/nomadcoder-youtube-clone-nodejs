# nomadcoder-youtube-clone-nodejs
An educational clone coding project available available at nomadcoders.co
THIS CODE IS A MERE CLONE OF @serranoarevalo (https://github.com/nomadcoders/wetube/commits?author=serranoarevalo)

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

### dotenv: NodeJS module for environmental variable management
- `npm install dotenv`
- `dotenv.config();`
- `process.env.VARNAME`
- MAKE SURE THAT .ENV FILE IS GITIGNORED

### PUG: Truncated HTML View Engine
- `npm install pug`
- `app.set("view engine", "pug")`
- tag: without any additional punctuations
- class: `.CLASSNAME`, Chaining allowed
- other tag properties: inside `(PROPERTY=VALUE)`
- content: `| ~` or `TAGNAME=JSSCRIPT`
- Inserting JS Script result: `#{}`, inside property value
- Loop: `each VARNAME in ITERABLE`
#### extension and blocks
- `extends ~` means this page adopts the template in the given path
- `block ~` in template means this is the blank where each page has different contents
- `block ~` in pageview means this is the content that will fit in the blank
- template is usually stored inside `views/layouts/`
#### inclusion and static partials
- `include ~` means this template adopts the partial template in the given path
-  partial template is usually stored inside `views/partials/`
#### inclusion and dynamic mixins
- `include ~` means this template adopts the dynamic partial template in the given path
- Specific insertion location is marked with `+`
- `mixin` keyword declares the following blocks constitute a mixin template
- mixins are usally stored inside `view/mixins/`

### ExpressJS: The NodeJS Framework controlling web app server
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
- POSTing a page: `app.post(ROUTE, CALLBACKFUNC)`
- Signal status: `res.status(STATUSNUM)`
- forcefull navigation: `res.redirect()`
- POST does not reveal the input (Joining, Log in must be in POST method for security) 
- making a grouped router: `app.use(ROUTE, express.Router())`
- Middlewares: Functions between the router and the callbackfunc (Need `next()` to move on)
  - Global Deployment: `app.use()`
  - Local Deployment: Inside `app.get()`
  - Representative middlewares: `morgan`(Logging), `helmet`(Basic Securities), `cookieParser`(Cookie Handling), `bodyParser`(Form Handling)
- Basic Structure(Seperation):
  - @ app.js: `app.use` to register routers
  - @ routes.js: Store raw values and convert it to `routes` object (Data) [Routes can include function if the route is f-string-like]
  - @ routers/*.js: Specific routers (`express.Router`) are configured (Router)
  - @ controllers/*.js: Specific controllers(functions) are configured (Controller)
#### View Control:
  - `res.render(FILENAME)`: All PUG files are stored inside `views` directory
  - To pass global variable into the view, middleware is required.
    - `res.locals` is a kind of object for PUG view references.
    - Add `localsMiddleware` at the end of the middleware queue in `app.js`
  - To pass local variable into the view, `res.render()` can pass them.
    - ES6 expression: `const {PROPERTYNAME: var1} = OBJECTNAME` designates the value of the property to var1 

### Mongoose: NodeJS package for interaction with DB based on MongoDB
#### Initial connection
- `npm install mongoose`
- Port num must match with what you get from terninal command `mongod`
- Code for connecting to DB is almost standard, refer to `db.js`
#### Model construction
- @ models/*.js: Schema defined and exported
- `mongoose.model(NAME, SCHEMA)` returns a functional model
- `mongoose.Schema()` gets an object clarifying constituting attributes
  - `type` is mandatory
  - `required` gets an error message to show when no data is given to this field
  - `default` stores default value
  - `[]` signifies a list of object will be given
  - Relational database is created with `type: mongoose.Schema.Types.ObjectId` and `ref: MODELNAME`
- Export(default) the model for use