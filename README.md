# RESTFUL API FOR BLOG APPLICATION

This is a simple blog application RESTful API built with Node.js, Express.js, TypeScript, and MongoDB. The API allows you to perform CRUD operations on blog posts and store them in a MongoDB database

**File Structure**:
```
simple-blog-api/
├── app.ts
├── config/
│ └── ... (configuration files)
├── controllers/
│ └── ... (controller files)
├── models/
│ └── ... (model files)
├── routes/
│ └── ... (route files)
├── .env
├── package.json
└── README.md
```
## Getting Started

Follow these steps to set up and run the API on your local machine:

 **Prerequisites**:
   - Node.js (https://nodejs.org)
   - MongoDB (https://www.mongodb.com)


**Change to the Development Branch:**
git checkout development

**Create .env file in root folder**
PORT = 5001
CONNECTION_STRING= MongoDB_URL

**Install Dependencies**
npm install

**Set Up MongoDB Connection:**

Ensure you have MongoDB installed and running on your local machine or have a remote MongoDB connection URL ready.

Update the MongoDB connection URL in src/.env.

Replace 'Connection URL ' with your actual MongoDB connection URL.

Define PORT:

Define the PORT value in src/.env

Run Application:

npm start

The application will start running on the mentioned PORT or 8000 (default port).


API ENDPOINTS:

Base Route: /blogs/

GET /posts/?sortBy="<title or createdAt>"&&category="<categoryName>":
Get all blog posts. Note: createdAt is in latest-first order and title is in ascending order.

GET /posts/:id:
Get a specific blog post by ID.

PUT /posts/:id:
Update an existing blog post.

DELETE /posts/:id:
Delete a blog post.

POST /posts/:
Create a new blog post.

Example POST/PUT request body:
```
{
    "author": "author_name",
    "title": "blog_title", // minLength= 5, maxLength=100
    "content": "blog_description", // minLength = 50
    "category": "blog_category" // "Technology", "Travel", "Food", "Lifestyle", "Other"
}
```

### BY : Ashray Jha
