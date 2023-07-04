const sqlite3 = require('sqlite3').verbose();

export const connectDB = () => {
    
    let db = new sqlite3.Database('./db/data.db', (err:Error) => {
        if (err) {
          console.error(err.message);
        }
        console.log('Connected to the sqlite3 database.');
      });
    return db

}

export const createPostsTable = () => {
    let db = new sqlite3.Database('./db/data.db', (err:Error) => {
        if (err) {
          console.error(err.message);
        }
        console.log('Connected to the sqlite3 database and creating posts table.');
        let query: string = `CREATE TABLE posts (
            post_id INTEGER,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            category_id INTEGER,
            created_date TEXT NOT NULL,
            PRIMARY KEY (post_id),
            FOREIGN KEY (category_id) 
            REFERENCES categories (category_id)
            ON DELETE SET NULL
            ON UPDATE NO ACTION
        )`

        db.run(query, function(err:any){
            if(err){
                console.log(err)
            }
            console.log("Posts table created")
            db.close()
        })
      });
}

export const createCategoryTable = () => {
    let db = new sqlite3.Database('./db/data.db', (err:Error) => {
        if (err) {
          console.error(err.message);
        }
        console.log('Connected to the sqlite3 database and creating categories table.');
        
        let query: string = `CREATE TABLE categories (
            category_id INTEGER PRIMARY KEY UNIQUE,
            category_name TEXT NOT NULL
        )`

        db.run(query, function(err:any){
            if(err){
                console.log(err)
            }
            console.log("Categories table created")
            db.close()
        })
      });
}