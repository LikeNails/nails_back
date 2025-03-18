import app from './app'
import mongoose from 'mongoose';

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI as string);
		console.log(`MongoDB connected: ${conn.connection.host}`)
	} catch(err){
		console.error(`Error connecting to MongoDB: ${(err as Error).message}`);
		process.exit(1);
	}
};
const port = process.env.PORT || 5000

connectDB().then(() => {
	app.listen(port, () => {
	  console.log(`Server is running on port ${port}`);
	});
});
  