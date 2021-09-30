import mongoose from 'mongoose';
require('dotenv/config');

export class MongoConnection {
  public async connect(): Promise<void> {
    try {
      await mongoose.connect(process.env.MONGO_CONNECTION);
      console.log('Database connected!')
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
  }
}