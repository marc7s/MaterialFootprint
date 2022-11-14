import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
dotenv.config({path: __dirname + '/../.env'});

import { log } from '@shared/utils';
import { DatabaseConnectionError } from "./errors";


export function connectToDb(): mongoDB.Db | DatabaseConnectionError {
    log("Trying to connect to database...")
    const constring = process.env.DB_CONN_STRING;
    log("20%")
    if(!constring) return new DatabaseConnectionError();
    log("40%")
    const client = new mongoDB.MongoClient(constring);
    log("60%")
    client.connect();
    log("80%")
    const db = client.db(process.env.DB_NAME);
    log("Successfully connected to database!");
    return db;
}

export function init(db: mongoDB.Db) {
    log("Initializing database...");
    db.dropDatabase();
    db.createCollection("materials");
    log("Successfully initialized database!");
}