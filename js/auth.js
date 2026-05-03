import { db } from './db.js';

class Auth {
    constructor() {
        this.sessionKey = 'sakhi_session';
    }

    login(mobileOrId, password) {
        const users = db.getUsers();
        const user = users.find(u => (u.mobile === mobileOrId || u.id === mobileOrId) && u.password === password);

        if (!user) throw new Error('Invalid credentials');
        if (user.status !== 'Active') throw new Error('Account pending approval or deactivated');

        localStorage.setItem(this.sessionKey, JSON.stringify(user));
        return user;
    }

    logout() {
        localStorage.removeItem(this.sessionKey);
        window.location.href = '../index.html';
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem(this.sessionKey));
    }

    checkAccess(allowedRoles) {
        const user = this.getCurrentUser();
        if (!user) {
            window.location.href = '../employee-login.html';
            return;
        }
        if (allowedRoles && !allowedRoles.includes(user.role)) {
            alert('Access Denied');
            window.location.href = '../index.html';
        }
        return user;
    }
}

export const auth = new Auth();
export default auth;
