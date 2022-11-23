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
    const validConString: string = constring ?? "";

    await mongoose.connect(validConString)
        .catch((err) => {
            throw new DatabaseConnectionError(); 
    });

    log("Successfully connected to database!");
}

