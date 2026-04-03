import { Account, Client, ID } from "appwrite";
import conf from '../../conf/conf.js';

export class AuthService {
  client = new Client();
  account;

  constructor() {
     console.log("URL:", conf.appWriteUrl)        // what does this print?
     console.log("PROJECT:", conf.appWriteProjectId)
    this.client
      .setEndpoint(conf.appWriteUrl)
      .setProject(conf.appWriteProjectId);

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      // ✅ Fixed method name
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("AppWrite Service :: getcurrentuser :: error", error);
    }
    return null;
  }

  async logout() {
    try {
      // ✅ Fixed - only deletes current session
      await this.account.deleteSession('current');
    } catch (error) {
      console.log("AppWrite Service :: logout :: error", error);
    }
  }
}

const authService = new AuthService();
export default authService;