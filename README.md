### STEPS TO SETUP AND USE API

1. Clone the repo
2. Run `npm insall` command to install all the dependencies
3. Create config.env file in root folder i.e, inside main folder and add the following data
   a. NODE_ENV = development
   b. PORT = 8000
   c. DATABASE = ADD_YOUR_OWN_MONGODB_CLUSTER_CONNECTION_STRING
   d. DATABASE_PASSWORD = ADD_ITS_PASSWORD
4. To run the server run (node server.js / npm start)
5. Now everything is done and ready to go.

### ROUTES

GET (Find all available blogs) http://localhost:8000/api/v1/blogs/posts

POST (Post your own blog) http://localhost:8000/api/v1/blogs/posts

GET (Get blog by id) http://localhost:8000/api/v1/blogs/posts/:id

PUT (Update existing blog by id) http://localhost:8000/api/v1/blogs/posts/:id

DELETE (delete blog by id) http://localhost:8000/api/v1/blogs/posts/:id

#

### For any query please reach out to me at shubhashish941@gmail.com/9852224003
