import 'module-alias/register';
import * as dotenv from "dotenv";
dotenv.config({path: __dirname + '/../.env'});

/* Utils */
import { connectToDb } from 'server/db';
import { MaterialModel } from 'setupDatabase/models/Material';
import { SurfaceTreatmentModel } from 'setupDatabase/models/SurfaceTreatment';
import { ClientModel } from 'setupDatabase/models/Client';
import { ClientMaterialCostModel } from 'setupDatabase/models/ClientMaterialCost';
import { ClientSurfaceTreatmentCostModel } from 'setupDatabase/models/ClientSurfaceTreatmentCost';
import { ModelModel } from 'setupDatabase/models/Model';
import { PartModel } from 'setupDatabase/models/Part';
import { DatabaseClearCollectionError, DatabaseConnectionError, DatabaseCreateCollectionError, DatabaseInitialisationError, DatabaseInsertMockDataError } from 'server/errors';

/* Shared */
import { log, logError } from '@shared/utils';

/* Mock data */
import { MOCK_MATERIAL_DATABASE_ENTRIES, MOCK_SURFACE_TREATMENTS, clients, MOCK_CLIENT_MATERIAL_COST_DATABASE_ENTRIES, MOCK_CLIENT_SURFACE_TREATMENT_COST_DATABASE_ENTRIES, MOCK_MODEL_DATABASE_ENTRIES, MOCK_MODEL_PART_DATABASE_ENTRIES } from '@shared/mockData';

// Create the collections in the database
async function createCollections(): Promise<void> {
    log("Creating collections...");
    try {
      await MaterialModel.createCollection();
      await SurfaceTreatmentModel.createCollection();
      await ClientModel.createCollection();
      await ClientMaterialCostModel.createCollection();
      await ClientSurfaceTreatmentCostModel.createCollection();
      await ModelModel.createCollection();
      await PartModel.createCollection();
      
      log("Collections created!");
    } catch(err) {
      logError("Could not create collections", err);
      throw new DatabaseCreateCollectionError();
    }
}

// Clear the collections in the database
async function clearCollections(): Promise<void> {
  log("Clearing collections...");
  try {
    await MaterialModel.deleteMany();
    await SurfaceTreatmentModel.deleteMany();
    await ClientModel.deleteMany();
    await ClientMaterialCostModel.deleteMany();
    await ClientSurfaceTreatmentCostModel.deleteMany();
    await ModelModel.deleteMany();
    await PartModel.deleteMany();
    
    log("Collections cleared!");
  } catch(err) {
    logError("Could not clear collections", err);
    throw new DatabaseClearCollectionError();
  }
}

// Insert mock data into the database
async function insertMockData(): Promise<void> {
  log("Inserting mock data...");
  try {
    await MaterialModel.insertMany(MOCK_MATERIAL_DATABASE_ENTRIES);
    await SurfaceTreatmentModel.insertMany(MOCK_SURFACE_TREATMENTS);
    await ClientModel.insertMany(clients);
    await ClientMaterialCostModel.insertMany(MOCK_CLIENT_MATERIAL_COST_DATABASE_ENTRIES);
    await ClientSurfaceTreatmentCostModel.insertMany(MOCK_CLIENT_SURFACE_TREATMENT_COST_DATABASE_ENTRIES);
    await ModelModel.insertMany(MOCK_MODEL_DATABASE_ENTRIES);
    await PartModel.insertMany(MOCK_MODEL_PART_DATABASE_ENTRIES);
    
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
      log("DONE");
    } catch(err) {
      throw new DatabaseInitialisationError(err);
    }
}

// Connect to the database on startup
connectToDb()
  .then(() => {
    setupMockDatabase()
    .catch(err => logError("Could not setup mock data in database", err));
  })
  .catch(err => logError("Could not connect to database", err));



