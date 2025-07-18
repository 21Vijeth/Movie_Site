import { Client, Account, ID } from 'appwrite';

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(PROJECT_ID);

const account = new Account(client);

// --- User Registration in Appwrite ---
export const registerAppwriteUser = async (email, password, username) => {
    try {
        await account.create(ID.unique(), email, password, username);
    } catch (error) {
        console.error("Appwrite registration failed:", error);
        throw error; // Re-throw the error to be handled by the calling function
    }
};

// --- User Login in Appwrite ---
export const loginAppwriteUser = async (email, password) => {
    try {
        await account.createEmailPasswordSession(email, password);
    } catch (error) {
        console.error("Appwrite login failed:", error);
        throw error;
    }
};

// --- Get Current Logged-in Appwrite User ---
export const getAppwriteUser = async () => {
    try {
        return await account.get();
    } catch (error) {
        // This will fail if no one is logged in, which is expected.
        return null;
    }
};

// --- Logout from Appwrite ---
export const logoutAppwriteUser = async () => {
    try {
        await account.deleteSession('current');
    } catch (error) {
        console.error("Appwrite logout failed:", error);
    }
};