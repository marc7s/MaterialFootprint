import 'module-alias/register';
import * as dotenv from "dotenv";
dotenv.config({path: __dirname + '/../.env'});
import { connectToDb, init } from "../../api/server/db";
import { fetchMaterials, fetchMaterialCostForCompany, fetchSurfaceTreatmentCostForCompany } from '../server/dbInterface';


function delay(timeInMillis: number): Promise<void> {
    return new Promise((resolve) => setTimeout(() => resolve(), timeInMillis));
  }


connectToDb();
init();

delay(100);


fetchMaterials();
fetchMaterialCostForCompany(1,1);
fetchSurfaceTreatmentCostForCompany(1,1);
