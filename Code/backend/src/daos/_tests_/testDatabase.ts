import { Database } from "../../mongo-config";

export const connectDB = async () => {
  const db = Database.getInstance();
  await db.connect();
};

export const disconnectDB = async () => {
  const db = Database.getInstance();
  await db.disconnect();
};