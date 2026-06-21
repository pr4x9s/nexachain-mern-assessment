import mongoose from 'mongoose'
import conf from '../conf/conf'
import { DB_NAME } from '../constants.ts'



const connectDB = async (): Promise<void> => {
    try {
        const connectionInstance = await mongoose.connect(`${conf.mongodbUri}/${DB_NAME}`);
        console.log(`MONGODB CONNECTED! DB HOST: ${connectionInstance.connection.host}`);
    }
    catch (error) {
        console.error(`MONGODB CONNECTION ERROR: ${error}`);
        process.exit(1);
    }
};

export default connectDB;