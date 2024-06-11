import mongoose from "mongoose";

const url =
  "mongodb+srv://nottwithtt:Nicolita1998+@cluster0.gi2w4fi.mongodb.net/DS_Project?retryWrites=true&w=majority";

class Database {
  private static instance: Database;

  private constructor() {}

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public connect() {
    mongoose
      .connect(url)
      .then(() => {
        console.log("Database connection successful");
      })
      .catch((err) => {
        console.error("Database connection error");
      });
  }

  public disconnect() {
    return mongoose
      .disconnect()
      .then(() => {
        console.log("Database disconnection successful");
      })
      .catch((err) => {
        console.error("Database disconnection error", err);
      });
  }
}

export { Database };
