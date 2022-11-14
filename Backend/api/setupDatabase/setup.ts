import 'module-alias/register';
import * as dotenv from "dotenv";
dotenv.config({path: __dirname + '/../.env'});
import { connectToDb, init } from "../../api/server/db";




const db = connectToDb();
if(db instanceof Error) {
    throw new Error("Error connecting to database");
} else {
    init(db);
}


