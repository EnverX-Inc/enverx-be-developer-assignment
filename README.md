### How to run this

1. Clone this repo and switch to development branch.
2. Run command "npm i" to install the dependencies.
3. Then run "npm run start" to start the server and server will be start on port 3000.
4. So first register yourself with `POST /users/register-user` API (By name, email and password).
5. And then run login API `POST /users/login-user` with your email and password.
6. In the login API response you will get "token" that will be require in every API call as a Bearer token that needs to send in the Authorization.
7. Then you can create posts by this API - `POST /posts` - Create a new blog post.
8. To update post run `PUT /posts/:id` - Update an existing blog post.
9. To delete blog post run `DELETE /posts/:id` - Delete a blog post.
10. To get a post by id. Run `GET /posts/:id` - Get a specific blog post by ID.
11. To get all posts with filter like searchQuery, pagination and category. Run `GET /posts` - Get all blog posts.


### DEPLOYMENT
- enverx-be-developer-assignment-production.up.railway.app
- api hosted on railway.

- MongoDB used as database