// Authentication Module - Database Backed
class Auth {
    constructor() {
        this.currentUser = null;
        this.sessionKey = 'admin_session';
        this.apiUrl = CONFIG.API_URL;
    }

    // Check if user is logged in
    async isAuthenticated() {
        const session = localStorage.getItem(this.sessionKey);
        if (!session) return false;

        try {
            const sessionData = JSON.parse(session);
            const now = new Date().getTime();

            // Check if session has expired
            if (now > sessionData.expiresAt) {
                this.logout();
                return false;
            }

            // Verify session with backend
            try {
                const response = await fetch(`${this.apiUrl}/auth/verify`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username: sessionData.user.username })
                });

                const result = await response.json();

                if (!result.success) {
                    this.logout();
                    return false;
                }

                this.currentUser = sessionData.user;
                return true;
            } catch (error) {
                console.error('Session verification error:', error);
                // If offline, trust local session
                this.currentUser = sessionData.user;
                return true;
            }
        } catch (error) {
            console.error('Session error:', error);
            return false;
        }
    }

    // Login with database
    async login(username, password) {
        try {
            const response = await fetch(`${this.apiUrl}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const result = await response.json();

            if (!result.success) {
                throw new Error(result.message || 'Invalid username or password');
            }

            // Create session
            const session = {
                user: {
                    username: result.data.username,
                    full_name: result.data.full_name,
                    email: result.data.email,
                    role: result.data.role
                },
                expiresAt: new Date().getTime() + CONFIG.SESSION_TIMEOUT
            };

            localStorage.setItem(this.sessionKey, JSON.stringify(session));
            this.currentUser = session.user;

            return session.user;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    // Logout
    logout() {
        localStorage.removeItem(this.sessionKey);
        this.currentUser = null;
        window.location.reload();
    }

    // Get current user
    getCurrentUser() {
        return this.currentUser;
    }

    // Extend session
    extendSession() {
        const session = localStorage.getItem(this.sessionKey);
        if (session) {
            const sessionData = JSON.parse(session);
            sessionData.expiresAt = new Date().getTime() + CONFIG.SESSION_TIMEOUT;
            localStorage.setItem(this.sessionKey, JSON.stringify(sessionData));
        }
    }

    // Change password
    async changePassword(currentPassword, newPassword) {
        try {
            if (!this.currentUser) {
                throw new Error('Not authenticated');
            }

            const response = await fetch(`${this.apiUrl}/auth/change-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: this.currentUser.username,
                    currentPassword,
                    newPassword
                })
            });

            const result = await response.json();

            if (!result.success) {
                throw new Error(result.message || 'Failed to change password');
            }

            return result;
        } catch (error) {
            console.error('Change password error:', error);
            throw error;
        }
    }
}

// Create global auth instance
window.auth = new Auth();
