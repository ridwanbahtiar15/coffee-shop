# Coffe Shop With Express JS

<!-- ABOUT THE PROJECT -->
## About The Project

A web api project for ordering coffee and transactions online. There are 4 operations that can be performed, Get (fetching data), Post (insert data), Update (update partial data), delete (delete data)

## Built With

* [![NodeJS][NodeJS-logo]][NodeJS-url]
* [![PostgreSql][PostgreSql-logo]][PostgreSql-url]

### Package
* [![ExpressJS][ExpressJS-logo]][ExpressJS-url]
* [![JsonWebToken][JsonWebToken-logo]][JsonWebToken-url]
* [![Multer][Multer-logo]][Multer-url]
* [![Argon2][Argon2-logo]][Argon2-url]
* [![DotEnv][DotEnv-logo]][DotEnv-url]

For development, you will only need Node Js, PostgreSQL and a node global package like Express Js, node-postgres, Json Web Token, Multer, argon2, dotenv installed in your environement.


## Install And Run Locally

Clone Project

  node index

  

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
[PostgreSql-logo]: https://img.shields.io/badge/Postgre%20SQL-blue
[JsonWebToken-url]: https://www.npmjs.com/package/jsonwebtoken
[JsonWebToken-logo]: https://img.shields.io/badge/Json%20Web%20Token-red
[Multer-url]: https://www.npmjs.com/package/multer
[Multer-logo]: https://img.shields.io/badge/Multer-grey
[Argon2-url]: https://www.npmjs.com/package/argon2
[Argon2-logo]: https://img.shields.io/badge/Argon2-orange
[DotEnv-url]: https://www.npmjs.com/package/dotenv
[DotEnv-logo]: https://img.shields.io/badge/Dotenv-black


