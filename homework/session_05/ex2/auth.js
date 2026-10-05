/**
 * Authentication Module
 * IT-209 DevOps Fundamentals - Session 05
 */

const crypto = require('crypto');

// Initial auth configuration
const TOKEN_EXPIRY = 3600; // 1 hour in seconds
const SALT_ROUNDS = 10;
const TOKEN_SECRET = process.env.AUTH_SECRET || 'devops-session-05-jwt-secret-key';

/**
 * Hash password using crypto SHA-256
 */
function hashPassword(password) {
    // Hashing password securely
    return crypto.createHash('sha256').update(password).digest('hex');
}

/**
 * Authenticate user credentials (Fixed typo)
 */
function authenticateUser(username, password) {
    if (!username || !password) {
        return { success: false, message: 'Missing username or password' };
    }
    
    // Simulate user lookup
    return {
        success: true,
        user: {
            username: username,
            role: 'member',
            authenticatedAt: new Date().toISOString()
        }
    };
}

/**
 * Generate HMAC SHA-256 signed session token
 */
function generateToken(user) {
    const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
    const payload = Buffer.from(JSON.stringify({
        sub: user.username,
        role: user.role,
        exp: Math.floor(Date.now() / 1000) + TOKEN_EXPIRY
    })).toString('base64url');
    
    const signature = crypto
        .createHmac('sha256', TOKEN_SECRET)
        .update(`${header}.${payload}`)
        .digest('base64url');
        
    return `${header}.${payload}.${signature}`;
}

/**
 * Verify signed session token
 */
function verifyToken(token) {
    if (!token || typeof token !== 'string') {
        return { valid: false, error: 'Token missing or invalid format' };
    }
    
    const parts = token.split('.');
    if (parts.length !== 3) {
        return { valid: false, error: 'Malformed token structure' };
    }
    
    const [header, payload, signature] = parts;
    const expectedSig = crypto
        .createHmac('sha256', TOKEN_SECRET)
        .update(`${header}.${payload}`)
        .digest('base64url');
        
    if (signature !== expectedSig) {
        return { valid: false, error: 'Invalid token signature' };
    }
    
    try {
        const decodedPayload = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
        if (decodedPayload.exp && decodedPayload.exp < Math.floor(Date.now() / 1000)) {
            return { valid: false, error: 'Token has expired' };
        }
        return { valid: true, payload: decodedPayload };
    } catch (err) {
        return { valid: false, error: 'Invalid payload encoding' };
    }
}

/**
 * Validate email format with standard regex
 */
function validateEmail(email) {
    if (!email || typeof email !== 'string') return false;
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
}

/**
 * Sanitize string input to prevent XSS injection
 */
function sanitizeInput(input) {
    if (typeof input !== 'string') return '';
    return input.trim().replace(/[<>]/g, '');
}

module.exports = {
    hashPassword,
    authenticateUser,
    generateToken,
    verifyToken,
    validateEmail,
    sanitizeInput
};
