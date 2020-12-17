# MyDiary

### MyDiary is an online journal where users can pen down their thoughts and feelings.
Users can create an account or login if they already have one, they can add entries to their diary and can also view and edit entries.

[![Build Status](https://travis-ci.org/Alameen688/MyDiary.svg?branch=develop)](https://travis-ci.org/Alameen688/MyDiary) [![Coverage Status](https://coveralls.io/repos/github/Alameen688/MyDiary/badge.svg?branch=develop)](https://coveralls.io/github/Alameen688/MyDiary?branch=develop)

Read the [api documentation](http://mydiaryoxygen.herokuapp.com/api-docs)
See the working [application](https://alameen688.github.io/MyDiary/client/)

## Key Features of this Application
+ Users can Register
+ Users that are registered can Log in

*Once user is authenticated:*
+ User can add a diary entry
+ User can edit a diary entry but only on the same day it was created
+ User can view their profile
+ User can edit their profile
+ User can add their favorite quote to their profile
+ User can choose to recieve email notifications


## Requirements
+ Node 
+ Git 
+ Postman
+ Browser (Google Chrome recommended)

*P.S:* See package.json for project dependencies

## Local Installation Guide
* Ensure Node is installed
* clone the repo 
* Run `npm install` to install all the application dependencies listed in package.json
* To test the application, run `npm run test`
* On your development machine Run `npm run dev` to start the server in dev mode and visit `http://localhost:3000`

## Technologies
 * [ECMAScript 2015 - ES6](http://es6-features.org/): This is the newest version of JavsScript with new features such as arrow functions, spread and rest operators and many more.
 * [Babel:](https://babeljs.io/)  Babel is used to transpile es6+ js code down to es5.
 * [Mocha:](https://mochajs.org/) Mocha is a feature-rich JavaScript test framework running on Node.js and in the browser.

 # Coding Style
- Airbnb 

# Language
- Javascript


## Limitations
+ Users cannot delete an entry

## Author
    Ogundiran Al-Ameen
