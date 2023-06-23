# Conexa API

API developed with Typescript, Node, Express and MongoDB

## Run Locally

Clone the project

```bash
  git clone https://github.com/lautivalentini/conexa-api.git
```

Go to the project directory

```bash
  cd conexa-api
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## Running Tests

To run tests, run the following command

```bash
  npm run test
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`JWT_SECRET`

`PORT`

`MONGODB_URI`

## API Reference

[Postman Collection](https://github.com/lautivalentini/conexa-api/blob/main/conexa-api.postman_collection.json)

#### List Users

```http
  GET /user/list
```

| Parameter      | Type     | Description                      |
| :------------- | :------- | :------------------------------- |
| `Bearer token` | `string` | **Required**. Your session token |

#### Sign In

```http
  POST /auth/login
```

| Body       | Type     | Description                 |
| :--------- | :------- | :-------------------------- |
| `email`    | `string` | **Required**. Your email    |
| `password` | `string` | **Required**. Your password |

#### Sign Up

```http
  POST /auth/signup
```

| Body       | Type     | Description                 |
| :--------- | :------- | :-------------------------- |
| `email`    | `string` | **Required**. Unique        |
| `password` | `string` | **Required**. Min 8. Max 32 |

## Authors

- [Lautaro Valentini](https://www.github.com/lautivalentini)
