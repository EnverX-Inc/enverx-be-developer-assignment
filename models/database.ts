const sqlite3 = require('sqlite3').verbose();

export const connectDB = () => {
    
    let db = new sqlite3.Database('./db/data.db', (err:Error) => {
        if (err) {
          console.error(err.message);
        }
        // console.log('Connected to the sqlite3 database.');
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
            post_id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            category_id INTEGER,
            created_date DATETIME DEFAULT CURRENT_DATE,
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
            category_id INTEGER PRIMARY KEY AUTOINCREMENT,
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

export const insertCategory = (name: string) => {
    let db = new sqlite3.Database('./db/data.db', (err:Error) => {
        if (err) {
          console.error(err.message);
        }
        console.log('inserting categories table.');
        
        let query: string = `INSERT INTO categories(category_name) VALUES (?)`

        db.run(query,[name] ,function(err:any){
            if(err){
                console.log(err)
            }
            console.log("Categories table inserted")
            db.close()
        })
      });
}

export const deletePosts = () => {
    let db = new sqlite3.Database('./db/data.db', (err:Error) => {
        if (err) {
          console.error(err.message);
        }        
        db.run('DROP TABLE posts ' ,function(err:any){
            if(err){
                console.log(err)
            }
            db.close()
        })
      });
}

export const deleteCategories = () => {
    let db = new sqlite3.Database('./db/data.db', (err:Error) => {
        if (err) {
          console.error(err.message);
        }        
        db.run('DROP TABLE categories ' ,function(err:any){
            if(err){
                console.log(err)
            }
            db.close()
        })
      });
}

export const getAll = () => {
    let db = new sqlite3.Database('./db/data.db', (err:Error) => {
        if (err) {
          console.error(err.message);
        }        
        db.all('SELECT * from categories',[] ,function(err:any, rows: any){
            if(err){
                console.log(err)
            }
                rows.forEach((el: any) => console.log(el))
            db.close()
        })
      });
}