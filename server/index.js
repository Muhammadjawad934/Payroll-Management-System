import express from 'express';
import cors from 'cors';
import authrouter from './routes/auth.js';
import connectToDatabase from './db/db.js';
import departmentsRouter from './routes/departments.js';
import employeesRouter from './routes/employees.js';
import salariesRouter from './routes/salaries.js';
import attendancesRouter from './routes/attendances.js';
import leavesRouter from './routes/leaves.js';
import settingsRouter from './routes/settings.js';
import User from './models/User.js';
import bcrypt from 'bcryptjs';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const app = express();

app.use(cors());
// Support JSON bodies and also urlencoded form bodies (for clients that send form data)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle invalid JSON errors from body-parser and return JSON instead of HTML stack trace
app.use((err, req, res, next) => {
	if (err && err.type === 'entity.parse.failed') {
		return res.status(400).json({ error: 'Invalid JSON payload' });
	}
	// Some versions of body-parser may surface SyntaxError
	if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
		return res.status(400).json({ error: 'Malformed JSON' });
	}
	next(err);
});
app.use('/api/auth', authrouter);
app.use('/api/departments', departmentsRouter);
app.use('/api/employees', employeesRouter);
// Leaves API removed
app.use('/api/salaries', salariesRouter);
app.use('/api/attendances', attendancesRouter);
app.use('/api/settings', settingsRouter);
app.use('/api/leaves', leavesRouter);
// quick debug endpoint to confirm routing
app.get('/api/auth/test', (req, res) => res.json({ ok: true, now: new Date().toISOString() }));

// Quick test endpoint: change password for authenticated user (bypasses router issues)
// test endpoints removed

// serve uploads folder
// NOTE: moved uploads static serving below where __dirname is initialized (ES modules)

// Diagnostic: print registered routes (top-level) and mounted stack for /api/auth
function listRoutes() {
	try {
		const routes = app._router?.stack
			.filter((r) => r && r.route)
			.map((r) => ({ path: Object.keys(r.route.methods)[0] ? Object.keys(r.route.methods) : [], route: r.route.path }));
		console.log('Top-level routes:', JSON.stringify(routes, null, 2));

		const layer = app._router?.stack.find((l) => l.name === 'router' && l.regexp && l.regexp.source.includes('^\\/api\\/auth'));
		if (layer && layer.handle && layer.handle.stack) {
			const authRoutes = layer.handle.stack
				.filter((s) => s.route)
				.map((s) => ({ path: s.route.path, methods: s.route.methods }));
			console.log('Mounted /api/auth routes:', JSON.stringify(authRoutes, null, 2));
		}
	} catch (e) {
		console.log('Error listing routes:', e && e.message);
	}
}

listRoutes();

// Expose router stack for debugging via HTTP
app.get('/routes', (req, res) => {
	try {
		const stack = app._router?.stack?.map((layer) => {
			return {
				name: layer.name,
				path: layer.route?.path || (layer.regexp && layer.regexp.source),
				methods: layer.route?.methods || null,
			};
		});
		res.json({ stack });
	} catch (e) {
		res.status(500).json({ error: e.message });
	}
});

// Serve frontend (built) if available, otherwise provide a dev redirect
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDist = path.join(__dirname, '..', 'payroll', 'dist');

// Serve uploads folder (make sure uploads directory exists)
const uploadsDir = path.join(__dirname, '..', 'uploads');
try {
	if (!fs.existsSync(uploadsDir)) {
		fs.mkdirSync(uploadsDir, { recursive: true });
	}
} catch (err) {
	console.warn('Could not ensure uploads directory exists:', err && err.message);
}
app.use('/uploads', express.static(uploadsDir));

console.log('Checking frontendDist at:', frontendDist, 'exists=', fs.existsSync(frontendDist));

if (process.env.NODE_ENV === 'production') {
	// In production serve the static build
	app.use(express.static(frontendDist));
	app.use((req, res) => {
		res.sendFile(path.join(frontendDist, 'index.html'));
	});
} else {
	// In development, if there is a built dist, serve it; otherwise redirect to Vite dev server
	if (fs.existsSync(frontendDist)) {
		app.use(express.static(frontendDist));
			// Serve index.html for root explicitly
			app.get('/', (req, res) => res.sendFile(path.join(frontendDist, 'index.html')));
			// Also provide a generic fallback for other routes
			app.use((req, res) => res.sendFile(path.join(frontendDist, 'index.html')));
	} else {
		app.get('/', (req, res) => {
			// Redirect to Vite dev server where the React app runs during development
			res.redirect('http://localhost:5175/');
		});
	}
}
const PORT = process.env.PORT || 4000;

// Connect to MongoDB first, then start the server. If DB connection fails, log and exit.
(async () => {
	try {
		await connectToDatabase();
		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});
	} catch (err) {
		console.error('Failed to start server due to DB connection error:', err && err.message);
		process.exit(1);
	}
})();