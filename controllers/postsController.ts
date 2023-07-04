import  express, { response }  from "express"
import { connectDB } from "../models/database"

const doesCategoryExist = async (category_id: number) => {
    let db = connectDB()
    return await db.get(`SELECT * FROM categories WHERE category_id = ${category_id}`,[],function(err: any, row: object){
        
        console.log('does exist ah??',row)
        if(row) return true
        return false
    })
    db.close()
}

export const getAllPosts = async (request:express.Request, response:express.Response) => {
    try {
        let query = `SELECT * FROM posts`
        let sort_by = request.query.sort_by
        let filter_by:number | undefined = Number(request.query.category)
        if(filter_by){
            console.log('checking if filter exists')
                // does cat exist
                if(await doesCategoryExist(filter_by)){
                    console.log("worrrk")
                    query = query.concat(` where category_id = ${filter_by}`)
                }
            }
        if(sort_by){
            if(sort_by === 'date'){
                query = query.concat(` ORDER BY created_date asc`)
            }else if(sort_by === 'name'){
                console.log("sortt name")
                query = query.concat(` ORDER BY title asc`)
            }else{
                console.error('invalid sort by type')
            }
        }
        let db = connectDB()
        let result: Array<object> = []
        console.log("Getting all posts", query)
        db.all(query ,[], function(err:any, rows: Array<object>){
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

export const getPost = (request:express.Request, response:express.Response) => {
    let query = `SELECT * FROM posts
           WHERE post_id  = ?`;
    try{
        let db = connectDB()
        let id = request.params.id
        db.get(query,[id], (err: any, row: object) => {
            if(err){
                return console.error(err.message)
            }
            response.status(200).json(row)
        })
        db.close()

    }catch(err: any){
        console.log(err)
    }
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

export const updatePost = (request:express.Request, response:express.Response) => {
    let query = `UPDATE posts SET title=?, content=?
           WHERE post_id  = ?`;
    try{
        let db = connectDB()
        let id = request.params.id
        db.get(query,[id], (err: any, row: object) => {
            if(err){
                return console.error(err.message)
            }
            response.status(200).json(row)
        })
        db.close()

    }catch(err: any){
        console.log(err)
    }
}

export const deletePost = (request:express.Request, response:express.Response) => {
    let query = `DELETE FROM posts
           WHERE post_id  = ?`;
    try{
        let db = connectDB()
        let id = request.params.id
        db.get(query,[id], (err: any, row: object) => {
            if(err){
                return console.error(err.message)
            }
            response.status(200).json(row)
        })
        db.close()

    }catch(err: any){
        console.log(err)
    }
}
