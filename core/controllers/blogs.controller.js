const Controller = require("./controller");
const BlogService = require("../services/blog-service");
const { logger} = require('../lib/log')

class BlogsController extends Controller {

    async get_blogs(req, res, next) {
        logger.info('BlogsController -> get_blogs -> started');
        try {
            const input = req.query;
            const bs = new BlogService();
            const result = await bs.get_blogs(input);
            this.send_response(res, "success", result);
        } catch (e) {
            this.handle_error_response(error, res, next);
        }
    }

    async create_blog(req, res, next) {
        try {
            const input = req.body;
            const bs = new BlogService();
            const result = await bs.create_blog(input);
            this.send_response(res, "success", result);
        } catch (error) {
            this.handle_error_response(error, res, next);
        }
    }

    async get_blog_by_id(req, res, next) {
        try {
            const id = req.params.id;
            const bs = new BlogService();
            const result = await bs.get_post_by_id(id);
            this.send_response(res, "success", result);
        } catch (error) {
            this.handle_error_response(error, res, next);
        }
    }

    async delete_blog_by_id(req, res, next) {
        try {
            const id = req.params.id;
            const bs = new BlogService();
            await bs.delete_blog_by_id(id);
            this.send_response(res, "success");
        } catch (error) {
            this.handle_error_response(error, res, next);
        }
    }

    async update_blog_by_id(req, res, next) {
        try {
            const id = req.params.id;
            const bs = new BlogService();
            const response = await bs.update_blog_by_id(id, req.body);
            this.send_response(res, "success", response);
        } catch (error) {
            this.handle_error_response(error, res, next);
        }
    }
}

module.exports = BlogsController;
