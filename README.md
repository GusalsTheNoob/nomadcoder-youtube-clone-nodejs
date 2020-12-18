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

### eslint: formatter
- `npm install -D eslint`
- `npx eslint --init`
- @ .eslintrc.js: `extends: ['plugin:prettier/recommended']`
- `npm install eslint-plugin-prettier`

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
  - Representative middlewares: `morgan`(Logging), `helmet`(Basic Securities), `cookieParser`(Cookie Handling), `bodyParser`(Form Handling), `multer`(file URL returner: explained more)
- URL can pass variables with `:` signature: The params will be passed into `req.params` as an object
  - Generally, the corresponding route must be in a function if it has a param
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

### Multer: A Middleware encoding a file to a URL
- Getting the file itself instead of the file location must be avoided for security
- Multer is a good solution for lightening this practice
- @ file uploading form field, include `enctype="multipart/form-data"` since Multer-supported form needs different type of encoding
- @ middlewares.js, create `multer({dest:FILEDEST}).single(FIELDNAME)`
- Multer-encoded file info is available with `req.file`
- @ app.js, a router for encoded files must be put with `app.use(ROUTE, express.static(DIRECTORYNAME))`
- Uploading user created files into a server is a bad practice: Cloud Storage will be deployed in real services
  
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
- Export(default) the model for use, import it @ db.js (DB initialization code)
- An instance's id is auto-created: available with `id` attribute
#### Model usage (CRUD operation)
- @ controllers/*.js: Import the model with the namestring
- Functions with DB interactions must be `await`ed. Thus, the enveloping function must be an `async` function
- It is a good practice to detect unexpected errors as sensitively as possible -- exception for DB interaction is recommended
##### Data Retrieval
- `await MODEL.find({CONDITIONS})`
- `await MODEL.findById(ID:String)`
- sort method: `.sort({:-1})` (`-1` means descending)
- basic searching: `{ $regex: TERM, $options: "i"}` `i` means case Insensitive
##### Data Creation
- `await MODEL.create({VALUES})`
- Every instance is automatically assigned an object id in `_id` field
##### Data Update
- `await MODEL.findOneAndUpdate(CONDOBJ, CONTENTOBJ)`
##### Data Deletion
- `await MODEL.findOneAndRemove({CONDITIONS})`

### Webpack: JS packager
- Webpack is a 'bundler': It bundles static files into all-in-one package, shortening loading latency
- Webpack configurations are saved @ webpack.config.js
#### Installation
- `npm install webpack webpack-cli`: basic webpack utilities
- `cross-env`: needed to pass script param to webpack
- For easy & automatic trial, script @ package.json is updated -- `"dev:assets": "cross-env WEBPACK_ENV=development webpack -w"`
- @ webpack.config.js, we need to configure basic behavior of webpack
  - ENTRY_FILE: Where Webpack will start to draw dependency tree. Paths are specified with `path.resolve()`
  - OUTPUT: filename and path. Paths are specified with `path.join()`
  - MODE: `development` or `production`? The latter supports compression
#### Configurations
- Specification of module for each file format is necessary
  - `rules` is a list of rule object
  - A rule object specifies its scope with `test` property. Regex is used.
  - A rule specifies its task with `use` property. It is a list of loader objects.
    - Loader is applied to the input file in reverse order
- `npm install sass-loader`: loads and interprets scss files into css files
- `npm install postcss-loader`: supports many powerful automation of css styling
- `npm install autoprefixer`: one of the most powerful utilites postcss-loader provides (Automatically converting plain css to browser-robust css)
- `npm install css-loader`: loads and resolves in-css dependencies
- `npm install mini-css-extract-plugin`: loads css and make it divided one file per js file
- `npm install babel-loader`: a babel utility(ES6 translator) for webpack
#### Implementation
- Just like in the case of Multer, a static route must be defined using `app.use()`
- When developing, two ternimals are working, one with `dev:server` and the other with `dev:assets` (with `-w` option on)

### SCSS: A more logical CSS
- File Structure
  - config: variables and resetting codes
  - pages, partials, mixins
  - All files are imported into one entry point (`styles.scss`)
- Variables: store using `$VARNAME: VALUE;` & call using `$VARNAME`
  - Remember to import earlier than variable-containing 