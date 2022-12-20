import * as dotenv from "dotenv";
dotenv.config({path: __dirname + '/../.env'});

/* Utils */
import { DatabaseConnectionError } from "server/errors";
import mongoose from 'mongoose';

/* Shared */
import { log } from '@shared/utils';


export async function connectToDb(): Promise<void> {
    // Get the connection string from the environment variables
    const connstring: string | undefined = process.env.DB_CONN_STRING;
    if(!connstring)
        throw new DatabaseConnectionError("Database connection string not found");
    
    // strictQuery will be set to false in Mongoose 7, so this needs to be added
    // to prepare and avoid deprecation warnings
    mongoose.set('strictQuery', false);
    
    // Connect to the database
    await mongoose.connect(connstring, {
        // 5 second timeout
        serverSelectionTimeoutMS: 5000 
      })
        .catch(err => {
            throw new DatabaseConnectionError("Could not connect to database: " + err);
    });

    log("Successfully connected to database!");
}

