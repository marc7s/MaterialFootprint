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
import { DatabaseClearCollectionError, DatabaseConnectionError, DatabaseCreateCollectionError, DatabaseInsertMockDataError } from 'server/errors';

/* Shared */
import { log, logError } from '@shared/utils';

/* Mock data */
import {materialDatabaseEntry, surfaceTreatments, clients, clientMaterialCosts, clientSurfaceTreatmentCosts, modelsDataBaseEntry, modelpartsDatabaseEntry} from '@shared/mockData';

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

async function clearCollections(): Promise<void> {
  log("Creating collections...");
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

async function insertMockData(): Promise<void> {
  log("Inserting mock data...");
  try {
    await MaterialModel.insertMany(materialDatabaseEntry);
    await SurfaceTreatmentModel.insertMany(surfaceTreatments);
    await ClientModel.insertMany(clients);
    await ClientMaterialCostModel.insertMany(clientMaterialCosts);
    await ClientSurfaceTreatmentCostModel.insertMany(clientSurfaceTreatmentCosts);
    await ModelModel.insertMany(modelsDataBaseEntry);
    await PartModel.insertMany(modelpartsDatabaseEntry);
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
      logError("Could not initialize database", err);
      throw new DatabaseConnectionError();
    }
}

connectToDb()
  .catch(err => logError("Could not connect to database", err));
setupMockDatabase()
  .catch(err => logError("Could not setup mock data in database", err));

