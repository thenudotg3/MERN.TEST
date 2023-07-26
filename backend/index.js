import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
dotenv.config();
const MongoClient = mongodb.MongoClient;

const port = process.env.PORT || 5000;

MongoClient.connect(
  process.env.RESTREVIEWS_DB_URI,
  {
    poolSize: 10, // Set the pool size to 10 (or any other value you prefer)
    wtimeout: 2500,
    useNewUrlParser: true,
  }
)
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  })
  .then(async () => {
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  });
