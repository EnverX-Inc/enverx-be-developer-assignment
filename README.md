Have MYSQL >=14 and node>=16 installed

To run the project:
npm i
npm start

SET three env variables before starting project:
DB_NAME:database name of local MySQL
DB_USER:user of local MYSQL
DB_PASSWORD: password of local MYSQL

Five APIs are:
 Get all posts: GET request
 localhost:3000/api/posts

 Get post by id: GET request
  localhost:3000/api/posts/:id

  create post: POST request
   localhost:3000/api/posts
   Eg. Req. Body will be: {
       {
    "blogName":"First Blog",
    "blogContent":"This is the first blog",
    "category":"car"
}
   }

   update post: PUT request 

  localhost:3000/api/posts/:id
   Eg. Req. Body will be: {
       {
    "blogName":"First Blog",
    "blogContent":"This is the first blog",
    "category":"car"
}
   }

   no need to update all the fields at once
  
  Delete Post: 
  localhost:3000/api/posts/:id