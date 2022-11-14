import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
dotenv.config({path: __dirname + '../.env'});

import { log } from '@shared/utils';


export async function connectToDb() {
    log("Trying to connect to database...")
    const constring = process.env.DB_CONN_STRING;
    log("20%")
    if(!constring) return
    log("40%")
    const client = new mongoDB.MongoClient(constring);
    log("60%")
    await client.connect();
    log("80%")
    const db = client.db(process.env.DB_NAME);
    log("Successfully connected to database!");
}

export async function test() {

}