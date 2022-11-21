import * as dotenv from "dotenv";
dotenv.config({path: __dirname + '/../.env'});
import { log } from '@shared/utils';
import { DatabaseConnectionError } from "./errors";
import mongoose from 'mongoose';

export async function connectToDb(): Promise<void> {
    const constring: string | undefined = process.env.DB_CONN_STRING;
    if(!constring) {
        log("database connection string not found");
        throw new DatabaseConnectionError();
    }
    const validConString: string = constring ?? "";

    await mongoose.connect(validConString)
        .catch((err) => {
            log("Could not connect to database using mongoose.connect");
            throw new DatabaseConnectionError(); 
    });

    log("Successfully connected to database!");
}

