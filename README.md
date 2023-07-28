# Blogs-node-api  
This a simple CRUD REST Blogs API . Tech Stack NodeJS/ Express / MonogDB

## Requirements

- Node.js 
- MongoDB server or Docker and Docker compose
  
## Method 1 Clone the repository and install dependencies

``` 
//on local
git clone https://github.com/Naman15032001/enverx-be-developer-assignment
cd enverx-be-developer-assignment
npm install
```

## Set up the MongoDB connection:

Make sure you have MongoDB installed and running.
Update the  mongo db uri in .env For Example 

```
MONGODB_URI=mongodb://localhost:27017/blogs_app
```

IF using docker then no need for mongodb installed and running on system.
Update the  mongo db uri in .env
```
MONGODB_URI=mongodb://mongodb:27017/blogs_app
```

# Usage

``` 
npm start
// For Docker
docker-compose build
docker-compose up
```

## Test
npm run test

## Coverage
npm run coverage

## API Endpoints

- `GET /posts` - Get all blog posts (orting based on created Date, blog name and filters based on category).
- `GET /posts/:id` - Get a specific blog post by ID.
- `POST /posts` - Create a new blog post.
- `PUT /posts/:id` - Update an existing blog post.
- `DELETE /posts/:id` - Delete a blog post.

## Exapmles

###  Get all blog posts

  #### GET

```
  http://localhost:5555/api/v1/posts?category=sports

  // cURL
  curl --location 'http://localhost:5555/api/v1/posts?category=hh' \
  --data ''
```


### Get a Blog post by id

  #### GET

```
  http://localhost:5555/api/v1/post/64c15a02a104d3f53c19b6c0

  // cURL
  curl --location 'http://localhost:5555/api/v1/post/64c15a02a104d3f53c19b6c0'
```

### Update a Blog post by id

   #### PUT

```

  http://localhost:5555/api/v1/post/64c15a02a104d3f53c19b6c0

  //Request Body:
  {
  "name": "updated_post",
  "content": "New Content",
  "category": "flight"
  }

  // cURL
  curl --location --request PUT 'http://localhost:5555/api/v1/post/64c15a02a104d3f53c19b6c0' \
  --header 'Content-Type: application/json' \
  --data '{
    "name": "jain",
    "category": "hh"
  }'
```

## Create a new blog post

 #### POST

```

http://localhost:5555/api/v1/post
// Request Body:
  {
  "name": "new_post",
  "content": "New Content",
  "category": "flight"
  }

//cUrl

  curl --location 'http://localhost:5555/api/v1/post' \
  --header 'Content-Type: application/json' \
  --data '{
      "name": "okkca",
      "content": "abc",
      "category": "sports",
      "anca":"Acc"
  }'

```

## Delete a  blog post by id

  #### DELETE

```
DELETE 
http://localhost:5555/api/v1/post/1231313


//cUrl

  curl --location --request DELETE 'http://localhost:5555/api/v1/post/64c15a02a104d3f53c19b6c0'

```


