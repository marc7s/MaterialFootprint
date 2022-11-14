import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
dotenv.config({path: __dirname + '../.env'});

import { log } from '@shared/utils';


export function connectToDb() {
    log("Trying to connect to database...")
    const constring = process.env.DB_CONN_STRING;
    log("20%")
    if(!constring) return
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
    db.createCollection("materials");
    log("Successfully initialized database!");
}