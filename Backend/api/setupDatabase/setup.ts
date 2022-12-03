import 'module-alias/register';
import * as dotenv from "dotenv";
dotenv.config({path: __dirname + '/../.env'});

/* Utils */
import { connectToDb } from 'server/db';
import { MaterialModel } from 'setupDatabase/models/Material';
import { SurfaceTreatmentModel } from 'setupDatabase/models/SurfaceTreatment';
import { CompanyModel } from 'setupDatabase/models/Company';
import { CompanyMaterialCostModel } from 'setupDatabase/models/CompanyMaterialCost';
import { CompanySurfaceCostModel } from 'setupDatabase/models/CompanySurfaceCost';
import { DatabaseClearCollectionError, DatabaseConnectionError, DatabaseCreateCollectionError, DatabaseInsertMockDataError } from 'server/errors';

/* Shared */
import { log, logError } from '@shared/utils';

/* Mock data */
import mockData from 'setupDatabase/setupData.json';

async function createCollections(): Promise<void> {
    log("Creating collections...");
    try {
      await MaterialModel.createCollection();
      await SurfaceTreatmentModel.createCollection();
      await CompanyModel.createCollection();
      await CompanyMaterialCostModel.createCollection();
      await CompanySurfaceCostModel.createCollection();
      log("Collections created!");
    } catch(err) {
      logError("Could not create collections", err);
      throw new DatabaseCreateCollectionError();
    }
}

async function clearCollections(): Promise<void> {
  log("Creating collections...");
  try {
    await MaterialModel.deleteMany();
    await SurfaceTreatmentModel.deleteMany();
    await CompanyModel.deleteMany();
    await CompanyMaterialCostModel.deleteMany();
    await CompanySurfaceCostModel.deleteMany();
    log("Collections cleared!");
  } catch(err) {
    logError("Could not clear collections", err);
    throw new DatabaseClearCollectionError();
  }
}

async function insertMockData(): Promise<void> {
  log("Inserting mock data...");
  try {
    await MaterialModel.insertMany(mockData.materials);
    await SurfaceTreatmentModel.insertMany(mockData.surfaceTreatments);
    await CompanyModel.insertMany(mockData.companies);
    await CompanyMaterialCostModel.insertMany(mockData.companyMaterialCosts);
    await CompanySurfaceCostModel.insertMany(mockData.companySurfaceCosts);
    log("Mock data inserted!");
  } catch(err) {
    logError("Could not insert mock data", err);
    throw new DatabaseInsertMockDataError();
  }
}


async function setupMockDatabase(): Promise<void> {
    log("Initializing database...");
    try {
      await createCollections();
      await clearCollections();
      await insertMockData();
      log("Database initialized!");
    } catch(err) {
      logError("Could not initialize database", err);
      throw new DatabaseConnectionError();
    }
}

connectToDb()
  .catch(err => logError("Could not connect to database", err));
setupMockDatabase()
  .catch(err => logError("Could not setup mock data in database", err));

