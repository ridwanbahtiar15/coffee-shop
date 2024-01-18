# Coffe Shop With Express JS

<!-- ABOUT THE PROJECT -->
## About The Project

A web api project for ordering coffee and transactions online. There are 4 operations that can be performed, Get (fetching data), Post (insert data), Update (update partial data), delete (delete data)

---

## Built With

* [![NodeJS][NodeJS-logo]][NodeJS-url]
* [![ExpressJS][ExpressJS-logo]][ExpressJS-url]
* [![PostgreSql][PostgreSql-logo]][PostgreSql-url]

For development, you will only need Node Js, PostgreSQL and a node global package like Express Js, node-postgres, Json Web Token, Multer, argon2, dotenv installed in your environement.

### Node

- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
  Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    node --version
    v18.16.0

    npm --version
    9.5.1

###

## Install

    git clone https://github.com/ridwanbahtiar15/coffe-shop
    cd PROJECT_TITLE
    npm init -y

## Configure app

Create file `.env` then edit it with your settings. You will need:

- DB_HOST = "localhost"
- DB_NAME = "coffeeshop"
- DB_USER = "Your PostgreSQL Usrename"
- DB_PASS = "Your PostgreSQL Password"

- JWT_KEY = "SECRET"
- ISSUER = "Your Issuer, Up to you"

## Running the project

    node index


<!-- MARKDOWN LINKS & IMAGES -->
[NodeJS-url]: https://nodejs.org
[NodeJS-logo]: https://img.shields.io/badge/Node%20JS-green
[ExpressJS-url]: https://expressjs.com
[ExpressJS-logo]: https://img.shields.io/badge/Express%20JS-black
[PostgreSql-url]: https://www.postgresql.org/
[PostgreSql-logo]: https://img.shields.io/badge/Postgre%20SQL-Blue
