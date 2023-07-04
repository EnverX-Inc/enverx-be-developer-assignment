import  express, { response }  from "express"
import { connectDB } from "../models/database"


export const getAllPosts = async (request:express.Request, response:express.Response) => {
    let query = `SELECT * FROM posts`
    let sort_by = request.query.sort_by
    let filter_by:number | undefined = Number(request.query.category)
    let db = connectDB()

    let getAllCallback = (b: boolean) => {
        if(b)
        {
            console.log("Query : ",query)
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
        }
    } 
    if(filter_by){
        // does cat exist
        await db.get(`SELECT * FROM categories WHERE category_id = ${filter_by}`,[],function(err: any, row: any){
            if(row){
                query = query.concat(` where category_id=${filter_by}`)
                if(sort_by){
                    if(sort_by === 'date'){
                        query = query.concat(` ORDER BY created_date asc`)
                    }else if(sort_by === 'name'){
                        // console.log("sortt name")
                        query = query.concat(` ORDER BY title asc`)
                    }else{
                        console.error('invalid sort by type')
                        // throw new Error("Invalid sort by type. Choose from (name, date)")
                    }
                }
                getAllCallback(true)
            }else{
                console.error('category not found !')
                    response.status(412).json({msg: 'Category not valid'})
            } 
        })
        }else{
            getAllCallback(true)
        }        
        
    db.close()
}

export const getPost = (request:express.Request, response:express.Response) => {
    let query = `SELECT * FROM posts
           WHERE post_id  = ?`;
    let db = connectDB()
    try{
        let id = request.params.id
        db.get(query,[id], (err: any, row: object) => {
            if(err){
                console.error('db error')
            }
            if(row)
            response.status(200).json(row)
            else{
            response.status(404).json({msg: 'Post not found'})
            }
        })
    }catch(err: any){
    }finally{
        db.close()
    }
}

export const newPost = (request:express.Request, response:express.Response) => {
    let query = `INSERT INTO posts(title, content, category_id) VALUES (?, ?, ?)`
    let db = connectDB()
    try{
        let values = [request.body.title, request.body.content, request.body.category_id]

        db.run(query, values, function(err:any){
            if(err){
                console.error(err)
                response.status(412).json({msg:" error while inserting post"})
            }else{
                response.status(201).json({msg:" inserted post"})
            }
        })
    }
    catch(err: any){
    }
    finally{
        db.close()
    }

}

export const updatePost = (request:express.Request, response:express.Response) => {
    let db = connectDB()
    let id = request.params.id
    let callBack = (title: any, content: any) => {
        let query = `UPDATE posts SET title=(?), content=(?)
               WHERE post_id  = (?)`;
        db.get(query,[request.body.title || title, request.body.content || content, id], (err: any, row: object) => {
            if(err){
                console.error(err)
                response.status(400).json({msg: "updatation failed"})
            }else[
                response.status(200).json(row)
            ]
        })
    }
    db.get(`SELECT * FROM posts where post_id=${id}`,[] ,function(err: any, row: any){
        if(err){
            console.error('Updating error')
        }
        callBack(row.title,row.content)
    })

    db.close()
}

export const deletePost = (request:express.Request, response:express.Response) => {
    let query = `DELETE FROM posts
           WHERE post_id  = ?`;
    let db = connectDB()
        let id = request.params.id
        db.get(query,[id], (err: any, row: object) => {
            if(err){
                console.error(err)
                response.status(404).json({msg: "deletion failed"})
            }else{
                response.status(200).json({msg: "deleted."})
            }
        })
        db.close()
}
