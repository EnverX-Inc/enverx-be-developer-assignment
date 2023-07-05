### API Documentation

#### Setup

To set up the API, follow these steps:

1. Create a `.env` file and add the necessary keys as specified in the `.env.schema` file.

#### Table of Contents

1. [User Endpoints](#user-endpoints)
    - POST auth/register
    - POST auth/login

2. [Blog Endpoints](#blog-endpoints)
    - GET blog/posts
    - GET blog/posts/{id}
    - POST blog/posts
    - PUT blog/posts/{id}
    - DELETE blog/posts/{id}

---

## User Endpoints

### POST auth/register

Register a new user.

**Request Body:**

Provide the necessary details in the request body:

- `email` (string, required): The email address of the user.
- `password` (string, required): The password for the user.
- `username` (string, required): The username for the user.

**Response:**

- 201 Created: Returns an empty response body if the user is created successfully.
- 400 Bad Request: If the request body is missing or invalid.

### POST auth/login

Log in an existing user.

**Request Body:**

Provide the necessary details in the request body:

- `email` (string, required): The email address of the user.
- `password` (string, required): The password for the user.

**Response:**

- 200 OK: Returns the access token and userId in the response body.

---

## Blog Endpoints

### GET blog/posts

Retrieve all blog posts.

**Parameters:**

- `category` (optional): Filter posts by category.

**Response:**

- 200 OK: Returns an array of post objects in the response body.
- 204 No Content: If no posts are found or the category filter doesn't match any posts.

### GET blog/posts/{id}

Retrieve a specific post by its ID.

**Parameters:**

- `id` (integer): The ID of the post to retrieve.

**Response:**

- 200 OK: Returns the post object in the response body.
- 404 Not Found: If the post with the given ID is not found.

### POST blog/posts

Create a new blog post.

**Request Body:**

Provide the necessary details of the post in the request body:

- `blog` (string): The content of the blog post.
- `category` (string): The category related to the blog post.

**Response:**

- 201 Created: Returns an empty response body if the post is created successfully.
- 400 Bad Request: If the request body is missing or invalid.

### PUT blog/posts/{id}

Update an existing post by its ID.

**Parameters:**

- `id` (integer): The ID of the post to update.

**Request Body:**

Provide the updated details of the post in the request body:

- `blog` (string): The updated content of the blog post.
- `category` (string): The updated category related to the blog post.

**Response:**

- 200 OK: Returns an empty response body if the post is updated successfully.
- 400 Bad Request: If the request body is missing or invalid.
- 404 Not Found: If the post with the given ID is not found.

### DELETE blog/posts/{id}

Delete a post by its ID.

**Parameters:**

- `id` (integer): The ID of the post to delete.

**Response:**

- 204 No Content: Returns an empty response body if the post is deleted successfully.
- 404 Not Found: If the post with the given ID is not found.

---
