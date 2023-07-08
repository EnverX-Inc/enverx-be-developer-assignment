# Blog API Documentation

The Blog API allows you to manage blog posts with features such as creating, retrieving, updating, and deleting blog posts. This documentation provides information on how to set up and use the API effectively.

## Table of Contents

1. [API Base URL](#api-base-url)
2. [Authentication](#authentication)
3. [MongoDB Setup](#mongodb-setup)
4. [Endpoints](#endpoints)
   - [Get All Blogs](#get-all-blogs)
   - [Get Blog by ID](#get-blog-by-id)
   - [Create a Blog](#create-a-blog)
   - [Update a Blog](#update-a-blog)
   - [Delete a Blog](#delete-a-blog)

## API Base URL

The base URL for the API is: `http://localhost:8081/`

Make sure to replace `http://localhost:8081/` with the corresponding routes 

Eg:- `http://localhost:8081/blogs/posts`

## Authentication

The API does not require authentication at this time. All endpoints are publicly accessible.

## MongoDB Setup

Before using the API, you need to set up a MongoDB database. Follow these steps to get started:

1. Install MongoDB: If you haven't already, download and install MongoDB from the official website (https://www.mongodb.com) based on your operating system.

2. Start MongoDB: Start the MongoDB server by running the appropriate command based on your installation and operating system.

3. Connect to MongoDB: Connect to the MongoDB database by running the following command in your terminal or command prompt:

mongosh

4. Create a Database: Create a new database for the Blog API by running the following command in the MongoDB shell:

use BlogDB
    
Replace `Anandhu` with your desired database name.

5. Create a Collection: Create a collection named `blogs` within the `BlogDB` database by running the following command in the MongoDB shell:

db.createCollection("blogs")
   
This collection will store the blog posts.

6. Configure Connection String: In the API code, set the environment variable `CONNECTION_STRING` to your MongoDB connection string. For example:

CONNECTION_STRING=mongodb://localhost:27017/BlogDB

Replace `BlogDB` with your actual database name.

Now you're ready to use the Blog API!

## Installation

To install the necessary dependencies for the Blog API, follow these steps:

1. Open a terminal or command prompt.

2. Navigate to the project directory.

3. Run the following command to install the required dependencies:

npm install


This command will download and install all the dependencies listed in the `package.json` file.

## Running the API

To run the Blog API, follow these steps:

1. Ensure that the MongoDB server is running.

2. Open a terminal or command prompt.

3. Navigate to the project directory.

4. Run the following command to start the API:

npm start

This command will start the API server, and you should see a message indicating that the server is running on a specific port (e.g., `Server is running on port 8081`).

5. You can now access the API endpoints using the specified base URL (`http://localhost:8081/`) and the available routes.

## Endpoints

### Get All Blogs

Retrieve a list of all blog posts.

- **URL:** `/blogs`
- **Method:** `GET`
- **Query Parameters:**
  - `sortBy` (optional): Sort the blogs by a specific field. Valid values are `publishedAt`, `-publishedAt`, `category`, `-category`, `title`, or `-title`. The minus sign (`-`) before the field name indicates descending order.
- **Response:**
  - Status Code: 200 (OK)
  - Body: Array of blog posts in the response payload.

### Get Blog by ID

Retrieve a specific blog post by its ID.

- **URL:** `/blogs/:id`
- **Method:** `GET`
- **Parameters:**
  - `id`: The ID of the blog post.
- **Response:**
  - Status Code: 200 (OK)
  - Body: JSON object containing the blog post details.

### Create a Blog

Create a new blog post.

- **URL:** `/blogs`
- **Method:** `POST`
- **Request Body:**
  - `email`: (required) Email of the author.
  - `title`: (required) Title of the blog post.
  - `author_name`: (required) Name of the author.
  - `twitterHandle`: (optional) Twitter handle of the author.
  - `image`: (optional) URL of the blog post image.
  - `content`: (optional) Content of the blog post.
  - `category`: (optional) Category of the blog post. Valid values are `Technology`, `Travel`, `Food`, `Fashion`, `Health`, `Lifestyle`, or `Other`. Default is `Other`.
- **Response:**
  - Status Code: 201 (Created)
  - Body: JSON object containing the newly created blog post details.

### Update a Blog

Update an existing blog post.

- **URL:** `/blogs/:id`
- **Method:** `PUT`
- **Parameters:**
  - `id`: The ID of the blog post.
- **Request Body:**
  - Same as the request body for creating a blog post or the required as per the model. (Moreover kindly check the model for more information.) (see [Create a Blog](#create-a-blog)).
- **Response:**
  - Status Code: 200 (OK)
  - Body: JSON object containing the updated blog post details.

### Delete a Blog

Delete a specific blog post.

- **URL:** `/blogs/:id`
- **Method:** `DELETE`
- **Parameters:**
  - `id`: The ID of the blog post.
- **Response:**
  - Status Code: 200 (OK)
  - Body: JSON object containing the deleted blog post details.

That's all! You now have all of the information you need to set up and utilize the Blog API. Feel free to experiment with the various ends.

If you have any further questions, please don't hesitate to me at anandhu.vikraman007@gmail.com ;-)
