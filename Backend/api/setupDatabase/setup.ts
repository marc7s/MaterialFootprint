import 'module-alias/register';
import * as dotenv from "dotenv";
dotenv.config({path: __dirname + '/../.env'});
import { connectToDb } from 'server/db';
import { log, logError } from '@shared/utils';
import { MaterialModel } from '../setupDatabase/models/Material';
import { SurfaceModel } from '../setupDatabase/models/Surface';
import { CompanyModel } from "../setupDatabase/models/Company";
import { CompanyMaterialCostModel } from "../setupDatabase/models/CompanyMaterialCost";
import { CompanySurfaceCostModel } from "../setupDatabase/models/CompanySurfaceCost";
import { DatabaseConnectionError } from '../server/errors';

const mockData = require('../setupDatabase/setupData.json');

function delay(timeInMillis: number): Promise<void> {
    return new Promise((resolve) => setTimeout(() => resolve(), timeInMillis));
  }

async function setupMockDatabase(): Promise<void> {
    log("Initializing database...");
    try {
      await MaterialModel.createCollection();
      await SurfaceModel.createCollection();
      await CompanyModel.createCollection();
      await CompanyMaterialCostModel.createCollection();
      await CompanySurfaceCostModel.createCollection();
      await MaterialModel.deleteMany();
      await SurfaceModel.deleteMany();
      await CompanyModel.deleteMany();
      await CompanyMaterialCostModel.deleteMany();
      await CompanySurfaceCostModel.deleteMany();
      log("Database cleared!");
      //--------------------------------
      await MaterialModel.insertMany(mockData.materials);
      await SurfaceModel.insertMany(mockData.surfaces);
      await CompanyModel.insertMany(mockData.companies);
      await CompanyMaterialCostModel.insertMany(mockData.companyMaterialCosts);
      await CompanySurfaceCostModel.insertMany(mockData.companySurfaceCosts);
      log("Mock data inserted!");
      log("-----------------------------");
      log("Successfully initialized database!");
    } catch(err) {
      logError("Could not setup mock database", err);
         throw DatabaseConnectionError
    }
}

connectToDb()
  .catch(err => logError("Could not connect to database", err));
setupMockDatabase()
  .catch(err => logError("Could not setup mock data in database", err));

delay(100);
