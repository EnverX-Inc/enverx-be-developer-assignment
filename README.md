# How to Run #
-> used `node version 18.14.2`
1. setup .env help with env_sample (else I allready give my .env file)
2. set up mongodb conection link (i use mongodb atlas)
3. for run server `npm start`
    for development run `npm run dev`
4. your server start on `8000` or `8001`


### All APIs (if you use port 8000)
# `POST /posts` - Create a new blog post.
=> `http://localhost:8000/posts`
- JSON body 
`{
  "title":"Fist Blog",
  "id":1,
  "description":"Needed feebly dining oh talked wisdom oppose at. Applauded use attempted strangers now are middleton concluded had. It is tried no added purse shall no on truth.",
  "category": ["data","scince","a","b"]
}`



# `GET /posts` - Get all blog posts (you can: Apply sorting based on created Date, blog name and filters based on category).
Ex. => `http://localhost:8000/posts` 

=>sort by Blogname and create date 
- `http://localhost:8001/posts?sortBy=blogName`
-`http://localhost:8001/posts?sortBy=createdDate`

=>filters EX. filters by 'a', filters 'science'
- `http://localhost:8001/posts?filterByCategory=science`

=>sort by Blogname AND filters by 'science'
- `http://localhost:8001/posts?sortBy=blogName&filterByCategory=science`



# `GET /posts/:id` Get By Id
- `http://localhost:8000/posts/1` Get blog details By Id




# `DELETE /posts/:id` - Delete a blog post.
- `http://localhost:8000/posts/1` delete by it's id




# `PUT /posts/:id` - Update an existing blog post.
- `http://localhost:8000/posts/1`
- JSON body (which fild you want to update)
`{
  "title":"updated Tital",
  "description" : "hellow this description is updated"
}`