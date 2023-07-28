let expect = require("chai").expect;
//const chai = require('chai-http')
const nock = require("nock");
const app = require("../../index");
const Post = require("../../core/schemas/blogsSchema");
const test_data = require("./../test-db/post.json");
const { load_data } = require("../test-db/test-db-helper");

describe("Blogs APIS", () => {
  let req_body = {};
  let id1,
    id2,
    id3 = null;

  it("should load sample data", async () => {
    await load_data(test_data);
    const data = await Post.find();
    id1 = data[0]._id.valueOf();
    id2 = data[1]._id.valueOf();
    id3 = data[2]._id.valueOf();
  });

  describe("GET /posts/:id", async () => {
    it("should return 404 when id not present", async () => {
      let req_url = "/api/v1/post/64c15a02a104d3f53c1";

      const response = await chai.request(app).get(req_url);

      expect(response.statusCode).to.equal(404);
      response.body.should.have.property("error_message");
      expect(response.body.error_message).to.equal(
        "Post not found for id 64c15a02a104d3f53c1"
      );
    });

    it("should return 200 when id present", async () => {
      let req_url = `/api/v1/post/${id1}`;

      const response = await chai.request(app).get(req_url);

      expect(response.statusCode).to.equal(200);
      response.body.should.have.property("name");
      response.body.should.have.property("category");
      response.body.should.have.property("content");
      expect(response.body.name).to.equal("sports blogs");
      expect(response.body.category).to.equal("sports");
    });
  });

  describe("DELETE /posts/:id", async () => {
    it("should return 404 when id not present", async () => {
      let req_url = "/api/v1/post/64c15a02a104d3f53c1";

      const response = await chai.request(app).delete(req_url);

      expect(response.statusCode).to.equal(404);
      response.body.should.have.property("error_message");
      expect(response.body.error_message).to.equal(
        "Post not found for id 64c15a02a104d3f53c1"
      );
    });

    it("should return 200 when id present", async () => {
      let req_url = `/api/v1/post/${id2}`;

      const response = await chai.request(app).delete(req_url);

      expect(response.statusCode).to.equal(200);
      expect(response.body.message).to.equal("Success");
    });
  });

  describe("UPDATE /posts/:id", async () => {
    it("should return 404 when id not present", async () => {
      let req_url = "/api/v1/post/64c15a02a104d3f53c1";

      const response = await chai.request(app).put(req_url).send(req_body);

      expect(response.statusCode).to.equal(404);
      response.body.should.have.property("error_message");
      expect(response.body.error_message).to.equal(
        "Post not found for id 64c15a02a104d3f53c1"
      );
    });

    it("should return 200 when id present", async () => {
      let req_url = `/api/v1/post/${id3}`;

      const req_body = {
        category: "movies",
      };

      const response = await chai.request(app).put(req_url).send(req_body);

      expect(response.statusCode).to.equal(200);
      expect(response.body.category).to.equal("movies");
    });
  });

  describe("POST /post", async () => {
    it("should return 400 when validation failed", async () => {
      let req_url = "/api/v1/post";

      let req_body = {
        category: {
          wrong: "field",
        },
      };

      const response = await chai.request(app).post(req_url).send(req_body);

      expect(response.statusCode).to.equal(400);
      response.body.should.have.property("error_message");
      expect(response.body.error_code).to.equal("MISSING_FIELDS");
    });

    it("should return 200 when correct fields provided", async () => {
      let req_url = "/api/v1/post";

      const req_body = {
        name: "naman",
        category: "movies",
        content: "yxzz",
      };

      const response = await chai.request(app).post(req_url).send(req_body);

      expect(response.statusCode).to.equal(200);
      response.body.should.have.property("name");
      response.body.should.have.property("category");
      response.body.should.have.property("content");
    });
  });

  describe("GET /posts", async () => {
    it("should return 200 sorted by date ,name if no category provided", async () => {
      let req_url = "/api/v1/posts";

      const response = await chai.request(app).get(req_url);

      expect(response.statusCode).to.equal(200);
      expect(response.body).to.be.an("array");
    });

    it("should return 200 sorted by date ,name and filtered by provided category", async () => {
      let req_url = "/api/v1/posts?category=sports";

      const response = await chai.request(app).get(req_url);

      expect(response.statusCode).to.equal(200);
      expect(response.body).to.be.an("array");
      expect(response.body[0].category).to.equal("sports");
    });
  });
});
