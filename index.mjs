import express from 'express';
import path from 'path';

import ApiV1Router from './ApiV1/api_v1.mjs'
const __dirname = path.resolve()


import { MongoClient} from 'mongodb';
const uri = "mongodb+srv://dbMKQazi786user:dbMKQazi786password@cluster0.7ab1dnm.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function run() {
  try {
      await client.connect();
      console.log("Successfully connected to Atlas");
  } catch (err) {
      console.log(err.stack);
      await client.close();
      process.exit(1)
  }
}
run().catch(console.dir);

process.on('SIGINT', async function() {
  console.log("app is terminating");
  await client.close();
  process.exit(0)
})

const app = express()

app.use(express.json()); 

app.use (ApiV1Router)


app.use('/', express.static(path.join(__dirname, 'public')));


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
