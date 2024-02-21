import { User } from "../../Model/User";

const USER_INFO = "USER_INFO";
const TOKEN = "TOKEN";

let cachedCredentials: User | null = null;
let cachedToken: string | null = null;


export function getCredentials(): User | null {
    if (cachedCredentials) return cachedCredentials;
    const credentials = localStorage.getItem(USER_INFO);
    if (credentials) {
        cachedCredentials = JSON.parse(credentials);
        return cachedCredentials;
    }
    return null;
}

export function setCredentials(credentials: User | null): void {
    localStorage.setItem(USER_INFO, JSON.stringify(credentials));
    cachedCredentials = credentials;
}


export function getToken(): string | null {
    if (cachedToken) return cachedToken;
    const _token = localStorage.getItem(TOKEN);
    if (_token) {
        cachedToken = _token;
        return cachedToken;
    }
    return null;
}

export function setToken(token: string): void {
    localStorage.setItem(TOKEN, token);
    cachedToken = token;
}



export function updateCredentials(update: Partial<User>): User {
    const credentials = getCredentials() ?? {};
    const updatedCredentials = { ...credentials, ...update } as User;
    setCredentials(updatedCredentials);
    return updatedCredentials;
}

export function deleteCredentials(): void {
    localStorage.removeItem(USER_INFO);
    cachedCredentials = null;
}

export function deleteToken(): void {
    localStorage.removeItem(TOKEN);
    cachedToken = null;
}