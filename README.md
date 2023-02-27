# Getting Started

Server-side app for Videos Creator Platform

## .env File

To run this project, you need to add a .env file at root dir for basic configurations.

```bash
PORT=3000
DB_HOST='nicasource-db'
DB_USER='postgres'
DB_PASSWORD='admin'
DB_NAME='develop'
DB_PORT=5432
SALT_ROUNDS=10
SECRET="gJ4IQg8KmW1cjIBZEluROSWua3HEU8hS"
TOKEN_EXPIRE=3600000
```


## Available Scripts ONLY DOCKER

In the project directory, you can run:

### `npm run compose`

With this script you can deploy the databae and launch the Express Server:
Make sure you have the .env file on root file and:
    DB_HOST='nicasource-db'

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.



## Available Scripts

In the project directory, you can run:

### `npm run build`

If you have Postgres on localhost, you need to config the .env file with:
    DB_HOST='127.0.0.1'

### `npm start`

To launch the Express Server:

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.