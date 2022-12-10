import * as dotenv from "dotenv";
dotenv.config({path: __dirname + '/../.env'});

/* Utils */
import { DatabaseConnectionError } from "server/errors";
import mongoose from 'mongoose';

/* Shared */
import { log } from '@shared/utils';


export async function connectToDb(): Promise<void> {
    const constring: string | undefined = process.env.DB_CONN_STRING;
    if(!constring) {
        log("database connection string not found");
        throw new DatabaseConnectionError();
    }
    
    // strictQuery will be set to false in Mongoose 7, so this needs to be added
    // to prepare and avoid deprecation warnings
    mongoose.set('strictQuery', false);
    
    await mongoose.connect(constring, {
        // 5 second timeout
        serverSelectionTimeoutMS: 5000 
      })
        .catch(err => {
            throw new DatabaseConnectionError(); 
    });

    log("Successfully connected to database!");
}

