import * as dotenv from "dotenv";
dotenv.config({path: __dirname + '/../.env'});
import { log } from '@shared/utils';
import { DatabaseConnectionError } from "./errors";
import mongoose from 'mongoose';

const Material = require('../setupDatabase/models/Material');
const Surface = require('../setupDatabase/models/Surface');

var json = require('../setupDatabase/setupData.json');

export async function connectToDb() {
    log("Trying to connect to database...")
    const constring = process.env.DB_CONN_STRING;
    log("25%")
    if(!constring) return new Error("Could not get connection");
    log("50%");
    mongoose.connect(constring).
        catch(error => new DatabaseConnectionError());
    log("75%");
    log("Successfully connected to database!");
}

export async function init() {
    log("Initializing database...");
    Material.createCollection();
    Surface.createCollection();
    log("Collections initialized!");
    await Material.deleteMany();
    await Surface.deleteMany();
    log("Database cleared!");
    //--------------------------------
    Material.insertMany(json.materials);
    log("Materials inserted!");
    Surface.insertMany(json.surfaces);
    log("Surfaces inserted!");
    log("Successfully initialized database!");

}