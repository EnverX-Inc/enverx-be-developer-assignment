## Setup Guide

1. Clone this repo from : "https://github.com/ashishpatil-git/enverx-be-developer-assignment.git".
2. Switch to Development branch.
3. Take a fresh `pull`.
4. Create a .env file in your root.
5. Add your database credentials and port number in it.
   - PORT = "your desired port number"
   - DB_USERNAME = "your db username"
   - DB_PASSWORD = "your db password"
   - DB_HOST = "your db hostname"
   - DB_NAME = "your db name"

## Dependency installations :-

1. In order to Install all required dependencies, you need to run the below command.

- `npm install` or `npm i`

## Procedure to run this Application

1. Once done with all the installations, you need to hit the below command.

- `npm run start`

Note :- You can setup your local database and configure your details in environment variables.(I have used Mongo Atlas due to some issues with my local DB).
Refer this link :- https://www.prisma.io/dataguide/mongodb/setting-up-a-local-mongodb-database#setting-up-mongodb-on-windows

## Procedure to use the API endpoints :-

1. Get All available post :-

- Method :- GET
- `{your host address:port_number}/posts` (eg. http://localhost:3000/posts)
- Additionally, you can filter your posts using filter query added in the url.
- `{your host address:port_number}/posts?filter={category_name}` (eg. http://localhost:3000/posts?filter=Videography)
- Body Parameters : title,content,category

2. Get Specific Post by ID :-

- Method :- GET
- `{your host address:port_number}/posts/{id}` (eg. http://localhost:3000/posts/123)

3. Create a new blogpost :-

- Method :- POST
- `{your host address:port_number}/posts` (eg. http://localhost:3000/posts)
- Body Parameters : title,content,category

4. Update a Existing Blog post :-

- Method :- PUT
- `{your host address:port_number}/posts/{id}` (eg. http://localhost:3000/posts)
- Body Parameters : {title?,content?,category?}

5. Delete a Specific blog post based on ID.

- Method :- DELETE
- `{your host address:port_number}/posts/{id}` (eg. http://localhost:3000/posts/123)

Note :- Blog title should be Unique and cannot be updated once used.
