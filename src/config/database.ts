// require dependencies
import mongoose, { ConnectOptions } from "mongoose";
import environment from "./environment";

class Database {
  async connect() {
    try {
      await mongoose.connect(environment.dbUrl);
      console.log("Database Connected");
    } catch (error) {
      console.log(error);

      throw new Error("Database not Connected");
    }
  }
}

export default Database;
