# Blog Post API - Technical Documentation

## Introduction

The Blog Post API is a Node.js application that allows users to perform CRUD (Create, Read, Update, Delete) operations on blog posts. It provides endpoints to create new blog posts, retrieve blog posts, update existing blog posts, and delete blog posts. The application is built using Express.js as the web framework and MongoDB as the database, with Mongoose as the ODM (Object Data Modeling) library for MongoDB.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [Get All Blog Posts](#get-all-blog-posts)
  - [Get a Specific Blog Post by ID](#get-a-specific-blog-post-by-id)
  - [Create a New Blog Post](#create-a-new-blog-post)
  - [Update an Existing Blog Post](#update-an-existing-blog-post)
  - [Delete a Blog Post](#delete-a-blog-post)
- [Postman API collection](#postman-API-Collection)
## Prerequisites

Before running the application, ensure that you have the following installed on your system:

- Node.js (https://nodejs.org)
- MongoDB (https://www.mongodb.com)
- npm (Node Package Manager, comes bundled with Node.js)

## Installation

1. Clone the GitHub repository:

```bash
git clone https://github.com/your-username/blog-post-api.git
```

2. Navigate to the project directory:

```bash
cd enverx-be-developer-assignment
```

3. Install the required npm packages:

```bash
npm install
```

## Usage

1. Run the Node.js application:

```bash
npm start
```

The application will start on the default port (3000). You can access the API at http://localhost:3000.

BASE_URL: http://localhost:3000/api
## API Endpoints

### Get All Blog Posts

- URL: `GET /posts`
- Description: Retrieves all blog posts from the database, with optional sorting and filtering options based on `sortBy` (createdDate, name) and `category`.
- Response: JSON array containing the blog posts.

### Get a Specific Blog Post by ID

- URL: `GET /posts/:id`
- Description: Retrieves a specific blog post by its unique ID.
- Response: JSON object containing the blog post details, or an error message if the post is not found.

### Create a New Blog Post

- URL: `POST /posts`
- Description: Creates a new blog post with the provided data.
- Request Body: JSON object containing the `name`, `description`, and `category` of the new blog post.
- Response: JSON object containing the newly created blog post details, or an error message if the data is invalid.

### Update an Existing Blog Post

- URL: `PUT /posts/:id`
- Description: Updates an existing blog post with the provided data.
- Request Body: JSON object containing the fields (`title`, `content`, and/or `category`) to be updated.
- Response: JSON object containing the updated blog post details, or an error message if the post is not found or the data is invalid.

### Delete a Blog Post

- URL: `DELETE /posts/:id`
- Description: Deletes a blog post with the provided ID.
- Response: JSON object containing a success message if the post is deleted successfully, or an error message if the post is not found.

## Error Handling

- In case of any errors during the API endpoints' execution, appropriate error messages with HTTP status codes will be returned.
- For server-related errors, a generic "Something went wrong!" message with a status code of 500 will be returned.

## Error Codes

- 200: Success (GET request returns data successfully).
- 201: Created (POST request creates a new resource successfully).
- 400: Bad Request (Client sent an invalid request).
- 404: Not Found (Resource not found).
- 500: Internal Server Error (An unexpected error occurred on the server).

## postman-API-Collection
- Postman collection conatins sample endpoints with response.
- Download the postman collection from the repository.
- Import the collection in your postman.