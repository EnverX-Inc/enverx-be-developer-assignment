# EnverX Blog API

Welcome to the EnverX Blog API! This is a simple RESTful API built using Node.js and Express.js for managing blog posts. The API provides endpoints for creating, reading, updating, and deleting blog posts.

## Table of Contents

- [Installation](#installation)
- [Endpoints](#endpoints)
- [Error Handling](#error-handling)

## Installation

1. **Prerequisites**

   - Node.js
   - MongoDB

2. **Clone the Repository**:

   ```bash
   git clone https://github.com/your-username/simple-blog-api.git

   ```

3. **Change Branch**
   ```bash
   git checkout development
   ```
4. **Install Dependencies**

   ```bash
   npm install

   ```

5. **Set Up .env file**

   ```
    MONGODB_URI=mongodb://your_username:your_password@localhost:27017/your_database_name
    PORT = 8080
   ```

6. **Run Server**

   ```bash
   npm start
   ```

## Endpoints

The EnverX Blog API provides the following endpoints for managing blog posts:

### Get All Blog Posts

- **URL:** `/posts`
- **Method:** `GET`
- **Description:** Get all blog posts with optional sorting and filtering.
- **Query Parameters:**

  - `sortBy`: Sort the posts by `"createdAt"` (created date) or `"title"` (blog title). Default is `"createdAt"`.
  - `sortDirection`: Sort direction, either `"asc"` (ascending) or `"desc"` (descending). Default is `"desc"`.
  - `category`: Filter posts by category.

- **Example URL:** `/posts?sortBy=createdAt&sortDirection=desc&category=technology`

### Get a Specific Blog Post

- **URL:** `/posts/:id`
- **Method:** `GET`
- **Description:** Get a specific blog post by ID.

### Create a New Blog Post

- **URL:** `/posts`
- **Method:** `POST`
- **Description:** Create a new blog post.
- **Request Body:**
  ```json
  {
    "author": "Author Name",
    "title": "Blog Title",
    "content": "Blog Content",
    "category": "Blog Category"
  }
  ```

### Update an Existing Blog Post

- **URL:** `/posts/:id`
- **Method:** `PUT`
- **Description:** Update an existing blog post by ID.
- **Request Body:**
  ```json
  {
    "author": "Updated Author",
    "title": "Updated Title",
    "content": "Updated Content",
    "category": "Updated Category"
  }
  ```

### Delete a Blog Post

- **URL:** `/posts/:id`
- **Method:** `DELETE`
- **Description:** Delete a blog post by ID.

  Deletes the specified blog post with the given ID. Make sure to replace `:id` in the URL with the actual ID of the blog post you want to delete.

Each endpoint is designed to handle specific CRUD operations on blog posts. You can use tools like Postman or cURL to interact with the API and perform these operations.

## Error Handling

The API handles errors gracefully and returns appropriate HTTP status codes:

- `404 Not Found` if a requested post is not found.
- `400 Bad Request` if an invalid post ID is provided.
- `500 Internal Server Error` for other errors.
