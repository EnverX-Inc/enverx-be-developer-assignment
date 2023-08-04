# Simple Blog Application RESTful API

This is a simple blog application RESTful API built with Node.js, Express.js, TypeScript, and MongoDB. The API allows you to perform CRUD operations on blog posts and store them in a MongoDB database.

## Getting Started

Follow these steps to set up and run the API on your local machine:

1. **Prerequisites**:
   - Node.js (https://nodejs.org)
   - MongoDB (https://www.mongodb.com)

2. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/simple-blog-api.git

3. **Change Branch**
    ```bash
    git checkout development
4. **Install Dependencies**
    ```bash
   npm install

5. **Set Up MongoDB Connection**

    Ensure you have MongoDB installed and running on your local machine or have a remote MongoDB connection URL ready.
    
    Update the MongoDB connection URL in src/.env.
    
    Replace 'mongodb://localhost:27017/mycontacts_db' with your actual MongoDB connection URL.

6. **Define PORT**

    Define PORT value in src/server.ts.

7. **Run Application**

    ```bash
    npm start

The application will start running on the mentioned PORT or 8000(default port)


8. **API ENDPOINTS**

#
Base Route:- /v1/api
#

GET /posts/?sortBy="<title or createdAt>"&&category="<categoryName>" - Get all blog posts. 
    Note: CreatedAt is latest first and name is in ascending

GET /posts/:id - Get a specific blog post by ID.

PUT /posts/:id - Update an existing blog post.

DELETE /posts/:id - Delete a blog post.

POST /posts/ - Create a new blog post. 

#
Example POST/PUT request body.
```bash
{       
        "author": "author_name",
        "title": "blog_title",
        "content": "blog_description",
        "category": "blog_category"
}