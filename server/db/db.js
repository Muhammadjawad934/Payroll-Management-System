import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

// Ensure dotenv is loaded from the server folder if not already
if (!process.env.MONGODB_URL && !process.env.MONGODB_URI) {
	try {
		const candidates = [
			path.join(process.cwd(), 'server', '.env'),
			path.join(process.cwd(), '.env'),
			path.join(path.dirname(process.execPath), '.env'),
		];
		for (const envPath of candidates) {
			if (fs.existsSync(envPath)) {
				const content = fs.readFileSync(envPath, 'utf8');
				const match = content.match(/MONGODB_URL\s*=\s*"?([^"\n\r]+)"?/);
				if (match) {
					process.env.MONGODB_URL = match[1].trim();
					break;
				}
			}
		}
	} catch (e) {
		// ignore
	}
}

const connectToDatabase = async () => {
	const uri = process.env.MONGODB_URL || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/payrolldb';
	console.log('Using MongoDB URI:', uri);
	try {
		await mongoose.connect(uri, {
			// useNewUrlParser/useUnifiedTopology are default in mongoose 6+
		});
		console.log('Connected to MongoDB');
	} catch (error) {
		console.error('Database connection error:', error);
	}
};

export default connectToDatabase;