# Coffe Shop With Express JS

<!-- ABOUT THE PROJECT -->

## About The Project

A web api project for ordering coffee and transactions online. There are 4 operations that can be performed, Get (fetching data), Post (insert data), Update (update partial data), delete (delete data)

## Built With

- [![NodeJS][NodeJS-logo]][NodeJS-url]
- [![PostgreSql][PostgreSql-logo]][PostgreSql-url]

### Package

- [![ExpressJS][ExpressJS-logo]][ExpressJS-url]
- [![JsonWebToken][JsonWebToken-logo]][JsonWebToken-url]
- [![Multer][Multer-logo]][Multer-url]
- [![Argon2][Argon2-logo]][Argon2-url]
- [![DotEnv][DotEnv-logo]][DotEnv-url]

## Install And Run Locally

Clone project from github repository

    git clone https://github.com/ridwanbahtiar15/coffe-shop.git

go to folder coffee-shop

    cd coffee-shop

install dependencies

    npm install

Start the server

    npm run dev

## Configure app

Create file `.env` then edit it with your settings
according to your needs. You will need:

| Key                  | Value                     |
| -------------------- | ------------------------- |
| DB_HOST              | Your Database Host        |
| DB_NAME              | Your Database Host        |
| DB_USER              | Your Database User        |
| DB_PASS              | Your Database Password    |
| JWT_KEY              | Your JWT Key              |
| ISSUER               | Your Issuer               |
| MAIL_SERVICE         | Your Mail Servie          |
| MAIL_AUTH_TYPE       | Your Auth Type            |
| MAIL_USER            | Your Email                |
| GOOGLE_CLIENT_ID     | Your Google Client Id     |
| GOOGLE_CLIENT_SECRET | Your Google Client Secret |
| GOOGLE_REFRESH_TOKEN | Your Google Token         |
| CLOUDINERY_NAME      | Your Cloudinary Name      |
| CLOUDINERY_KEY       | Your Cloudinary Key       |
| CLOUDINERY_SECRET    | Your Cloudinary Secret    |

## Api Refrences

Auth
| Route | Method | Description |
| -------------- | ----------------------- | ------ |
| /auth/login | POST | Login user |
| /auth/register | POST | Register user |
| /auth/logout | DELETE | Logout user |

Product
| Route | Method | Method |
| -------------- | ----------------------- | ------ |
| /products | GET | Get all product |
| /products/:name | GET | Get product by name |
| /products/:category | GET | Get product by category |
| /products | POST | Create new product |
| /products/:id | PATCH | Update Product |
| /products/:id | DELETE | Delete Product |

Order
| Route | Method | Description |
| -------------- | ----------------------- | ------ |
| /orders | GET | Get all order |
| /orders | POST | Create new order |
| /orders/:id | GET | Get Order by id |
| /orders/:id | PATCH | Update status order |

User
| Route | Method | Description |
| -------------- | ----------------------- | ------ |
| /users | GET | Get all user |
| /users | POST | Create new user |
| /users/:id | GET | Get user by id |
| /users/:id | PATCH | Update user by id |
| /users/:id | DELETE | Delete user by id |
| /users/profile | GET | Get user profile |
| /users/profile/edit | PATCH | Update user profile |

## Documentation

[Postman Documentation](https://documenter.getpostman.com/view/28541505/2s9YC8uVci)

## Related Project

[Front End With React JS](https://github.com/ridwanbahtiar15/coffee-shop-react-vite.git)
[Back End With Golang](https://github.com/ridwanbahtiar15/coffee-shop-golang.git)

## Credit

[Ridwan Bahtiar](https://github.com/ridwanbahtiar15)

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
