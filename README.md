[![N|Solid](https://iili.io/Hi9giog.png)](https://www.enverx.com/)

EnverX offers a simple and convenient platform to fund early-stage projects
and trade future carbon credits.

## _Assginment For Backend Developer Role_

the assignment contain little destructed format architecture which can be used for the production.

> clone this repo and open the folder inside terminal
> copy .env.example to .env file and provide proper information regarding setup including mongodb

#### there are 2 approaches to run this project

- through the normal which required following softwares to be installed on the device
  - Nodejs
  - mongodb
    > steps to install and run the project
    > then follow the following commands to run the project
  ```
  npm i -g nodemon
  npm install
  npm run dev
  ```
- through docker
  **make sure you have `docker` installed**
  > step to run the through docker
        ```
        docker compose -f docker-compose.dev.yaml up --build
        ```

it contain the following routes for the operations

1. `/api/v1/posts` (GET) -> get all post paginated
2. `/api/v1/posts` (POST) -> create post
3. `/api/v1/posts/:postId` (GET) -> get post by id
4. `/api/v1/posts/:postId` (PUT) -> update post by id
5. `/api/v1/posts/:postId` (DELETE) -> delete the post by id

**Authentication is not yet implemented**

**live Deployment link**: **[chirag.heku.dev](http://chirag.heku.dev)**
