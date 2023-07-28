const mongoose = require("mongoose");
const Post = require("../../core/schemas/blogsSchema");
const test_data = require("./post.json");

// Function to connect to the test database

async function connect_db() {
  const MONGODB_TEST_URI = "mongodb://localhost:27017/blog_test"; // Test database connection string
  await mongoose.connect(MONGODB_TEST_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: 10,
  });
}

async function close_db(){
    await mongoose.connection.close();
}

async function clear_data(){
    const collections = mongoose.connection.collections;
    for(let key in collections){
        await collections[key].deleteMany();
    }
}

async function load_data(test_data){
    await Post.insertMany(test_data);
}


module.exports = {
    connect_db,
    close_db,
    clear_data,
    load_data
}
