import "reflect-metadata"
import { DataSource } from "typeorm"
import { Post } from "./entity/Posts"
import config from "./config/config"

export const AppDataSource = new DataSource({
    type: "mongodb",
    database:"posts",
    url: config.DB_URL,
    useNewUrlParser: true,
    synchronize: false,
    logging: true,
    useUnifiedTopology: true,
    entities: [Post],
    migrations: [],
    subscribers: [],
})

export const connectDatabase = async () => {

    const connection = await AppDataSource.initialize()
  
    return connection;
  };
