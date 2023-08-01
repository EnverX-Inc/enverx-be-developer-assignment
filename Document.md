<!DOCTYPE html>
<html>
<head>
    <title>Blog API - Node.js and Express.js</title>
</head>
<body>
    <h1>Blog API - Node.js and Express.js</h1>
    <p>This repository contains a Node.js and Express.js API for managing blog posts. The API provides CRUD (Create, Read,
        Update, Delete) operations on blog posts and includes sorting and filtering capabilities.</p>
<h2>API Endpoints</h2>
    <h3>Get All Blog Posts</h3>
    <ul>
        <li><strong>Endpoint</strong>: <code>GET /blog/posts</code></li>
        <li><strong>Description</strong>: Get all blog posts.</li>
        <li><strong>Query Parameters</strong>:
            <ul>
                <li><code>sortBy</code> (optional): Sort the blog posts. Possible values: <code>author</code>.</li>
                <li><code>category</code> (optional): Filter blog posts based on the category.</li>
            </ul>
        </li>
        <li>http://localhost:3000/blog/posts?category=Travel blogs&sortBy=title</li>
    </ul>

<h3>Get Blog Posts by Category and Sort by Title</h3>
    <ul>
        <li><strong>Endpoint</strong>: <code>GET /blog/posts</code></li>
        <li><strong>Description</strong>: Get blog posts filtered by category and sorted by title.</li>
        <li><strong>Query Parameters</strong>:
            <ul>
                <li><code>category</code> (required): Filter blog posts based on the category.</li>
                <li><code>sortBy</code> (optional): Sort the blog posts. Possible values: <code>title</code>.</li>
            </ul>
        </li>
    </ul>

 <h3>Get Blog Posts by Category</h3>
    <ul>
        <li><strong>Endpoint</strong>: <code>GET /blog/posts</code></li>
        <li><strong>Description</strong>: Get blog posts filtered by category.</li>
        <li><strong>Query Parameters</strong>:
            <ul>
                <li><code>category</code> (required): Filter blog posts based on the category.</li>
            </ul>
        </li>
        <li>http://localhost:3000/blog/posts?category=Travel blogs</li>
    </ul>

 <h3>Get Blog Posts Sorted by Author</h3>
    <ul>
        <li><strong>Endpoint</strong>: <code>GET /blog/posts</code></li>
        <li><strong>Description</strong>: Get blog posts sorted by author.</li>
        <li><strong>Query Parameters</strong>:
            <ul>
                <li><code>sortBy</code> (optional): Sort the blog posts. Possible values: <code>author</code>.</li>
            </ul>
        </li>
        <li>http://localhost:3000/blog/posts?category=sortBy=author</li>
    </ul>

<h3>Create a New Blog Post</h3>
    <ul>
        <li><strong>Endpoint</strong>: <code>POST /blog/post</code></li>
        <li><strong>Description</strong>: Create a new blog post.</li>
        <li><strong>Request Body</strong>:
            <ul>
                <li><code>title</code> (required): Title of the blog post.</li>
                <li><code>content</code> (required): Content of the blog post.</li>
                <li><code>category</code> (required): Category of the blog post.</li>
                <li><code>author</code> (optional): Author of the blog post.</li>
            </ul>
        </li>
        <li>http://localhost:3000/blog/post</li>
    </ul>

<h3>Get All Blog Posts (Alternative)</h3>
    <ul>
        <li><strong>Endpoint</strong>: <code>GET /blog/get</code></li>
        <li><strong>Description</strong>: Get all blog posts.</li>
        <li>http://localhost:3000/blog/get</li>
    </ul>

<h3>Get a Specific Blog Post by ID</h3>
    <ul>
        <li><strong>Endpoint</strong>: <code>GET /blog/get/:id</code></li>
        <li><strong>Description</strong>: Get a specific blog post by its ID.</li>
        <li>http://localhost:3000/blog/get/:id</li>
    </ul>

 <h3>Update an Existing Blog Post by ID</h3>
    <ul>
        <li><strong>Endpoint</strong>: <code>PUT /blog/update/:id</code></li>
        <li><strong>Description</strong>: Update an existing blog post by its ID.</li>
        <li><strong>Request Body</strong>: Include the fields you want to update. Possible fields: <code>title</code>,
            <code>content</code>, <code>category</code>, <code>author</code>.</li>
        <li>http://localhost:3000/blog/update/:id</li>

</ul>

 <h3>Delete a Blog Post by ID</h3>
    <ul>
        <li><strong>Endpoint</strong>: <code>DELETE /blog/delete/:id</code></li>
        <li><strong>Description</strong>: Delete a blog post by its ID.</li>
        <li>http://localhost:3000/blog/delete/:id</li>
    </ul>

<br/>
    <h1>Setup Steps to Run the Blog API Locally</h1>
    <ol>
        <li>
            <strong>Clone the Repository:</strong>
            <p>Clone the repository to your system.</p>
        </li>
        <li>
            <strong>Install Dependencies:</strong>
            <p>Run <code>npm install</code> in your terminal to install the required dependencies.</p>
        </li>
        <li>
            <strong>Create a .env File:</strong>
            <p>Create a <code>.env</code> file which will store the URL of the database. Follow MongoDB's official website to
                set up MongoDB locally or use their cloud services such as Atlas.</p>
            <p>The file will contain a single line:</p>
            <pre><code>DB_URL=Insert your database URL here.</code></pre>
        </li>
        <li>
            <strong>Start the Server:</strong>
            <p>Run <code>nodemon index.js</code> or <code>node index.js</code> to start the server.</p>
        </li>
        <li>
            <strong>Test the API:</strong>
            <p>Once the server is running, you can test the API using tools like Postman or cURL.</p>
        </li>
    </ol>
    <br/>
     <h2>Contributing</h2>
    <p>Contributions are welcome! If you have any improvements or additional features to add to the API, feel free to
        submit a pull request.</p>

</body>

</html>
