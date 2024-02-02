# Coffe Shop With Express JS

<!-- ABOUT THE PROJECT -->

<div align="center">
        <img src="./coffee-shop-logo.webp" width="200px" alt="logo"></img>
</div>

A web api project for ordering coffee and transactions online. There are 4 operations that can be performed, Get (fetching data), Post (insert data), Update (update partial data), delete (delete data)

## Built With

- [Node JS](https://nodejs.org)
- [Express JS](https://expressjs.com)
- [Postgre SQL](https://www.postgresql.org/)
- [JSON Web Token](https://www.npmjs.com/package/jsonwebtoken)
- [Multer](https://www.npmjs.com/package/multer)
- [Cloudinary](https://www.npmjs.com/package/cloudinary)

## Configure app

Create file `.env` then edit it with your settings
according to your needs. You will need:

<pre>
<code>
DB_HOST = Your Database Host
DB_NAME = Your Database Host
DB_USER = Your Database User
DB_PASS = Your Database Password
JWT_KEY = Your JWT Key
ISSUER = Your Issuer
MAIL_SERVICE = Your Mail Servie
MAIL_AUTH_TYPE = Your Auth Type
MAIL_USER Your = Email
GOOGLE_CLIENT_ID = Your Google Client Id
GOOGLE_CLIENT_SECRET = Your Google Client Secret
GOOGLE_REFRESH_TOKEN = Your Google Token
CLOUDINERY_NAME = Your Cloudinary Name
CLOUDINERY_KEY = Your Cloudinary Key
CLOUDINERY_SECRET = Your Cloudinary Secret
</code>
</pre>

## Install And Run Locally

1.  Clone project from github repository

        $ git clone https://github.com/ridwanbahtiar15/coffe-shop.git

2.  go to folder coffee-shop

        $ cd coffee-shop

3.  install dependencies

        $ npm install

4.  Start the server

        $ npm run dev

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

[Postman Documentation](https://documenter.getpostman.com/view/28541505/2s9Yyqhgjq)

## Related Project

[Front End With React JS](https://github.com/ridwanbahtiar15/E-Wallet-Frontend)
