SEVACONNECT README

Backend- NodeJS, Express and npm libraries

Database- PostgreSQL

Front end- HTML, CSS, Javascript, JQuery and AngularJS

References:

PostgreSQL and NodeJS-  http://mherman.org/blog/2015/02/12/postgresql-and-nodejs/#server-side-routes

AngularJS- https://github.com/mjhea0/thinkful-angular


To SET UP:

1. Install dependencies: `npm install`
1. Start your Postgres server and create a database 
1. Create the database tables: `node server/models/database.js`
1. Start the server: `$ npm start`



PostgreSQL-create Database:
Open app in terminal.
"Create Database *name*"
 "\c *database name* "to connect to database
"\dt" to display tables in database

To import data from file
COPY nonprofitslist FROM '/Users/mananhora/Documents/NGO.numbers' 