import 'module-alias/register';
import * as dotenv from "dotenv";
dotenv.config({path: __dirname + '/../.env'});
import { connectToDb, init } from "../../api/server/db";
import { fetchMaterial } from "../../database/dbInterface";


function delay(timeInMillis: number): Promise<void> {
    return new Promise((resolve) => setTimeout(() => resolve(), timeInMillis));
  }


connectToDb();
init();

delay(100);

fetchMaterial("Im a material").then((response) => {
    console.log(response);
});
