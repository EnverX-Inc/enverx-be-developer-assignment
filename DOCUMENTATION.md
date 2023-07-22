## The API is hosted on render.com. It is deployed and can be accessed by the following link:

[https://abhigurjeet-nodejsassignment.onrender.com](https://abhigurjeet-nodejsassignment.onrender.com)

The above link would be the root endpoint '/'. Download [JSON viewer pro](https://chrome.google.com/webstore/detail/json-viewer-pro/eifflpmocdbdmepbjaopkkhbfmdgijcc) extension for better experience to view json format.
<br>
<br>
<br>
<br>
<br>
<br>

## Following are the endpoints which are accessible for this API.


- ### `GET /posts` - Get all blog posts.
  
[Optional] Query Parameters -  

1.- sortPostsBy - valid values -> category, createDate, author, blogName

2.- order - valid values -> 1 (for ascending), 2 (for descedning) 

Example - endpoint - '/posts?sortPostsBy=blogName&order=1'
![image](https://github.com/abhigurjeet/enverx-be-developer-assignment/assets/38328775/049202c7-af58-4113-8ed4-bafeff1c25f5)

<br>
<br>

- ### `GET /posts/:id` - Get a specific blog post by ID.

You can copy id from 'GET /posts' endpoint and paste it in the url to open a particular post.
Example  - endpoint - '/posts/'
![image](https://github.com/abhigurjeet/enverx-be-developer-assignment/assets/38328775/5ae8e4ee-9a3c-4bd6-b871-e6fdcf065f53)
<br>
<br>

## For mutations you can use below endpoints and postman for testing
- ### `POST /posts` - Create a new blog post.

__Required - Object__ which should be passed in the body of the request.

It should include the following key value pairs which are mandatory.

 __blogName: { type: String},__
  
 __category: { type: String},__
  
  __author: { type: String},__

  Example:
  ![image](https://github.com/abhigurjeet/enverx-be-developer-assignment/assets/38328775/81f8c7ac-3231-4570-868a-c384c949e36c)

<br>
<br>

- ### `PUT /posts/:id` - Update an existing blog post.

 __Required - Object__ which should be passed in the body of the request.

It can include the following key value pairs which are optional:

 __blogName: { type: String},__
  
 __category: { type: String},__
  
  __author: { type: String},__

Example:
![image](https://github.com/abhigurjeet/enverx-be-developer-assignment/assets/38328775/94cd08d5-6f5f-44b0-ba6e-2ef57076738a)

<br>
<br>

- ### `DELETE /posts/:id` - Delete a blog post.
  
This method simply deletes the blog who id is taken from request parameters and the record is deleted from database.

You just need a valid id to delete a post (Can be copied from '/posts' endpoint).

![image](https://github.com/abhigurjeet/enverx-be-developer-assignment/assets/38328775/cc65f093-fa77-4036-a8d5-72b57d74596e)

<br>
<br>


# Setup steps to run this API locally:

1. Clone the repository to your system.

2. Run - __npm install__ in your terminal to install the required dependecies.

3. Create a __.env__ file which will store the url of the database (Follow mongoDB official website to setup mongoDb locally or you can use their cloud services such as ATLAS).

   The file will contain a single line : __DATABASE_URL= Insert your database url here__.

4. Now run __nodemon index.js__ or __node index.js__ to start the server and you can test the API.
