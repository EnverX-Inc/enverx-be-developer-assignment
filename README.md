## Table of contents

- [General info](#general-info)
- [Technologies](#technologies)
- [Setup](#setup)
- [API Documentation](#api-documentation)
- [Resume](./Gopal_Resume.pdf)

## General info

Refer [here](./EnverX_README.md) for requirement.

Deployed Project Endpoint link: https://enverx.task.ser-veresta.dev/api/blog

## Technologies

Project is created with:

- NodeJS
- Typscript
- Express
- Postgres

## Setup

To run this project follow the bellow steps (Need Docker Compose installed locally):

```bash
git clone https://github.com/ser-veresta/enverx-be-developer-assignment.git
cd enverx-be-developer-assignment
git checkout development
docker-compose up -d

```

The Server start in PORT 8080 as per the docker compose file.

## API Documentation

### Routes

#### GET /posts

**Description** :- Based on the optional parmeters provided returns response sorted in Ascending order.
**Optional Parameters** :- c_ts=1,name=1,category=1
**Sample Request** :- {{host}}/api/blog/posts?category=1
**Sample Response** :-

```json
{
  "status": true,
  "txt": "",
  "data": [
    {
      "blog_id": "04e4afde-3a35-4721-9190-20062ddd36aa",
      "name": "Test Business",
      "description": "Testing Business Related Blog",
      "category": "business",
      "c_ts": "2023-07-01T15:23:35.199Z",
      "u_ts": "2023-07-01T15:23:35.199Z"
    },
    {
      "blog_id": "4542ed09-9b17-4482-825a-1d07fca5074f",
      "name": "Test Media",
      "description": "Testing Updated Media Related Blog",
      "category": "media",
      "c_ts": "2023-07-01T14:26:34.533Z",
      "u_ts": "2023-07-01T14:42:14.266Z"
    }
  ]
}
```

#### GET /posts/:id

**Description** :- Get Individual Post with Blog Post ID
**Parameters** :- id
**Sample Request** :- {{host}}/api/blog/posts/04e4afde-3a35-4721-9190-20062ddd36aa
**Sample Response** :-

```json
{
  "status": true,
  "txt": "",
  "data": {
    "blog_id": "04e4afde-3a35-4721-9190-20062ddd36aa",
    "name": "Test Business",
    "description": "Testing Business Related Blog",
    "category": "business",
    "c_ts": "2023-07-01T15:23:35.199Z",
    "u_ts": "2023-07-01T15:23:35.199Z"
  }
}
```

#### POST /posts

**Description** :- Insert New Blog Post
**Sample Request** :- {{host}}/api/blog/posts

```json
{
  "name": "Test Sport",
  "description": "Testing Sport Related Blog",
  "category": "Sport"
}
```

**Sample Response** :-

```json
{
  "status": true,
  "txt": "Blog Post Inserted",
  "data": {
    "identifiers": [
      {
        "blog_id": "483b6709-83ce-4454-94e5-b4518772d362"
      }
    ],
    "generatedMaps": [
      {
        "blog_id": "483b6709-83ce-4454-94e5-b4518772d362",
        "c_ts": "2023-07-01T15:33:36.938Z",
        "u_ts": "2023-07-01T15:33:36.938Z"
      }
    ],
    "raw": [
      {
        "blog_id": "483b6709-83ce-4454-94e5-b4518772d362",
        "c_ts": "2023-07-01T15:33:36.938Z",
        "u_ts": "2023-07-01T15:33:36.938Z"
      }
    ]
  }
}
```

#### PUT /posts/:id

**Description** :- Update Post with Blog Post ID
**Parameters** :- id
**Sample Request** :- {{host}}/api/blog/posts/04e4afde-3a35-4721-9190-20062ddd36aa

```json
{
  "name": "Test Sport Updated",
  "description": "Testing Updated Sport Related Blog"
}
```

**Sample Response** :-

```json
{
  "status": true,
  "txt": "Blog Post Updated",
  "data": {
    "generatedMaps": [],
    "raw": [],
    "affected": 1
  }
}
```

#### DELETE /posts/:id

**Description** :- Delete Post with Blog Post ID
**Parameters** :- id
**Sample Request** :- {{host}}/api/blog/posts/04e4afde-3a35-4721-9190-20062ddd36aa
**Sample Response** :-

```json
{
  "status": true,
  "txt": "Blog Post Deleted",
  "data": {
    "raw": [],
    "affected": 1
  }
}
```
