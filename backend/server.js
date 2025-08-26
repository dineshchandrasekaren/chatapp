import app from "./app.js";
import config from "./config/index.js";
import connectDB from "./config/db.config.js";


const listeningPort = () => {
  console.log(`server is running at http://localhost:${config.PORT}`);
  connectDB();
};


app.listen(config.PORT,listeningPort);