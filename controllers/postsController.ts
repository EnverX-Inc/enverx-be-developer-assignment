import  express, { response }  from "express"
import { connectDB } from "../models/database"

export const getAllPosts = (request:express.Request, response:express.Response) => {
    try {
        let db = connectDB()
        let result: Array<object> = []
        console.log("Getting all posts")
        db.all(`SELECT * FROM posts`,[], function(err:any, rows: Array<object>){
            if(err){
                console.log(err)
                return
            } 
            rows.forEach(element => {
                console.log(element)
                result.push(element)
            });

            response.status(200).json(result)
        })
        db.close()
    }
    catch(err:any){

    }
    finally{
        
    }
}

export const getPost = () => {
//     let sql = `SELECT PlaylistId id,
//                   Name name
//            FROM playlists
//            WHERE PlaylistId  = ?`;
// let playlistId = 1;

// // first row only
// db.get(sql, [playlistId], (err, row) => {
//   if (err) {
//     return console.error(err.message);
//   }
//   return row
//     ? console.log(row.id, row.name)
//     : console.log(`No playlist found with the id ${playlistId}`);

// });

// // close the database connection
// db.close();
}

export const newPost = (request:express.Request, response:express.Response) => {
    let query = `INSERT INTO posts(title, content, category_id) VALUES (?, ?, ?)`
    try{
        let db = connectDB()
        console.log('adding a new post')
        let values = [request.body.title, request.body.content, request.body.category_id]

        db.run(query,values, function(err:any){
            if(err){
                console.log(err)
                return
            }
            console.log("inserted post")
            db.close()
        })
    }
    catch(err: any){
        throw err
    }
    finally{
        response.json({"hey":"gg"})
    }

}

export const updatePost = () => {

}

export const deletePost = () => {

}
