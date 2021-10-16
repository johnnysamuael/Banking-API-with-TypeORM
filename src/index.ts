import { createConnection } from "typeorm";
import { Client } from "./entities/Client";
import { Banker } from "./entities/Banker";
import { Transaction } from "./entities/Transaction";
import express from "express";
import { createClientRouter } from "./routes/create_client";
import { createBankerRouter } from "./routes/create_banker";
import { createTransactionRouter } from "./routes/create_transaction";
import {connectBankToClientRouter} from "./routes/connect_banker_to_client"
import { deleteClientRouter } from "./routes/delete_client";
import { fetchCLientsRouter } from "./routes/fetch_clients";
const app = express();
const main = async()=> {
    try {
        await createConnection({
            type: "postgres",
            host:"localhost",
            port:5432,
            username: 'johnnysamuael',
            password: undefined,
            database: 'typeorm',
            entities: [Client,Banker, Transaction],
            synchronize: true
          
          })
          console.log('CONNECTED');
          app.use(express.json());
          app.use(createClientRouter);
          app.use(createBankerRouter);
          app.use(createTransactionRouter);
          app.use(connectBankToClientRouter);
          app.use(deleteClientRouter);
          app.use(fetchCLientsRouter)
          app.listen(8080,()=>{
            console.log('running')
          }
         );

    } catch(error){
        console.error(error);
        
    }
    
}
main()