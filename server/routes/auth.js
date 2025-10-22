import express from 'express';
import mongoose from 'mongoose';
import { login, verify, changePassword, signup, forgotPassword } from '../controlllers/authcontroller.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.post('/forgot-password', forgotPassword);
// support verify with any HTTP method to be robust to frontend method mismatches
router.get('/verify', authMiddleware, verify);
router.post('/verify', authMiddleware, verify);
router.all('/verify', authMiddleware, verify);

// Change password: requires authentication
router.post('/change-password', authMiddleware, changePassword);

// Debug: log registered routes for this router
try {
	const routeInfo = router.stack?.map(layer => ({ name: layer.name, path: layer.route?.path, methods: layer.route?.methods })).filter(Boolean);
	console.log('Auth router routes:', JSON.stringify(routeInfo, null, 2));
} catch (e) {
	console.log('Auth router debug error:', e && e.message);
}

router.get('/debug', (req, res) => {
	const uri = process.env.MONGODB_URL || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/payrolldb';
	res.json({ dbName: mongoose.connection?.name || null, uri });
});

export default router;