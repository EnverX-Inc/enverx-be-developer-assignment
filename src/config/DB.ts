import mongoose from "mongoose";
const DbConnection = async () => {
    try{
        const connect = await mongoose.connect(process.env.CONNECTION_STRING as string);
        console.log(
            "Database Connected: ",
            connect.connection.host,
            connect.connection.name
        );
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};
export default DbConnection