# Setup database

1. Download and install MongoDB from https://www.mongodb.com/try/download/community
2. Download and install MongoDB Shell from https://www.mongodb.com/try/download/shell
3. Follow the zip guide in https://www.mongodb.com/docs/mongodb-shell/install/. Use the connection string specified in your `.env`
4. Start the MongoDB shell, for example by running `mongosh.exe` from step 3
5. To view the database, use MongoDB Compass you installed in step 1 and connect using the same connection string. You need to refresh the database in order to see changes
6. Run `npm run init-database` from `~Backend/api`