import * as dotenv from "dotenv";
dotenv.config({path: __dirname + '/../.env'});
import { log } from '@shared/utils';
import { DatabaseConnectionError } from "./errors";
import mongoose from 'mongoose';
import { MaterialModel } from '../setupDatabase/models/Material';
import { SurfaceModel } from '../setupDatabase/models/Surface';
import { CompanyModel } from "../setupDatabase/models/Company";
import { CompanyMaterialCostModel } from "../setupDatabase/models/CompanyMaterialCost";
import { CompanySurfaceCostModel } from "../setupDatabase/models/CompanySurfaceCost";

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
    MaterialModel.createCollection();
    SurfaceModel.createCollection();
    CompanyModel.createCollection();
    //CompanyMaterialCostModel.createCollection();
    //CompanySurfaceCostModel.createCollection();
    log("Collections initialized!");
    await MaterialModel.deleteMany();
    await SurfaceModel.deleteMany();
    await CompanyModel.deleteMany();
    //await CompanyMaterialCostModel.deleteMany();
    //await CompanySurfaceCostModel.deleteMany();
    log("Database cleared!");
    //--------------------------------
    MaterialModel.insertMany(json.materials);
    log("Materials inserted!");
    SurfaceModel.insertMany(json.surfaces);
    log("Surfaces inserted!");
    CompanyModel.insertMany(json.companies);
    log("Companies inserted!");
    /*
    CompanyMaterialCostModel.insertMany(json.companyMaterialCosts);
    log("CompanyMaterialCosts inserted!");
    CompanySurfaceCostModel.insertMany(json.companySurfaceCosts);
    log("CompanySurfaceCosts inserted!");
    */
    log("-----------------------------");
    log("Successfully initialized database!");

}