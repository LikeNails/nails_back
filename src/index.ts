import app from './app'
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import morgan from 'morgan';

// Создаем поток записи для логов
const logDirectory = path.join(__dirname, 'logs');
if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
}
const accessLogStream = fs.createWriteStream(path.join(logDirectory, 'access.log'), { flags: 'a' });

// Настройка morgan для записи в файл
app.use(morgan('combined', { stream: accessLogStream }));

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
  