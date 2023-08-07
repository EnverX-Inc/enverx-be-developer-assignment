import { Request, Response, NextFunction } from "express";
import { Post } from "../entity/Posts";
import Dayjs from "dayjs"
import { DataSource } from "typeorm";
import config from "../config/config";
import { connectDatabase } from "../data-source";

const coDB = connectDatabase()

const connect = new DataSource({
    type: "mongodb",
    url: config.DB_URL,
    database: "posts",
    useNewUrlParser: true,
    synchronize: false,
    logging: true,
    useUnifiedTopology: true,
    entities: [Post],
    migrations: [],
    subscribers: [],
});


const getPosts = async (req: Request, res: Response, next: NextFunction) => {

    const postRepo = (await coDB).getMongoRepository(Post)
    let posts = await postRepo.find();

    posts = posts.sort()

    if (posts.length == 0) {
        return res.status(404).send({
            status: 404,
            message: 'Either repository is empty or not found',
            Blogs: []
        });
    } else {
        return res.status(200).send({
            status: 200,
            message: 'Blogs fetched',
            Blogs: posts
        });
    }




};



async function getPost(req: Request, res: Response, next: NextFunction) {

    let id = req.params.id
    const postRepo = (await coDB).getMongoRepository(Post)

    let queryid = id.toString()

    if (id != null) {

        let post = await postRepo.find({
                where: {
                    B_id: queryid
                }
            })

        if (post != null) {
            return res.status(200).send({
                status: 200,
                message: 'Blog fetched',
                Blog: post
            });
        } else {
            return res.status(404).send({
                status: 404,
                message: 'Blog not found. Kindly try with valid Blog ID',
                Blog: []
            });
        }

    } else {
        return res.status(400).send({
            status: 400,
            message: 'Blog not found Kindly provide valid Blog ID',
            Blog: []
        });
    }



}


async function createPost(req: Request, res: Response, next: NextFunction) {

    var blogTitle = req.body.blogTitle
    var caption = req.body.caption
    var content = req.body.content
    const date = Dayjs().format('YYYY-MM-DD HH:mm:ss.SSS+ss')

    const postRepo = (await coDB).getMongoRepository(Post)
    let posts = await postRepo.find();

    let id: any
    let newID : number

    posts = posts.sort()

    if (posts.length == 0) {
        id = 0

    } else {
        let posLength = posts.length

        id = posts[posLength - 1].B_id
        newID = +id
        newID = newID+1
    }
    if (blogTitle == null || blogTitle == '' || blogTitle == undefined || content == null || content == '' || content == undefined) {

        res.status(400).send({
            status: "400",
            message: "Data Entered is wrong",
            Blog: []


        });
    } else {

        let post1 = await postRepo.findOne({ where: { blogTitle: blogTitle } })

        if (post1 == null) {
            let post1 = new Post()
            post1.B_id = newID
            post1.blogTitle = blogTitle
            post1.blogContent = content
            post1.Caption = caption
            post1.createdAt = date
            post1.updatedAt = ""

            await (await coDB).manager.save(post1)

            return res.status(200).send({
                status: 200,
                message: 'Blog created successfully',
                Blog: post1
            });
        } else {
            return res.status(500).send({
                status: 500,
                message: 'Internal server Kindly bear with us we will get back to you shortly',
                Blog: []
            });

        }


    }






}

async function updatePost(req: Request, res: Response, next: NextFunction) {

    let B_id = req.params.id
    let queryId = B_id.toString() 

    var blogTitle = req.body.blogTitle
    var caption = req.body.caption
    var content = req.body.content
    const date = Dayjs().format('YYYY-MM-DD HH:mm:ss.SSS+ss')

    const postRepo = (await coDB).getMongoRepository(Post)
    const query = { B_id: B_id };

    let post = await postRepo.find({ where: { B_id: queryId } });
    console.log(post)
    let postUpdate = post[0]

    if (postUpdate == null) {
        return res.status(404).send({
            status: 404,
            message: 'Please provide valid Blog ID',
            Blog: []
        });
    } else {
        if (blogTitle != null || blogTitle != '' || blogTitle != undefined) {
            postUpdate.blogTitle = blogTitle
        } else {
            postUpdate.blogTitle = postUpdate.blogTitle
        }
        if (caption != null || caption != '' || caption != undefined) {
            postUpdate.Caption = caption
        } else {
            postUpdate.Caption = postUpdate.Caption
        }
        if (content != null || content != '' || content != undefined) {
            postUpdate.blogContent = content
        } else {
            postUpdate.blogContent = postUpdate.blogContent
        }
        postUpdate.updatedAt = date

        await postRepo.save(postUpdate)

        return res.status(200).send({
            status: 200,
            message: 'Blog updated successfully.',
            Blog: post
        });



    }



}










const deletePost = async (req: Request, res: Response, next: NextFunction) => {
    let B_id = req.params.id;
    let queryid = B_id.toString()
    const postRepo = (await coDB).getMongoRepository(Post);
    let post = await postRepo.find({where:{B_id: queryid}})
    if (post != null) {
        await postRepo.remove(post);

        res.status(200).send({
            status: 200,
            message: 'Blog deleted successfully.',
            Blog: []
        })

    }
    else {
        res.status(404).send({
            status: 404,
            message: "No Blog has been found for the given user. Kindly check the given Blog ID.",
            Blog: []
        });
    }

};

export default { getPosts, getPost, createPost, updatePost, deletePost }


