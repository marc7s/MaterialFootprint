import 'module-alias/register';
import * as dotenv from "dotenv";
dotenv.config({path: __dirname + '/../.env'});
import { connectToDb, init } from "../../api/server/db";
import { DatabaseConnectionError } from '../server/errors';




const db = connectToDb();
if(db instanceof DatabaseConnectionError) {
    throw new DatabaseConnectionError();
} else {
    init(db);
}


